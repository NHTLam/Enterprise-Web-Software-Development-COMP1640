import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

const EditAccount = () => {
  const [Roles, setRoles] = useState([]);
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = parseInt(id);
  // const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    username: "",
    // class: "",
    phone: "",
    address: "",
    department: "",
    roleUserMappings: [],
  });
  const API_BASE = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const listRole = async () => {
      try {
        const res = await axios.post(`${API_BASE}/role/list-role`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(res.data);
        console.table("List of Roles:", res.data);
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };

    const listDepartment = async () => {
      try {
        const res = await axios.post(`${API_BASE}/department/list`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartment(res.data);
        console.table("List of Department:", res.data);
      } catch (err) {
        console.log("Failed to list Department! " + err);
      }
    };

    const getAccount = async () => {
      const response = await axios.post(
        `${API_BASE}/app-user/get`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setAccount(data);
      console.log("Edit success!");
      // try {
      //   const response = await axios.post(
      //     `${API_BASE}/app-user/get`,
      //     {
      //       userId,
      //     }
      //   );
      //   const data = response.data;
      //   setAccount(data);
      //   console.log("Edit success!");
      // } catch (err) {
      //   console.log("Edit failed!" + err);
      // }
    };
    listRole();
    getAccount();
    listDepartment();
  }, [userId]);

  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE}/app-user/update/`,
        account, // Gửi dữ liệu từ state account
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Account updated successfully!");
      // navigate("/");
    } catch (err) {
      console.log("Failed to update account!" + err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: JSON.parse(value) });
    console.log(account);
  };

  return (
    <div className="container-lg bg-light border border-1">
      <h1>UPDATE ACCOUNT</h1>
      <form className="account">
        <div className="modal-body">
          <input type="hidden" name="id" value={account.userId} />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={account.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Name"
              value={account.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter Phone"
              value={account.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              name="address"
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              value={account.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              name="department"
              value={account.department}
              onChange={handleChange}
            >
              {department.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="roleUserMappings" className="form-label">
              Role
            </label>
            <select
              name="roleUserMappings"
              id="roleUserMappings"
              className="form-control"
              onChange={handleChange}
              placeholder="Set Role"
              defaultValue=""
            >
              {Roles.map((role) => (
                <option
                  key={role.id}
                  value={JSON.stringify([
                    { userId: userId, roleId: role.roleId },
                  ])}
                >
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer mb-2">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={handleEditAccount}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
