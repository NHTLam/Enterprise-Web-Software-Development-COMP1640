import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Account = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [departmentId, setdepartmentId] = useState(1);
  const [accounts, setAccount] = useState([]);
  const API_BASE = process.env.REACT_APP_API_KEY;
  const handlNewAccount = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/app-user/create`,
        {
          email,
          username,
          phone,
          password,
          class: className,
          address,
          departmentId,
        },{
          headers: {
              Authorization: `Bearer ${token}`  
          }
      }
      );
      console.log("Create account success!");
      const newAccount = [...accounts, response.data];
      setAccount(newAccount);
      navigate("/ad_manage/account");
    } catch (err) {
      console.log("Create account failed!");
    }
  };

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      await axios.post(
        `${API_BASE}/app-user/delete`,
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


  useEffect(() => {
    const listAcount = async () => {
      try {
        const res = await axios.post(
          `${API_BASE}/app-user/list`
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
              <Link to={`/edit_account/${account.userId}`}
                className="btn btn-warning">
                EDIT
              </Link>
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
                    Name
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
                <div className="mb-3">
                  <label for="className" className="form-label">
                    Class
                  </label>
                  <input
                    name="className"
                    type="text"
                    className="form-control"
                    id="className"
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

// const [feedback, setFeedback] = useState("");
//   const [articleId, setArticleId] = useState(6);
//   const [userId, setUserId] = useState(2);
//   const [feedbackTime, setFeedbackTime] = useState(new Date());
//   const [feedbackList, setFeedbackList] = useState([]);
//   const handleFeedback = () => {
//     try {
//       const formattedFeedbackTime = feedbackTime.toISOString();
//       const feb = axios.post(
//         "https://3c78-2405-4802-1d0e-f8f0-e117-fd1b-3a2f-7a91.ngrok-free.app/api/Feedback",
//         {
//           userId,
//           articleId,
//           feedbackContent: feedback,
//           feedbackTime: formattedFeedbackTime,
//         }
//       );
//       const newFeedback = {
//         userId: userId,
//         articleId: articleId,
//         context: feedback,
//         feedbackTime: feedbackTime,
//       };
//       const newFbackList = [...feedbackList, newFeedback];
//       setFeedbackList(newFbackList);
//       setFeedback("");
//       console.log(feb.data);
//       console.log("Send feedback success!");
//     } catch (err) {
//       console.log("Error fail feedback: " + err);
//     }
//   };

//   useEffect(() => {
//     console.log("Feedback list update: ", feedbackList);
//   }, [feedbackList]);

//   return (
//     <div className="container border border-5">
//       <div className="input-group border border-3 mb-2 w-50">
//         <textarea
//           className="form-control"
//           aria-label="With textarea"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//         ></textarea>
//       </div>
//       <div className="mb-2">
//         <button
//           className="btn btn-group btn-outline-primary"
//           type="submit"
//           onClick={handleFeedback}
//         >
//           Save feedback
//         </button>
//       </div>
//       <h3>Feedback</h3>
//       <div className="container">
//         <table className="table table-hover">
//           <thead>
//             <tr>
//               <th scope="col">1</th>
//               <th scope="col">2</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbackList.map((feedback) => (
//               <>
//                 <tr>
//                   <th scope="row">UserID</th>
//                   <td>{feedback.userId}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">ArticleID</th>
//                   <td>{feedback.articleId}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Context</th>
//                   <textarea
//                     className="form-control"
//                     aria-label="With textarea"
//                     value={feedback.context}
//                     onChange={(e) => setFeedback(e.target.value)}
//                   />
//                 </tr>
//                 <tr>
//                   <th scope="row">Date</th>
//                   <td>{feedback.feedbackTime.toLocaleString()}</td>
//                 </tr>
//               </>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <hr />
//       <div className="mb-2">
//         <button
//           className="btn btn-group btn-outline-primary"
//           type="submit"
//           onClick={handleFeedback}
//         >
//           Save feedback
//         </button>
//       </div>
//     </div>
