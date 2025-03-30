import { useEffect, useState } from "react";
import { User,Keyboard,Folder} from "lucide-react";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import EditableTable from "./profile_settings";
import { UpdateUser } from "../../redux/userslicer";
import DoctorPreviousAppointment from "../../appointment/previous appointment/doctor";
const API_URL = import.meta.env.VITE_API_URL;
const Key_details_form=()=>{
  const User = useSelector((state) => state.user.data);
  const [formData, setFormData] = useState({ fees: "", speciality: "" });
  const nav=useNavigate();
  const specialities = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "General Physician"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const newData={userId:auth?.currentUser.uid,user:User[0].user,fees:formData.fees,speciality:formData.speciality};
  
    try {
      const response = await fetch(`${API_URL}/doctor-appointment/doctor-key-details`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.ok){
        nav("/home");
      }
      
    } catch (err) {
      setMessage(err);
    }
   
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-600 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-1">Visitation Fees</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            placeholder="In Rupees"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="w-full p-2 border text-white rounded-lg focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Speciality</option>
            {specialities.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


/***-----------------------------------------------------sidebar------------------------------- */
export default function DoctorSideBar() {
  const UserData = useSelector((state) => state.user.data);
  const [docsData,setDocsData]=useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const dispatch=useDispatch();
  const getDoctorinfo=async ()=>{
    try {
      const response = await fetch(`${API_URL}/doctor-appointment/doctor-key-details/${auth?.currentUser.uid}`, {
        method: "GET", // Change to GET
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const docsdata = await response.json(); // Parse JSON response

      setDocsData(docsdata);

    } catch (err) {
      console.error("Fetch error:", err);
      
    }
    
  }

  useEffect(()=>{
    getDoctorinfo();
  },[])




  /***-----------------user update in mongodb and redux store */
  const UpdateUserinDbandStore=async (NewData)=>{
     
        const response = await fetch(`${API_URL}/doctor-appointment/doctor-update/${NewData._id}`, {
          method: "PUT",
          body: JSON.stringify(NewData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        try{
          if(response.ok){
            alert("User Data is Update in DataBase!");
            const NewReduxData={
              data:NewData,
              db:""
            }
            dispatch(UpdateUser(NewReduxData));
          }

        }catch(err){
          console.log(err);
        }
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Key Details":
        if(docsData.length===0){
          return <Key_details_form/>;
        }
        else{
          return (<div className="mt-5">
               <ul className="flex flex-row justify-between items-center bg-gray-700 p-4 mt-6 rounded-xl shadow-md text-white text-xl font-semibold">
        <li className="flex-1 text-center border-r border-gray-500 pr-4">🧾 Visitation Fees: {docsData[0].fees}</li>
        <li className="flex-1 text-center pl-4">🏥 Designation: {docsData[0].speciality}</li>
      </ul>
          </div>
          )
        }
        
      case "Profile":
        return <EditableTable Userdata={UserData[0]} UserUpdate={UpdateUserinDbandStore}/>;
      case "Appointment":
        return <DoctorPreviousAppointment/>;
      default:
        return <div className="p-5 text-white">Select an option</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5" style={{marginTop:"14vh"}}>
        <nav>
          <ul className="space-y-4">
          <li 
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${selectedComponent === "Profile" ? "bg-gray-700 text-white" : "hover:text-gray-300"}`}
              onClick={() => setSelectedComponent("Profile")}
            >
              <User size={20} /> <span>User Details</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${selectedComponent === "Key Details" ? "bg-gray-700 text-white" : "hover:text-gray-300"}`}
              onClick={() => setSelectedComponent("Key Details")}
            >
              <Keyboard size={20} /> <span>Key Details</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${selectedComponent === "Appointment" ? "bg-gray-700 text-white" : "hover:text-gray-300"}`}
              onClick={() => setSelectedComponent("Appointment")}
            >
              <Folder size={20} /> <span>Previous Appointment</span>
            </li>
          
         
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div style={{marginTop:"14vh"}} className="ml-64 flex-1 p-5 bg-gray-800 min-h-screen">{renderComponent()}</div>
    </div>
  );
}
