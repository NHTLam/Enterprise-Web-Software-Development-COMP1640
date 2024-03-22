import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const ManagerRole = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Roles, setRole] = useState([]);
  const [Permissions, setPermissions] = useState([]);

  const API_BASE = process.env.REACT_APP_API_KEY;

  const handlNewRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/role/create-role`,
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Create Role success!");
      const newRole = [...Roles, response.data];
      setRole(newRole);
      navigate("/ad_manage/Role");
    } catch (err) {
      console.log("Create Role failed!");
    }
  };

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      await axios.post(`${API_BASE}/role/delete-role`, {
        userId,
      });
      console.log("Delete success");
      setRole(Roles.filter((Role) => Role.userId !== userId));
      // navigate("/");
    } catch (err) {
      console.log("Delete Role failed! " + err);
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
        setRole(res.data);
        console.table("List of Roles:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };

    // const listRole = async () => {
    //   try {
    //     const res = await axios.post(`${API_BASE}/role/list-role`, null, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setRole(res.data);
    //     console.table("List of Roles:", JSON.stringify(res.data));
    //   } catch (err) {
    //     console.log("Failed to list Role! " + err);
    //   }
    // };
    listRole();
  }, []);

  return (
    <div className="container">
      <h2>LIST Role</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#createRole"
        >
          {" "}
          CREATE NEW Role
        </button>
      </div>
      <table className="table table-striped mt-2 text-center">
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
        {Roles.map((Role, index) => (
          <tr key={Role.userId}>
            <td>{index + 1}</td>
            <td>{Role.name}</td>
            <td>{Role.description}</td>
            <td>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#setPermission"
              >
                Set Permission
              </button>
              <Link
                to={`/edit_Role/${Role.userId}`}
                className="btn btn-warning"
              >
                EDIT
              </Link>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleDelete(Role.userId)}
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
          id="createRole"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Role
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
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">
                    Description
                  </label>
                  <input
                    name="description"
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  onClick={handlNewRole}
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      {/* <!-- Modal for permission --> */}
      <form>
        <div
          className="modal fade"
          id="setPermission"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Set Permission
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <table className="table table-striped mt-2 text-center">
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
                {Roles.map((Role, index) => (
                  <tr key={Role.userId}>
                    <td>{index + 1}</td>
                    <td>{Role.name}</td>
                    <td>{Role.description}</td>
                    <td>
                      <button 
                        type="button"
                        className="btn btn-secondary"></button>
                    </td>
                  </tr>
                ))}
              </table>
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
                  // onClick={handlNewRole}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManagerRole;
