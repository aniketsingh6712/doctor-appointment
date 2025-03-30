const mongoose=require('mongoose');

const DoctorKeyDetailSchema = new mongoose.Schema({
    userId: { type: String, required: true,unique:true },
    user: { type: String, required: true },
    fees: { type: String, required: true, },
    speciality: { type: String, required: true },
    
});

module.exports = mongoose.model("DoctorKeyDetail", DoctorKeyDetailSchema);