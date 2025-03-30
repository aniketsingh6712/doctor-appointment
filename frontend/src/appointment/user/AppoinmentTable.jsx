import React from "react";

const AppointmentTable = ({ data }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Doctor Appointments</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Doctor Name</th>
              <th>Designation</th>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Fees</th>
              <th>Age</th>
              <th>Date</th>
              <th>Time</th>
              <th>Gender</th>
              <th>Emergency Contact Name</th>
              <th>Emergency Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.docname}</td>
                  <td>{item.docdesign}</td>
                  <td>{item.patientname}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.fees}</td>
                  <td>{item.age}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.gender}</td>
                  <td>{item.emergency_contact_name}</td>
                  <td>{item.emergency_contact_phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
