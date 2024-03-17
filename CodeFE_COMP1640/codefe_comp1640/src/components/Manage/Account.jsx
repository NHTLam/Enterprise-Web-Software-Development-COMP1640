import { useState, useEffect } from "react";
import axios from "axios";
const Account = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [departmentId, setdepartmentId] = useState(1);
  const [accounts, setAccount] = useState([]);

  const handlNewAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fb8c-2405-4802-1d0e-f8f0-912e-c785-ed77-a567.ngrok-free.app/app-user/register",
        {
          email,
          username,
          phone,
          password,
          class: className,
          address,
          departmentId,
        }
      );
      console.log("Create account success!");
      console.table(response.data);
      // navigate("/");
    } catch (err) {
      console.log("Create account failed!");
    }
  };

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      await axios.post(
        "https://fb8c-2405-4802-1d0e-f8f0-912e-c785-ed77-a567.ngrok-free.app/app-user/delete",
        {
          userId,
        }
      );
      console.log("Delete success");
      setAccount(accounts.filter((account) => account.userId !== userId));
      // navigate("/");
    } catch (err) {
      console.log("Delete account failed! " + err);
    }
  };

  const navigateToEdit = (id) => {
    // navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const listAcount = async () => {
      try {
        const res = await axios.post(
          "https://fb8c-2405-4802-1d0e-f8f0-912e-c785-ed77-a567.ngrok-free.app/app-user/list"
        );
        setAccount(res.data);
        console.table("List of accounts:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
      }
    };
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
          data-bs-target="#exampleModal"
        >
          {" "}
          CREATE NEW ACCOUNT
        </button>
      </div>
      <table className="table table-striped mt-2 text-center">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>username</th>
          <th>Phone</th>
          <th>Class</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
        {accounts.map((account) => (
          <tr key={account.userId}>
            <td>{account.userId}</td>
            <td>{account.email}</td>
            <td>{account.username}</td>
            <td>{account.phone}</td>
            <td>{account.class}</td>
            <td>{account.address}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => navigateToEdit(account.userId)}
              >
                EDIT
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleDelete(account.userId)}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
      </table>

      {/* <!-- Modal --> */}
      <form>
        <div
          className="modal fade"
          id="exampleModal"
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
                  <label for="Email" className="form-label">
                    Email
                  </label>
                  <input
                    name="Email"
                    type="text"
                    className="form-control"
                    id="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="Name" className="form-label">
                    Name
                  </label>
                  <input
                    name="Name"
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Enter Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {/* <div class="mb-3">
                  <label for="Role" className="form-label">
                    Role
                  </label>
                  <select
                    name="roomType"
                    id="dropdown1"
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Student</option>
                    <option value="">Guest</option>
                    <option value="">Marketing Coordinator</option>
                    <option value="">Marketing Manager</option>
                  </select>
                </div> */}
                <div className="mb-3">
                  <label for="Password" className="form-label">
                    Password
                  </label>
                  <input
                    name="Password"
                    type="number"
                    className="form-control"
                    id="Phone"
                    placeholder="Enter Phone"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="Phone" className="form-label">
                    Phone
                  </label>
                  <input
                    name="Phone"
                    type="text"
                    className="form-control"
                    id="Phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="Address" className="form-label">
                    address
                  </label>
                  <input
                    name="Address"
                    type="text"
                    className="form-control"
                    id="Phone"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="Clas" className="form-label">
                    Class
                  </label>
                  <input
                    name="Clas"
                    type="text"
                    className="form-control"
                    id="Clas"
                    placeholder="Enter Class"
                    value={className}
                    onChange={(e) => setClass(e.target.value)}
                  />
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
