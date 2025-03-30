import React from "react";
import "./HeroSection.css";
import { FaHome, FaHeadphones, FaClock } from "react-icons/fa";

export const HeroSection = () => {

  return (
    <div className="hero-container">
      <div className="hero-content">
        <p className="small-text " style={{ color: "white" }}>Your Health Care Solution</p>
        <h1 className="large-text">Your Most Trusted <br /> Health Partner</h1>
        <div className="buttons">
          <button className="btn btn-primary" >Get Started</button>
          <button className="btn btn-outline-light">Track Appointment</button>
        </div>
      </div>
    </div>
  );
};

const MedicalServices = () => {
  const services = [
    { name: "Cardiologist", image: "https://media.istockphoto.com/id/2148675494/photo/human-heart-on-ecg-graph-background.jpg?s=612x612&w=0&k=20&c=Q_3D4AFW1io68ZiFynfkNLkpHwHYCc3GC_Gu4rA9NJY=", description: "Specialized in heart diseases and treatments. Our cardiologists diagnose and treat conditions like heart attacks, hypertension, and arrhythmias using advanced medical technology." },
    { name: "Dermatologist", image: "https://media.istockphoto.com/id/2047521578/vector/annual-skin-exam-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=E37pEHVfULeZUU-JRqqaoHWQR9S1ZJSpYaHP9oofvhg=", description: "Expert in skin, hair, and nail disorders. Our dermatologists provide treatments for acne, eczema, skin infections, and conduct skin cancer screenings." },
    { name: "Neurologist", image: "https://media.istockphoto.com/id/1415185410/vector/scientist-study-human-brain-and-psychology-doctor-neurologist-character-examine-huge-organ.jpg?s=612x612&w=0&k=20&c=nqoAJzgFH1QUN5_RztKPdJbw8qU34PhxTGNgAl72kE8=", description: "Deals with nervous system disorders and treatments. Our neurologists specialize in stroke management, epilepsy, Parkinson's disease, and migraines." },
    { name: "Orthopedic", image: "https://media.istockphoto.com/id/656876158/photo/pain-in-leg.jpg?s=612x612&w=0&k=20&c=LVfVdOzzE7tji8q4HMXrkWxXel0kG3zykujA07t-AFU=", description: "Specialist in bones, joints, and muscle treatments. We offer solutions for fractures, arthritis, joint replacements, and sports injuries." },
    { name: "Pediatrician", image: "https://media.istockphoto.com/id/508509000/photo/professional-pediatrician-examining-infant.jpg?s=612x612&w=0&k=20&c=gp0CvpwTWX1rs19ZP8nLiAweUEgIij2tWXB56wVTOeE=", description: "Healthcare provider for infants and children. Our pediatricians focus on child growth, immunizations, and common childhood illnesses." },
    { name: "Psychiatrist", image: "https://media.istockphoto.com/id/965851348/photo/doctor-consulting-male-patient-working-on-diagnostic-examination-on-mens-health-disease-or.jpg?s=612x612&w=0&k=20&c=peEZkPCUkJIHvDukEPGPn1zrOU9iFhlH3sDNV9vPiM4=", description: "Expert in mental health and psychological disorders. We offer counseling and treatment for anxiety, depression, schizophrenia, and other mental health conditions." },
    { name: "General Physician", image: "https://media.istockphoto.com/id/2202294253/vector/friendly-doctor-with-a-stethoscope.jpg?s=612x612&w=0&k=20&c=6snGdfeeLRzGelmItfEQ4MoQlBPNeNpWyUbwE0PBpqY=", description: "Our general physicians offer comprehensive healthcare, including routine check-ups, chronic disease management, and preventive care to ensure your well-being."}  ];

  return (
    <div className="medical-services container mt-5">
      <h2 className="text-center"style={{fontFamily:"Baskerville old face",fontSize:"37px"}}>Our Medical Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="d-flex justify-center  my-2" style={{marginLeft:"10vw"}}>
            {index%2==1 && <div style={{width:"3vw"}}></div>}
            <img src={service.image} alt={service.name} className="service-image" style={{ width: "12vw", height: "auto",borderRadius:"10px" }} />
            <div className="service-text border text-center" style={{ backgroundColor: "#3EADF7", padding: "15px", borderRadius:"15px",color: "white",width:"45vw" }}>
              <h3 className="fw-bold">{service.name}</h3>
              <p className="text-white">{service.description}</p>
            </div>
            {index%2==0 && <div style={{width:"20vw"}}></div>}
            
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="why-choose-container">
        <div className="box" style={{ backgroundColor: "#3EADF7", color: "white" }}>
          <h3><b>Why Choose Us</b></h3>
          <p className="text-white mt-4">We provide the best healthcare services with experienced doctors and modern facilities.</p>
        </div>
        <div className="box">
          <FaHome className="icon" />
          <h3>Appointment</h3>
          <p>Book your appointment easily with our online scheduling system.</p>
        </div>
        <div className="box">
          <FaHeadphones className="icon" />
          <h3>Emergency Cases</h3>
          <p>Call our emergency helpline anytime. We are here for you 24/7.</p>
        </div>
        <div className="box">
          <FaClock className="icon" />
          <h3>Working Hours</h3>
          <p>Monday - Friday: 9 AM - 7 PM<br />Saturday - Sunday: 10 AM - 5 PM</p>
        </div>
      </div>
      <MedicalServices />
    </>
  );
};

export default Home;