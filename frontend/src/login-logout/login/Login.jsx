import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import "../account.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../fake.css";
import { auth } from "../../firebase/firebase-config";
import { useDispatch } from 'react-redux'
import { AddUser } from '../../redux/userslicer';
const API_URL = import.meta.env.VITE_API_URL;
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const [message, setMessage] = useState("");
  const [userinfo,setUserinfo]=useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };
  const getDataFromDb = async (Db, userId) => {
    if (Db ==="doctor") {
      const response = await fetch(`${API_URL}/doctor-appointment/doctor/${userId}`)
      if (response.ok) {
        const userRecord = await response.json();
        const data={
          data:userRecord,
          db:"doctor"
        }
        dispatch(AddUser(data));
        return true;
      }
      else {
        await signOut(auth);
        setUserinfo("doctor not exist in database");
        return false;
      }
    }
    else if (Db ==="user") {
      const response = await fetch(`${API_URL}/doctor-appointment/user/${userId}`)
      if (response.ok) {
        const userRecord = await response.json();
        const data={
          data:userRecord,
          db:"user"
        }
        dispatch(AddUser(data));
        return true;
      }
      else {
        await signOut(auth);
        setUserinfo("user not exist in database");
        return false;
      }
    }
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    if (checked) {
      
      try {
        const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = response?.user;
        if (user) {

          const res = await getDataFromDb("doctor", user?.uid);
          if (res) {
            navi("/home");
          }

        }
      }
      catch (error) {

        setMessage(error.message);

      }
    }
    else{
     
      try {
        const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = response?.user;
        if (user) {
          const res = await getDataFromDb("user", user?.uid);
          if (res) {
            navi("/home");
          }

        }

      }
      catch (error) {
        setMessage(error.message);
      }
    }



  };
  return (
    <>
      <div className='mainfr'>

        <div className='form pt-4'>

          <div className='header'><h1 style={{ color: '#2368B2', fontSize: '43px', fontWeight: '600' }}>Login</h1>
            <h3 >Enter Your Creadentials to login</h3></div>
          {/* -----------------------slider               */}
          <div className='text-center mb-3'><span className="mr-2 font-semibold text-sky-600">User</span>
            <label class="switch">
              <input type="checkbox" onChange={() => {
                if (checked) {
                  console.log("doctor");
                }
                else {
                  console.log("user");
                }
                setChecked(!checked);


              }} />

              <span class="slider"></span>
            </label>
            <span className="ms-2 font-semibold text-sky-600">Doctor</span></div>


          <form onSubmit={handleAuth} className='pr-5 pl-5'>


            <div className="relative mb-1">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
              <input type="email" name="email" placeholder="  Email" value={formData.email} onChange={handleChange} className="w-full pl-13 pr-4 py-2 border rounded-lg" required />
            </div>
            <div className="relative mb-1">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
              <input type="password" name="password" placeholder="  Password" value={formData.password} onChange={handleChange} className="w-full pl-13 pr-4 py-2 border rounded-lg" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "80%", margin: '3% 3% 3% 7%', fontSize: '20px', fontWeight: '600' }} >Login</button>
          </form>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: '18px', marginLeft: '9%' }}>
            <h5>Don't have an account?</h5> <NavLink to='/register' style={{ textDecoration: 'none', marginLeft: '14px' }} >Register</NavLink>
          </div>
          {userinfo && <p className="mt-4 text-center text-red-500">{userinfo}</p>}
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
        <div className='img' style={{ width: '40%' }}>
          <img src='/6343825.jpg' height='100%' width='100%' style={{ borderRadius: '9px' }}></img>
        </div>
      </div>
    </>

  )
}

export default Login;
