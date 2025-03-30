//user and doctor previous appointment data
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Rating } from "@mui/material";
//user previous appointment data with review button
const API_URL = import.meta.env.VITE_API_URL;
export const PatientCard = ({ patients }) => {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleOpen = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setReview("");
    setRating(0);
  };
  const handleSubmit = async () => {
    console.log("Review:", review, "Rating:", rating);
   const newData={docId:selectedPatient.docId,docname:selectedPatient.docname,docdesign:selectedPatient.docdesign,review:review,rating:rating}
    try {
        const response = await fetch(`${API_URL/review-record/send/review`, {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.ok){
            
          handleClose();
          
        }
       
      } catch (err) {
        console.error("Error adding record:", err);
      }
  
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {patients.map((patient, index) => (
        <div
          key={index}
          className="w-full bg-neutral-300 shadow-lg rounded-2xl p-4 flex flex-col gap-6"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">{patient.patientname}</h2>
              <p className="text-gray-600">Age: {patient.age} | Gender: {patient.gender}</p>
              <p className="text-gray-600">Doctor: {patient.docname} ({patient.docdesign})</p>
              <p className="text-gray-600">Phone: {patient.phone}</p>
              <p className="text-gray-600">Emergency Contact: {patient.emergency_contact_name} ({patient.emergency_contact_phone})</p>
            </div>
            <div>
              <p className="text-gray-600">Date: {patient.date} | Time: {patient.time}</p>
              <p className="text-gray-600">Fees: ${patient.fees}</p>
              <p className="text-gray-600">Issues: {patient.issues}</p>
              <p className="text-gray-600">Prescription: {patient.prescription}</p>
              <p className="text-gray-600">Suggestions: {patient.suggestions}</p>
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={()=>handleOpen(patient)} className="w-32">
            Add Review
          </Button>
        </div>
      ))}

      {/* Review Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Rating
            name="star-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Your Review"
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};




//doctor previous appointment data 
export const DoctorCard = ({ patients }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {patients.map((patient, index) => (
        <div
          key={index}
          className="w-full bg-neutral-300 shadow-lg rounded-2xl p-4 flex items-center gap-6 "
        >
          <div className="flex-grow">
            <h2 className="text-xl font-semibold">{patient.patientname}</h2>
            <p className="text-gray-600">Age: {patient.age} | Gender: {patient.gender}</p>
            <p className="text-gray-600">Doctor: {patient.docname} ({patient.docdesign})</p>
            <p className="text-gray-600">Phone: {patient.phone}</p>
            <p className="text-gray-600">Emergency Contact: {patient.emergency_contact_name} ({patient.emergency_contact_phone})</p>
          </div>
          <div className="flex-grow">
            <p className="text-gray-600">Date: {patient.date} | Time: {patient.time}</p>
            <p className="text-gray-600">Fees: ${patient.fees}</p>
            <p className="text-gray-600">Issues: {patient.issues}</p>
            <p className="text-gray-600">Prescription: {patient.prescription}</p>
            <p className="text-gray-600">Suggestions: {patient.suggestions}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

