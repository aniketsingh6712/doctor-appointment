import React, { useMemo } from 'react'
import { FaStar } from "react-icons/fa";
import "./Doctorcard.css";
import { useNavigate } from 'react-router-dom';

export const DoctorCard=({data})=> {
  const navigate=useNavigate();
    const sendDataOnClick = () => {
      navigate("/form", { state: {data:{id:data.userId,name:data.user,desg:data.keyDetails?.speciality,price:data.keyDetails?.fees} } });
    };
    const reviewHandler=()=>{
      navigate("/review",{state:{data:data.reviews}});
    }
    const Rating = useMemo(() => {
      if (!data?.reviews || data.reviews.length === 0) return 1; // Handle empty reviews
    
      const totalRating = data.reviews.reduce((sum, record) => sum + record.rating, 0);
      return totalRating / data.reviews.length; // Calculate average rating
    }, [data.reviews.length]);
  return (
    
     <div className="doctor-card">
      {/* Profile Image */}
      <div className="profile-image">
        <img src={data.keyDetails?.img?data.keyDetails.img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdG9yfGVufDB8fDB8fHww"} alt={data.user} />
      </div>
      
      {/* Doctor Details */}
      <div className="doctor-details" style={{width:"20vw" ,marginLeft:"5vw"}}>
        <h2>{data.user}</h2>
        <p className="designation">{data.keyDetails?. speciality}</p>
        
        
        {/* Rating */}
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < Rating ? "star-filled" : "star-empty"}
            />
          ))}
        </div>
        
        <p className="location">{data.city},{data.country}</p>
      </div>
      
      {/* Appointment Info */}
      <div className="appointment-info" style={{width:"15vw",textAlign:"start"}}>
        <p className="address">{data.city}, {data.country}</p>
        <p className="price">${data.keyDetails?.fees?data.keyDetails.fees:500}</p>
        <div className="buttons">
          <button className="view-profile" onClick={reviewHandler}>View Review</button>
          <button className="book-appointment" onClick={sendDataOnClick}>Book Appointment</button>
        </div>
      </div>
    </div>
  )
}

