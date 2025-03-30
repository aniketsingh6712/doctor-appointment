import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const API_URL = import.meta.env.VITE_API_URL;
const AppointmentTable = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    issues: "",
    prescription: "",
    suggestions: "",
  });

  // Open modal & set selected patient
  const handleOpenSession = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };
  const deleteAppointment=async (id)=>{
    const response=await fetch(`${API_URL}/appointment-record/delete/appointment-record/${id}`,{
      method: "DELETE",
    });
    try{
      if(response.ok){
        setFormData({ issues: "", prescription: "", suggestions: "" }); // Reset form
        alert("Session end successfully");
        nav('/home');
      }
    }
    catch(err){
      console.log("Error in deleting:", err);
    }
  }

  // Close modal
  const handleCloseSession = async () => {
    setShowModal(false);
    const newFormData={...selectedPatient,issues:formData.issues,prescription:formData.prescription,suggestions:formData.suggestions}
    try {
        const response = await fetch(`${API_URL}/appointment-record/send/End-session-record`, {
          method: "POST",
          body: JSON.stringify(newFormData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.ok){
            
        deleteAppointment(selectedPatient._id);
          
        }
       
      } catch (err) {
        console.error("Error adding record:", err);
      }
    
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              <th>Actions</th>
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
                  <td>
                    <Button variant="primary" onClick={() => handleOpenSession(item)}>
                      Session On
                    </Button>
                  </td>
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
      {/* Popup Modal Form */}
      <Modal
        show={showModal}
        onHide={handleCloseSession}
        centered
        backdrop="static"
        className="fade modal-blur"
      >
        <Modal.Header closeButton>
          <Modal.Title>Session for {selectedPatient?.patientName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Issues</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient's issues"
                name="issues"
                value={formData.issues}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prescription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter prescription"
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Suggestions</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor's suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseSession}>
            End Session
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Styles for Popup Effect */}
      <style>{`
        .modal-blur .modal-backdrop {
          backdrop-filter: blur(5px);
          background-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
 
  );
};

export default AppointmentTable;
