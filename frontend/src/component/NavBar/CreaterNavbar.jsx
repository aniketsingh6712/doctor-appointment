import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
function CreaterNavbar() {
  return (
    <div style={{backgroundColor:"white",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 10% 0px 10%",fontSizde:"3px",borderBottom:"1.6px solid #EBEBEB"}}>
                <div style={{display:"flex",justifyContent:"space-evenly",}}>
                    <p className='flex mt-2'><span className='text-primary'><MdEmail/></span>aniketsingh12109gmail.com</p>
                </div>
                <div className='flex'>
                <a
            href="https://github.com/aniketsingh6712"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black text-2xl mx-4 fs-5"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/aniket-singh-872284227/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-2xl fs-5"
          >
            <FaLinkedin />
          </a>
    
                </div>
           </div>
  )
}

export default CreaterNavbar;