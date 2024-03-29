import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Toast from "../../components/Toast";

const token = localStorage.getItem("token");

const Account = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const departments = [
    {
      Id: 1,
      Name: "Law",
    },
    {
      Id: 2,
      Name: "Engineering",
    },
    {
      Id: 3,
      Name: "Science",
    },
  ];
  const changeDepartment = {
    1: "Law",
    2: "Engineering",
    3: "Science",
  };

  // console.log(changeDepartment[1]);
  // console.log(departments[1].Name);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [accounts, setAccount] = useState([]);
  const [Roles, setRoles] = useState([]);
  const API_BASE = process.env.REACT_APP_API_KEY;
  const handlNewAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/app-user/create`,
        {
          email,
          username,
          phone,
          password,
          address,
          departmentId: selectedDepartment,
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
      console.log("Create account success!");
      const newAccount = [...accounts, response.data];
      setAccount(newAccount);
      console.log(newAccount);
      navigate("/ad_manage/account");
    } catch (err) {
      console.log("Create account failed!");
    }
  };

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      var res = await axios.post(
        `${API_BASE}/app-user/delete`,
        {
          userId,
        },
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
      console.log("Delete success");
      setAccount(accounts.filter((account) => account.userId !== userId));
      // navigate("/");
    } catch (err) {
      console.log("Delete account failed! " + err);
    }
  };

  useEffect(() => {
    const listRole = async () => {
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
        console.table("List of Roles:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };

    const listAcount = async () => {
      try {
        const res = await axios.post(`${API_BASE}/app-user/list`, null, {
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
        setAccount(res.data);
        console.table("List of accounts:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
      }
    };
    listRole();
    listAcount();
  }, []);

  return (
    <div className="container">
      <h2>LIST ACCOUNT</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#createAccount"
        >
          {" "}
          CREATE NEW ACCOUNT
        </button>
      </div>
      <table className="table mt-2 text-center table-info">
        <tr>
          <th scope="col">ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Department</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        {accounts.map((account) => (
          <tbody>
            <tr key={account.userId}>
              <td>{account.userId}</td>
              <td>{account.email}</td>
              <td>{account.username}</td>
              <td>{account.phone}</td>
              <td>{account.address}</td>
              <td>{changeDepartment[account.departmentId]}</td>
              <td>
                {Roles.filter((r) =>
                  account.roleUserMappings
                    .map((r) => r.roleId)
                    .includes(r.roleId)
                )
                  .map((r) => r.name)
                  .join(",")}
              </td>
              <td className="ms-1">
                <Link
                  to={`/edit_account/${account.userId}`}
                  className="btn btn-warning"
                >
                  EDIT
                </Link>
                <button
                  className="btn btn-danger ms-1"
                  type="button"
                  onClick={() => handleDelete(account.userId)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* <!-- Modal --> */}
      <form>
        <div
          className="modal fade"
          id="createAccount"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create New User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <!-- Form to input user details --> */}
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="address" className="form-label">
                    address
                  </label>
                  <input
                    name="address"
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="department" className="form-label">
                    Department
                  </label>
                  <select
                    id="dropdown"
                    className="form-select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option>Select a department</option>
                    {departments.map((department) => (
                      <option key={department.Id} value={department.Name}>
                        {department.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handlNewAccount}
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
