//doctor previous appointment

import React from 'react'
import { auth } from '../../firebase/firebase-config';
import { DoctorCard } from './PatientCard';
import { useState,useEffect } from 'react';
const DoctorPreviousAppointment = () => {
    const [appointmentData,setAppointmentData]=useState([]);
        const getAppointmentinfo=async ()=>{
            try {
              const response = await fetch(`http://localhost:3001/appointment-record/fetch/End-session-record/doctor/${auth?.currentUser?.uid}`, {
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
      {appointmentData.length===0?<h2 style={{color:"white",textAlign:"center",marginTop:"10%"}}>No Previous Session</h2>:
       <>
       <h1 className="text-2xl font-bold text-center my-4 text-white">Patient Records</h1>
       <DoctorCard patients={appointmentData} /></>
      }
     
  </div>
  )
}

export default DoctorPreviousAppointment