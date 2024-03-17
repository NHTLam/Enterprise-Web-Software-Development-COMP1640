const EditAccount = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    username: "",
    class: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await axios.post(
          "https://fb8c-2405-4802-1d0e-f8f0-912e-c785-ed77-a567.ngrok-free.app/app-user/get",
          {
            userId,
          }
        );
        const data = response.data;
        setAccount(data);
        console.log("Edit success!");
      } catch (err) {
        console.log("Edit failed!" + err);
      }
    };
    getAccount();
  }, [userId]);

  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://fb8c-2405-4802-1d0e-f8f0-912e-c785-ed77-a567.ngrok-free.app/app-user/update/`,
        account // Gửi dữ liệu từ state account
      );
      console.log("Account updated successfully!");
      navigate("/");
    } catch (err) {
      console.log("Failed to update account!" + err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
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
            <label htmlFor="clas" className="form-label">
              Class
            </label>
            <input
              name="class"
              type="text"
              className="form-control"
              id="class"
              placeholder="Enter Class"
              value={account.class}
              onChange={handleChange}
            />
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
