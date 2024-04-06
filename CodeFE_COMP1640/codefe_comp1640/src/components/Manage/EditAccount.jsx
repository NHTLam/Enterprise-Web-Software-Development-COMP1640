import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Toast from "../../components/Toast";
import axios from "axios";

const EditAccount = () => {
  const [Roles, setRoles] = useState([]);
  const departments = [
    {
        Id: 1,
        Name: "Business and Economics",
    },
    {
        Id: 2,
        Name: "Enginering",
    },
    {
        Id: 3,
        Name: "Art and Humanities",
    },
    {
        Id: 4,
        Name: "Law",
    },
    {
        Id: 5,
        Name: "Sciences",
    }
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = parseInt(id);
  // const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    username: "",
    phone: "",
    address: "",
    departmentId: "",
    roleUserMappings: [],
  });
  const API_BASE = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const listRole = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(`${API_BASE}/role/list-role`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403) {
          console.log("No Permission!");
          Toast.toastErorr("You do not have permission to perform this action");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        setRoles(res.data);
        console.table("List of Roles:", res.data);
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };

    const getAccount = async () => {
      const token = localStorage.getItem("token");
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
      if (response.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      const data = response.data;
      setAccount(data);
      console.log("Edit success!");
    };
    listRole();
    getAccount();
  }, [userId]);

  const handleEditAccount = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      var res = await axios.post(
        `${API_BASE}/app-user/update`,
        account, // Gửi dữ liệu từ state account
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log("Account updated successfully!");
      navigate("/ad_manage/account");
    } catch (err) {
      console.log("Failed to update account!" + err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roleUserMappings") {
      setAccount({ ...account, [name]: JSON.parse(value) });
    } else {
      setAccount({ ...account, [name]: value });
    }
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
              id="dropdown"
              name="departmentId"
              className="form-select"
              value={account.departmentId}
              onChange={handleChange}
            >
              <option>Select a department</option>
              {departments.map((department) => (
                <option key={department.Id} value={department.Id}>
                  {department.Name}
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
