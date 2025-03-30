import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

export const ContactUs = () => {
    const nav = useNavigate();
    
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("access_key", "d37561d7-ed11-4ec5-9f4f-3a853d630c0d");
        
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());
        
        if (res.success) {
            console.log("Success", res);
        }
        nav('/');
    };
    
    return (
        <div className='main flex flex-row justify-around items-center max-h-[600px]' style={{marginTop:"13vh"}}>
            <div className="form-container bg-white p-10 rounded-lg shadow-md w-3/5 max-w-lg my-5 max-h-[550px]">
                <h1 className="text-gray-700 font-bold text-xl">Contact Us</h1>
                <br />
                <form onSubmit={onSubmit} method="POST" className="flex flex-col">
                    <input type="text" id="name" name="name" placeholder="Name" required 
                        className="mb-5 p-3 border border-gray-300 rounded w-full bg-blue-100" />
                    
                    <input type="email" id="email" name="email" placeholder="Email" required 
                        className="mb-5 p-3 border border-gray-300 rounded w-full bg-blue-100" />
                    
                    <textarea id="message" name="message" rows="4" placeholder="Message" required 
                        className="mb-5 p-3 border border-gray-300 rounded w-full bg-blue-100" ></textarea>
                    
                    <button type="submit" className="p-3 border-none rounded bg-blue-600 text-white text-lg font-semibold cursor-pointer hover:bg-blue-700">
                        Send Us <i className="fa fa-solid fa-arrow-right"></i>
                    </button>
                </form>
            </div>
            
            <div className='img w-2/5 my-12'>
                <img src='/5124556.jpg' className='w-4/5 rounded-lg' alt='Contact Us' />
            </div>
        </div>
    );
};