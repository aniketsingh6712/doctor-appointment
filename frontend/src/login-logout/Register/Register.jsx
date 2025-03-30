import React from 'react'
import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "../account.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { faEnvelope, faLock, faUser, faPhone, faMapMarkerAlt, faCity, faGlobe, faKey, faHashtag, faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import "../fake.css";
import {auth} from "../../firebase/firebase-config";

const API_URL = import.meta.env.VITE_API_URL;
function Register() {
    const [formData, setFormData] = useState({

    userId:"",
    user: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    country: "",
    age: "",
    gender: "",
   
      });
      const nav=useNavigate();
      const [checked,setChecked]=useState(false);
   
      const [message, setMessage] = useState("");
   
      const [errors, setErrors] = useState({});

    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const validate = () => {
        let tempErrors = {};
        if (formData.user.length < 3) tempErrors.username = "Username must be atleast 3 characters";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
        if (formData.password.length < 6) {
          tempErrors.password = "Password must be at least 6 characters";
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
          tempErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
       
        if (formData.age < 15) tempErrors.age = "Age must be greater than 15";
        if (!/^[0-9]{10}$/.test(formData.phone)) tempErrors.phone = "Phone number must be of 10 digits";
        
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
      const addUserRecord = async (newFormData) => {
     
        try {
          const response = await fetch(`${API_URL}/http://localhost:3001/doctor-appointment/user`, {
            method: "POST",
            body: JSON.stringify(newFormData),
            headers: {
              "Content-Type": "application/json",
            },
          });
         
        } catch (err) {
          console.error("Error adding record:", err);
        }
      };
      const addDoctorRecord = async (newFormData) => {
     
        try {
          const response = await fetch(`${API_URL}/doctor-appointment/doctor`, {
            method: "POST",
            body: JSON.stringify(newFormData),
            headers: {
              "Content-Type": "application/json",
            },
          });
         
        } catch (err) {
          setMessage(err);
        }
      };
      const handleAuth = async (e) => {
        e.preventDefault();
        if (validate()) {
          if(checked){
            try {
              const response= await createUserWithEmailAndPassword(auth, formData.email, formData.password);
              const user = response?.user;
       
              const newFormData = { ...formData, userId: user.uid };
               addDoctorRecord(newFormData);
               nav("/");
             }
           catch (error) {
            setMessage(err);
           }
          }
          else{
            try {
              const response= await createUserWithEmailAndPassword(auth, formData.email, formData.password);
              const user = response?.user;
       
              const newFormData = { ...formData, userId: user.uid };
               addUserRecord(newFormData);
               nav("/login");
             }
           catch (error) {
             setMessage(err);
           }
          }
          
        }
        
      };
  return (
     <>
     <div className='mainfr'>
    
    <div className='form' >
        
        <div className='header'><h1 style={{color:'#2368B2',fontSize:'43px',fontWeight:'600'}}>Sign Up</h1>
        <h3 >Create your account</h3></div>
        {/* -----------------------slider               */}
        <div className='text-center mb-3'><span className="mr-2 font-semibold text-sky-600">User</span>
    <label class="switch">
  <input type="checkbox"  onChange={()=>{
  
    if(checked){
        console.log("doctor");
    }
    else{
        console.log("user");
    }
    setChecked(!checked);

  }}/>
 
  <span class="slider"></span> 
</label>
<span className="ms-2 font-semibold text-sky-600">Doctor</span></div>


     <form onSubmit={handleAuth} className='pr-3 pl-3'>
                   <div className="relative mb-1">
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="user" placeholder="USer Name" value={formData.user} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                    {errors.username && <p className='text-red-500 bg-orange-200 text-center mx-4 my-2'>{errors.username}</p>}
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                    {errors.phone && <p className='text-red-500 bg-orange-200 text-center mx-4 my-2'>{errors.phone}</p>}
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faHashtag} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faCity} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faGlobe} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                  </div>
                  <div className="relative mb-1">
                    <FontAwesomeIcon icon={faBirthdayCake} className="absolute left-3 top-3 text-gray-400" />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                    {errors.age && <p className='text-red-500 bg-orange-200 text-center mx-4 my-2'>{errors.age}</p>}
                  </div>
                  <div className="mb-1">
                    <label className="block text-gray-600 mb-2">Gender</label>
                    <div className="flex gap-4">
                      <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
                      <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                      <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
                    </div>
                  </div>

                  <div className="relative mb-1">
                              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                              {errors.email && <p className='text-red-500 bg-orange-200 text-center mx-4 my-2'>{errors.email}</p>}
                            </div>
                            <div className="relative mb-1">
                              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg" required />
                              {errors.password && <p className='text-red-500 bg-orange-200 text-center mx-4 my-2'>{errors.password}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary" style={{width:"80%",margin:'3% 3% 3% 7%',fontSize:'20px',fontWeight:'600'}} >Sign Up</button>
                  </form>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',fontSize:'17px',marginLeft:'9%'}}>
    <h5>Already a user?</h5> <NavLink to='/' style={{textDecoration:'none',marginLeft:'14px',fontWeight:"600"}} >Login</NavLink>
</div>

                  {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                  </div>
                  <div className='img' style={{width:'40%',margin:'50px ',}}>
<img src='/6343825.jpg' height='100%' width='100%' style={{borderRadius:'9px'}}></img>
</div>
                  </div>
                </>

  )
}

export default Register;
