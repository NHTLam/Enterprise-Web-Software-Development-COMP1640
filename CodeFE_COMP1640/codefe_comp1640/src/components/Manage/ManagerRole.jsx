import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const ManagerRole = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Roles, setRoles] = useState([]);
  const [Role, setRole] = useState({});
  const [Permissions, setPermissions] = useState([]);
  const [PermissionsByRole, setPermissionsByRole] = useState([]);

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
      setRoles(newRole);
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
      },        
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete success");
      setRoles(Roles.filter((Role) => Role.userId !== userId));
      // navigate("/");
    } catch (err) {
      console.log("Delete Role failed! " + err);
    }
  };

  const handleEditRole = async (e) => {
    try {
      await axios.post(
        `${API_BASE}/role/update-role/`,
        Role,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Role updated successfully!");
      // navigate("/");
    } catch (err) {
      console.log("Failed to update role!" + err);
    }
  };

  const handlePermisisonByRole = async (RoleId) => {
    try {
      const res = await axios.post(`${API_BASE}/permission/list-permission-by-role`, {RoleId: RoleId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermissionsByRole(res.data);
      console.table("List of Permission:", JSON.stringify(res.data));
    } catch (err) {
      console.log("Failed to list Permission! " + err);
    }
  };

  function handleSubmitPermission(event) {
    event.preventDefault();
  
    const checkedPermissions = [];
  
    // Efficiently iterate over checkboxes using `querySelectorAll`
    const checkboxes = document.querySelectorAll('#setPermission input[type="checkbox"]:checked');
  
    checkboxes.forEach(checkbox => {
      const permissionId = parseInt(checkbox.parentNode.parentNode.querySelector('td:nth-child(1)').textContent, 10); // Extract permission ID from its table cell
      checkedPermissions.push(permissionId);
    });
  
    // Call your API with the selected permission IDs
    console.log('Selected Permission IDs:', checkedPermissions);
    // Replace with your actual API call (assuming an API endpoint that accepts permission IDs)
    // axios.post(/* your API endpoint */, { permissionIds: checkedPermissions })
    //   .then(response => {
    //     // Handle successful API response
    //   })
    //   .catch(error => {
    //     // Handle API errors
    //   });
  }

  useEffect(() => {
    const listRole = async () => {
      try {
        const res = await axios.post(`${API_BASE}/role/list-role`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(res.data);
        console.table("List of Roles:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };

    const listPermission = async () => {
      try {
        const res = await axios.post(`${API_BASE}/permission/list-permission`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPermissions(res.data);
        console.table("List of Permissions:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list Role! " + err);
      }
    };
    listRole();
    listPermission();
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
          <tr key={Role.roleId}>
            <td>{index + 1}</td>
            <td>{Role.name}</td>
            <td>{Role.description}</td>
            <td>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#setPermission"
                onClick={() => handlePermisisonByRole(Role.roleId)}
              >
                Set Permission
              </button>
              <Link
                to={`/edit_Role/${Role.roleId}`}
                className="btn btn-warning"
              >
                EDIT
              </Link>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleDelete(Role.roleId)}
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
                    <th>Action</th>
                    <th>Menu Name</th>
                    <th>Description</th>
                    <th>Asigned</th>
                  </tr>
                  {Permissions.map((Permission, index) => (
                    <tr key={Permission.id}>
                      <td>{index + 1}</td>
                      <td>{Permission.name}</td>
                      <td>{Permission.menuName}</td>
                      <td>{Permission.description}</td>
                      <td>
                        <input 
                          type="checkbox"
                          checked={PermissionsByRole.some(PermissionByRole => PermissionByRole.id === Permission.id)}
                          ></input>
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
                    onClick={handleSubmitPermission}
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
