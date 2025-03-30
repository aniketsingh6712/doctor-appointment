const mongoose=require('mongoose');
const EndSessionSchema = new mongoose.Schema({
    docId: { type: String, required: true},
    docname: { type: String, required: true },
    docdesign: { type: String, required: true },
    patientname: { type: String, required: true },
    appoint_creater_id:{type:String,required:true},
    phone: { type: String, required: true},
    fees: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    emergency_contact_name: { type: String, required: true },
    emergency_contact_phone: { type: String, required: true},
    prescription: { type: String, required: true}, 
    issues: { type: String, required: true}, 
    suggestions: { type: String, required: true}
});

module.exports = mongoose.model("EndSessionRecord", EndSessionSchema);