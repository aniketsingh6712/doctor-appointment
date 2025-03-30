import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../firebase/firebase-config";

const FilterComponent = ({ onFilter}) => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    specialty: "",
    priceRange: 5000,
  });
  const[data,setData]=useState();
  const [copydata,setCopyData]=useState();
  //api call should be done here data will be from here
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
      const docsdata = await response.json();
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
              
// Create a lookup object for keyData using userId
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
// Set the combined data
setData(combinedData);
console.log(combinedData)
setCopyData(combinedData);

    } catch (err) {
      console.error("Fetch error:", err);
      
    }
    
  }
  useEffect(()=>{
    getDoctorinfo();
  },[auth?.currentUser])

// where filter component is storing value
  const handleChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      return newFilters;
    });
  };

  const handleSearch = () => {
    
    const hasFilters = Object.values(filters).some((val) => val !== "" && val !== 5000);
    
    if (!hasFilters) {
      onFilter(copydata);
      return;
    }

    const filteredData = copydata.filter((item) => {
      console.log("Checking item:", item);

      return (
        (filters.search ? item.user.toLowerCase().includes(filters.search.toLowerCase()) : true) &&
        (filters.gender ? item.gender === filters.gender : true) &&
        (filters.specialty ? item.keyDetails?.speciality === filters.specialty : true) &&
        (filters.priceRange ? Number(item.keyDetails?.fees) <= filters.priceRange : true)
      );
    });

    console.log("Filtered Data:", filteredData);

    if (filteredData.length === 0) {
      onFilter(data);
      alert("Empty List is returning");
      setFilters({
        search: "",
        gender: "",
        specialty: "",
        priceRange: 5000, // Keeping the same as default
      });
    } else {
      setCopyData(filteredData);
      onFilter(filteredData);
      setFilters({
        search: "",
        gender: "",
        specialty: "",
        priceRange: 5000, // Keeping the same as default
      });
    }
};

  return (
    <div style={{width:"35vw",margin:"4vh auto" ,height:"fit-content"}}className="card p-4  shadow-lg rounded-3">
        <h3 style={{textAlign:"center",color:"#305FB3",fontWeight:"600"}}>Doctors Filter</h3>
      <div className="card-body">
        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Gender Filter - Radio Buttons */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={filters.gender === "Male"}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={filters.gender === "Female"}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>

        {/* Specialty Filter - Radio Buttons */}
        <div className="mb-3">
          <label className="form-label">Select Specialist:</label>
          <div className="d-flex flex-column gap-2">
            {["Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "General Physician"].map((specialty) => (
              <div className="form-check" key={specialty}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="specialty"
                  value={specialty}
                  checked={filters.specialty === specialty}
                  onChange={(e) => handleChange("specialty", e.target.value)}
                />
                <label className="form-check-label">{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-3">
          <label className="form-label">Price Range:</label>
          <input
            type="number"
            className="form-control"
            min={0}
            max={5000}
            step={100}
            value={filters.priceRange}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= 5000) handleChange("priceRange", value);
            }}
          />
        </div>

        {/* Search Button */}
        <div className="text-center mt-3">
          <button className="btn btn-primary w-100 rounded-pill" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
