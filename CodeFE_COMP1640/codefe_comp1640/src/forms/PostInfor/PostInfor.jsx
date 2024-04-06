import React from "react";

function PostInfor({ dataTopic }) {
  return (
    <div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col" className="col-3"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Title of Topic</th>
            <td>{dataTopic?.title}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{dataTopic?.content}</td>
          </tr>
          <tr>
            <th scope="row">Start Date</th>
            <td>{dataTopic?.startDate}</td>
          </tr>
          <tr>
            <th scope="row">End Date</th>
            <td>{dataTopic?.endDate}</td>
          </tr>
          <tr>
            <th scope="row">Requirement</th>
            <td>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              veniam eligendi saepe, expedita, voluptates officia recusandae
              impedit eaque consequatur facilis maiores assumenda et quaerat
              earum consectetur ipsum ab reiciendis molestiae!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PostInfor;
