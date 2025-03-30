const express = require("express");
const mongoose = require("mongoose");
const DoctorRecordRouter = require("./routes/doctorApp");
const cors = require("cors");
const AppointmentRecordRouter=require("./routes/AppointmentRecord");
const ReviewRecordRouter=require("./routes/RatingRecord");
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
const mongoURI = "mongodb+srv://Aniket6712:Aniket12345%40@cluster0.1szsv.mongodb.net/"; 
/*
if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:

p%40ssw0rd%279%27%21
*/

mongoose.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("FAILED to CONNECT TO MONGODB:", err));

app.use("/doctor-appointment", DoctorRecordRouter);//doctor and user records
app.use("/appointment-record",AppointmentRecordRouter);//for appointment and ending session 
app.use("/review-record",ReviewRecordRouter);//doctors reviews and session reviews


app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
