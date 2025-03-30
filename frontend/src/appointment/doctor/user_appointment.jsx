//doctor appointment table

import React, { useState,useEffect } from 'react'
import { auth } from '../../firebase/firebase-config';
import AppointmentTable from './AppointmentTable';
import { HeroSection } from '../../component/Home/Home';
const API_URL = import.meta.env.VITE_API_URL;
function Doc_Appointment() {
    const [appointmentData,setAppointmentData]=useState([]);
    const getAppointmentinfo=async ()=>{
        try {
          const response = await fetch(`${API_URL}/appointment-record/fetch/appointment-record/doctor/${auth?.currentUser?.uid}`, {
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
    <div>
      <HeroSection/>
        <AppointmentTable data={appointmentData}/>

    </div>
  )
}

export default Doc_Appointment;
