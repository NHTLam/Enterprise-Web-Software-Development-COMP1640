const HomeAdmin = () => {
  // const [feedback, setFeedback] = useState("");
  // const [feedbackList, setFeedbackList] = useState([]);
  // const handleFeedback = () => {
  //   const newFback = {
  //     username: "Student1",
  //     context: feedback,
  //   };
  //   const newFbackList = [...feedbackList, newFback];
  //   setFeedbackList(newFbackList);
  //   setFeedback("");
  // };

  // useEffect(() => {
  //   console.log("Feedback list update: ", feedbackList);
  // }, [feedbackList]);

  return (
    <div className="container border border-5">
      <h3>Feedback</h3>
      <div className="input-group border border-3 mb-2 w-50">
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-2">
        <button
          className="btn btn-group btn-outline-primary"
          type="submit"
          onClick={handleFeedback}
        >
          Save feedback
        </button>
      </div>
      <hr />
      {feedbackList.length > 0 && (
        <div className="card-list">
          {feedbackList.map((feedback, index) => (
            <div
              key={index}
              className="card-body border border-3 w-50 mb-2 rounded rounded-2"
            >
              <h5 className="card-title m-1">{feedback.username}</h5>
              <p className="card-text m-1">{feedback.context}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;
