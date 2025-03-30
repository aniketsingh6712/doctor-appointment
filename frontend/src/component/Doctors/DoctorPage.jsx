import React from 'react'
import FilterComponent from './Filter'
import "../Home/HeroSection.css"
import { useState ,useEffect} from 'react';
import { auth } from '../../firebase/firebase-config';
import {  DoctorCard } from './DoctorCard';


const HeroSection = () => {
  return (
    <div className="hero-container" style={{backgroundImage: `url(${"https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww"})`,
      height:"40vh",marginTop:"12vh"
    }}>
      <div style={{position:"relative",zIndex:'1',left:"40%"}}>
        <h3 className="text-center text-white font-bold underline decoration-solid"  style={{fontFamily:"Baskerville old face"}}>DOCTORS</h3>
        
        
      </div>
    </div>
  );
};
function DoctorPage() {
  
  const [data,setData]=useState([]);

   const getDoctorinfo=async ()=>{
      try {
        const response = await fetch("http://localhost:3001/doctor-appointment/getAll/doctor", {
          method: "GET", // Change to GET
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      
        const docsdata = await response.json(); // Parse JSON response
        const response2 = await fetch(`http://localhost:3001/doctor-appointment/get/doctor-key-details`, {
          method: "GET", // Change to GET
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (!response2.ok) {
          throw new Error(`Error: ${response2.status} - ${response2.statusText}`);
        }
      
        const keyData = await response2.json(); 

        const response3 = await fetch(`http://localhost:3001/review-record/fetch/review`, {
          method: "GET", // Change to GET
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (!response3.ok) {
          throw new Error(`Error: ${response2.status} - ${response2.statusText}`);
        }
      
        const ReviewData = await response3.json(); 

  const keyDataMap = keyData.reduce((acc, item) => {
    acc[item.userId] = item; // Map userId to keyData object
    return acc;
  }, {});
  const ReviewDataMap = ReviewData.reduce((acc, item) => {
    if (!acc[item.docId]) {
      acc[item.docId] = []; // Initialize as an array
    }
    acc[item.docId].push(item); // Add review to the array
    return acc;
  }, {});
  // Merge docsdata with keyData
  const combinedData = docsdata.map(doctor => ({
    ...doctor,
    keyDetails: keyDataMap[doctor.userId] || null, // Attach keyDetails if available
    reviews:ReviewDataMap[doctor.userId]||[],
  }));
  

  /**
   * const data = {
    _id: "67d5a91db7b84dc4a5079694",
    userId: "VdG2pjPmmWXsnCn8o4B3BwUybsp2",
    user: "Aniket",
    address: "AFs jalahalli",
    age: 90,
    city: "Bengaluru",
    country: "india",
    email: "ani@gmail.com",
    gender: "Male",
    keyDetails: {
        _id: "67d5abdd4a0a2dda14aef4d2",
        userId: "VdG2pjPmmWXsnCn8o4B3BwUybsp2",
        user: "Aniket",
        fees: "5000",
        speciality: "Cardiologist"
    },
    phone: "7015045383",
    pincode: "560013"
};

// Access fees
console.log(data.keyDetails.fees); 
   * 
   * 
   * 
   */
  // Set the combined data
  setData(combinedData);
  
      } catch (err) {
        console.error("Fetch error:", err);
        
      }
      
    }
    useEffect(()=>{
      getDoctorinfo();
    },[auth?.currentUser])

console.log(data);
const filterData=(fildata)=>{
  setData(fildata);
};

  
  return (
    <>
    <HeroSection/>

    <div style={{marginTop:"3%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
      {/* filtering operation  using onFilter  */}
                <FilterComponent onFilter={filterData}/>
         <div style={{padding:"3vh 3vw"}}>
         {data.map((doctor)=>{
              return <DoctorCard data={doctor} />
          })
         }

        </div>
        
    </div>
    </>
  )
}

export default DoctorPage;