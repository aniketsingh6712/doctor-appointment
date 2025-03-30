//user appointment table

import React, { useState,useEffect } from 'react'
import { auth } from '../../firebase/firebase-config';
import AppointmentTable from './AppoinmentTable';
import { HeroSection } from '../../component/Home/Home';
function User_Appointment() {
    const [appointmentData,setAppointmentData]=useState([]);
    const getDoctorinfo=async ()=>{
        try {
          const response = await fetch(`http://localhost:3001/appointment-record/fetch/appointment-record/user/${auth?.currentUser?.uid}`, {
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
        getDoctorinfo();
      },[auth?.currentUser])
  return (
    <div>
      <HeroSection/>
        <AppointmentTable data={appointmentData}/>

    </div>
  )
}

export default User_Appointment;