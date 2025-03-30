//user previous appointment
import React from 'react'
import { auth } from '../../firebase/firebase-config';
import { PatientCard } from './PatientCard';
import { useState,useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
const UserPreviousAppointment = () => {
    const [appointmentData,setAppointmentData]=useState([]);
        const getAppointmentinfo=async ()=>{
            try {
              const response = await fetch(`${API_URL}/appointment-record/fetch/End-session-record/user/${auth?.currentUser?.uid}`, {
                method: "GET", // Change to GET
                headers: {
                  "Content-Type": "application/json",
                },
              });
            
              if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
              }
              const docsdata = await response.json();
              setAppointmentData(docsdata);
        
            } catch (err) {
              console.error("Fetch error:", err);
              
            }
          }
          useEffect(()=>{
            getAppointmentinfo();
          },[auth?.currentUser])

  return (
    <div className="container mx-auto">
      {appointmentData.length===0?<h2 style={{color:"white",textAlign:"center",marginTop:"10%"}}>No Previous Appointment</h2>:
       <>
       <h1 className="text-2xl font-bold text-center my-4 text-white">Patient Records</h1>
       <PatientCard patients={appointmentData} /></>
      }
     
  </div>
  )
}

export default UserPreviousAppointment
