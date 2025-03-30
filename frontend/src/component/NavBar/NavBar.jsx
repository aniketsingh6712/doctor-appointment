import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar_css.css"; // Importing CSS file
import CreaterNavbar from "./CreaterNavbar";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { RemoveUser } from "../../redux/userslicer";
import Button from 'react-bootstrap/Button';
const Navbar = () => {
  const User = useSelector((state) => state.user.data);
  const db=useSelector((State)=>State.user.db);
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const nav=useNavigate();
  const handleClick = (name) => {
    setActive(name);
  };
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(RemoveUser());
      nav("/");
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    < div style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%", zIndex: "1000"
    }}>
      <CreaterNavbar />
      {db==="user" &&
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="https://marketplace.canva.com/EAE8K0GX7fY/1/0/1600w/canva-minimalist-hospital-and-medical-health-logo-0zwcZG1ITOE.jpg" alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          {["Home", "Doctors", "Contact", "Blog"].map((item) => (
            <li key={item} >
              <Link
                to={`/${item.toLowerCase()}`}
                className={`nav-link ${active === item ? "active" : ""}`}
                style={{height:"5vh"}}
                onClick={() => handleClick(item)}
              >
                {item}
              </Link>
            </li>
          ))}
            <Link
              to='/user-appointment'
              className={`nav-link ${active === "Appointment" ? "active" : ""}`}
              style={{height:"5vh"}}
              onClick={() => handleClick("Appointment")}
            >
              Appointment
            </Link>
          {!auth?.currentUser &&
            <Link
              to='/login'
              className={`nav-link ${active === "Login" ? "active" : ""}`}
              onClick={() => handleClick("Login")}
            >
              Login
            </Link>
          }
          {auth?.currentUser &&
            <button className="beautiful-button" onClick={()=>{
              nav("/profile")
            }}>
              Profile
          </button>
          }
         
        </ul>



        {/* Make Appointment Button */}
        <div className="flex justify-evenly items-center">
        <Link to="/doctors" className="btn-appointment">
          Make Appointment
        </Link>
        {auth?.currentUser && <Button className="px-1 py-1 ms-4" variant="secondary" onClick={logout}>Logout</Button>}
        </div>
      </nav>
}
{db==="doctor" && <DoctorNavbar/>}
    </div>
        
  );
};

export default Navbar;
//doctor navbar
export const DoctorNavbar=()=> {
 

  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const nav=useNavigate();
  const handleClick = (name) => {
    setActive(name);
  };
  const logout = async () => {
    console.log("doctor");
    try {
      await signOut(auth);
      dispatch(RemoveUser());
      nav("/");
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="https://marketplace.canva.com/EAE8K0GX7fY/1/0/1600w/canva-minimalist-hospital-and-medical-health-logo-0zwcZG1ITOE.jpg" alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          {["Home", "Contact", "Blog"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                style={{height:"5vh"}}
                className={`nav-link ${active === item ? "active" : ""}`}
                onClick={() => handleClick(item)}
              >
                {item}
              </Link>
            </li>
          ))}
           <Link
              to='/doc-appointment'
              className={`nav-link ${active === "Appointment" ? "active" : ""}`}
              onClick={() => handleClick("Appointment")}
              style={{height:"5vh"}}
            >
              Appointment
            </Link>
          {!auth?.currentUser &&
            <Link
              to='/login'
              className={`nav-link ${active === "Login" ? "active" : ""}`}
              onClick={() => handleClick("Login")}
            >
              Login
            </Link>
          }
          {auth?.currentUser &&
            <button className="beautiful-button" onClick={()=>{
              nav("/profile")
            }}>
              Profile
          </button>
          }
         
        </ul>



        {/* Make Appointment Button */}
        <div className="flex justify-evenly items-center">
        {auth?.currentUser && <Button className="px-1 py-1 ms-4" variant="secondary" onClick={logout}>Logout</Button>}
        </div>
      </nav>
  )
}
