import React from "react";
import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const ReviewList = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const reviewsData = location.state?.data || []; // Ensures it's an array

  return (
    <div className="space-y-4 p-4" style={{marginTop:"16vh",minHeight:"67vh"}}>
      {reviewsData.length > 0 ? (
        reviewsData.map((review, index) => (
          <div key={index} className="p-4 border shadow-lg rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold">Anonymous</h3>
              <div className="flex text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-3" style={{fontSize:"30px"}}>No reviews available</p>
      )}
       <Button variant="primary" onClick={()=>navigate("/doctors")}>Go Back</Button>
    </div>
  );
};

export default ReviewList;
