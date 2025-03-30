import {useState } from "react";
import {User,Folder} from "lucide-react";

import { useSelector ,useDispatch} from "react-redux";
import EditableTable from "./profile_settings";
import { UpdateUser } from "../../redux/userslicer";
import UserPreviousAppointment from "../../appointment/previous appointment/user";

const API_URL = import.meta.env.VITE_API_URL;
/***-----------------------------------------------------sidebar------------------------------- */
export default function PatientSideBar() {
  const UserData = useSelector((state) => state.user.data);
  
  const [selectedComponent, setSelectedComponent] = useState(null);
  const dispatch=useDispatch();
  



  /***-----------------user update in mongodb and redux store */
  const UpdateUserinDbandStore=async (NewData)=>{
     
        const response = await fetch(`${API_URL}/doctor-appointment/user-update/${NewData._id}`, {
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
        
      case "Profile":
        return <EditableTable Userdata={UserData[0]} UserUpdate={UpdateUserinDbandStore}/>;
      case "Appointment":
        return <UserPreviousAppointment/>;
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
