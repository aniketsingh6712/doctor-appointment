const mongoose=require('mongoose');

const DoctorSchema = new mongoose.Schema({
    userId: { type: String, required: true,unique:true },
    user: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] }
});

module.exports = mongoose.model("DoctorRecord", DoctorSchema);


