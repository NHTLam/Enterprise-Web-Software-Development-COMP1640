import React from 'react';
import PostInfor from "../../forms/PostInfor/PostInfor"

function TopicDetail({dataTopic}) {
  return (
    <div>
      <form>
        <div
          className="modal fade"
          id="topicDetail"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Topic Detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <PostInfor dataTopic ={dataTopic}/>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div >
          </div >
        </div >
      </form >
    </div>
  )
}

export default TopicDetail