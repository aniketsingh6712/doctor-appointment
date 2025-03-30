import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {auth} from "../../firebase/firebase-config";
const API_URL = import.meta.env.VITE_API_URL;
const ProgressBar = ({ step, steps }) => {
  
    return (
      <div className="w-full flex items-center justify-between mb-6 relative">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center w-1/3 relative">
            {/* Line between steps */}
            {index > 0 && (
              <div className="absolute top-5 left-[-50%] w-full h-1 bg-gray-300 z-0"></div>
            )}
  
            {/* Step Circles */}
            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold z-10 ${
                step === index + 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            
            {/* Step Label */}
            <p className="text-xs text-center mt-1">{label}</p>
          </div>
        ))}
      </div>
    );
  };
  const steps = [
    "Select Appointment Date & Time",
    "Patient Information",
    "Payment",
  ];
  
  const AppointmentForm = () => {
    const nav=useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      age:"",
      emergency_name:"",
      emergency_phone:"",
      gender:""
    });
    const location = useLocation();
    console.log(location.state?.data)
    const Doctordata=location.state?.data;

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    // Function to handle date selection and disable weekends
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 0 || day === 6) {
      alert("Weekends are not allowed! Please select a weekday.");
      setFormData({ ...formData, date: "" }); // Reset invalid date
    } else {
      setFormData({ ...formData, date: e.target.value });
    }
  };
  //submitting data
  const submitForm=async ()=>{
const newFormData={docId:Doctordata.id,docname:Doctordata.name,docdesign:Doctordata.desg,patientname:formData.name,appoint_creater_id:auth.currentUser?.uid,phone:formData.phone,
email: formData.email,fees:Doctordata.price,date: formData.date,time: formData.time,age:  formData.age,
gender:formData.gender,emergency_contact_name: formData.emergency_name,emergency_contact_phone:formData.emergency_phone}
try {
  const response = await fetch(`${API_URL}/appointment-record/send/appointment-record`, {
    method: "POST",
    body: JSON.stringify(newFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    nav('/home');
  }
 
} catch (err) {
  console.error("Error adding record:", err);
}


  }

  
    return (
        <div style={{marginTop:"22vh"}}> 
        <ProgressBar step={step} steps={steps} />
      <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-2xl bg-white">
       
        
  
        {/* Step Content */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Appointment Date & Time</h2>
            <div className="grid grid-cols-2 gap-4">
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleDateChange} 
              className="border p-2 rounded w-full" 
            />
            <select 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Time</option>
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
            </div>
          </div>
        )}
  
        {step === 2 && (
          <div>
          <h2 className="text-xl font-bold mb-4">Patient Information</h2>
        
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        
          {/* Gender Selection */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Gender:</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Other
              </label>
            </div>
          </div>
        
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        
          <input
            type="text"
            placeholder="Emergency Contact Name"
            name="emergency_name"
            value={formData.emergency_name}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        
          <input
            type="tel"
            placeholder="Emergency Contact Number"
            name="emergency_phone"
            value={formData.emergency_phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        )}
  
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <input type="text" placeholder="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Expiry Date" name="expiry" value={formData.expiry} onChange={handleChange} className="border p-2 rounded w-full" />
              <input type="text" placeholder="CVV" name="cvv" value={formData.cvv} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
          </div>
        )}
  
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
          {step < 3 ? (
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
          ) : (
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={submitForm}>Submit</button>
          )}
        </div>
      </div>
      </div>
    );
  };
  
  export default AppointmentForm;
  
