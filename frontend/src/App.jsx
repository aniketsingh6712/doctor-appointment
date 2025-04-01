


import Home from "./component/Home/Home";
import {Routes,Route} from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./component/NavBar/NavBar";
import DoctorPage from "./component/Doctors/DoctorPage";
import AppointmentForm from "./component/patient form/PatientForm";
import Login from "./login-logout/login/Login";


import Profile from "./component/profile/profile";
import User_Appointment from "./appointment/user/user_appointment";
import Doc_Appointment from "./appointment/doctor/user_appointment";
import DoctorPreviousAppointment from "./appointment/previous appointment/doctor";
import ReviewList from "./component/Doctors/reviewList";
import Footer from "./Footer";
import { ContactUs } from "./pages/contact Us/ContactUs";
import Register from "./login-logout/Register/Register";

// import AuthForm from "./login-logout/auth";
function App() {


  return (
    <>
  <BrowserRouter>

<Navbar/>
 
<Routes>
<Route exact path="/home" element={<Home/>}/>
<Route exact path="/doctors" element={<DoctorPage/>}/>
<Route exact path="/form" element={<AppointmentForm/>}/>
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/" element={<Login/>}/>
<Route exact path="/profile" element={<Profile/>}/>
<Route exact path="/user-appointment" element={<User_Appointment/>}/>
<Route exact path="/doc-appointment" element={<Doc_Appointment/>}/>
<Route exact path="/doc-prev-app" element={<DoctorPreviousAppointment/>}/>
<Route exact path="/review" element={<ReviewList/>}/>
<Route exact path="/contact" element={<ContactUs/>}/>





</Routes>

<Footer/>
</BrowserRouter>
    </>
  )
}

export default App
