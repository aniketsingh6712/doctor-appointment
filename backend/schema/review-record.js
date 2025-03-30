
//for doctor reviews 
const mongoose=require('mongoose');
const UserSchema = new mongoose.Schema({
    docId: { type: String, required: true},
    docname: { type: String, required: true },
    docdesign: { type: String, required: true},
    review: { type: String, required: true},
    rating: { type: Number, required: true },
})

module.exports = mongoose.model("ReviewRecord", UserSchema);