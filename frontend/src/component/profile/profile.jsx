import React from 'react'
import DoctorSideBar from './DoctorSideBar';
import { useSelector } from 'react-redux';
import PatientSideBar from './UserSideBar';
function Profile() {
    const db = useSelector((state) => state.user.db);
  return (
    <>
    {db==="doctor"?<DoctorSideBar/>: <PatientSideBar/>}
   
    </>
  )
}

export default Profile;