const express = require("express");
const userRecord = require("../schema/user-record");
const doctorRecord=require("../schema/doctor-record");
const DoctorKeyDetail=require("../schema/doctor-keyDetails")

const router = express.Router();
// post

//all the user data for creating account
router.post("/user", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new userRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

//all the doctor data for creating account
router.post("/doctor", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new doctorRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

//key details of doctor (fees and specicality)
router.post("/doctor-key-details", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new DoctorKeyDetail(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});
///fetch
//fetching individual doctor data 
router.get("/doctor/:userId",async (req,res)=>{
    try{
        const userId=req.params.userId;
        const records=await doctorRecord.find({userId:userId});
        if(records.length===0){
             res.status(404).send("No Records found for the user");
           
        }
        res.status(200).send(records);

    }
    catch(err){
        res.status(500).send(err);
    }
});
//fetching individual user data
router.get("/user/:userId",async (req,res)=>{
    try{
        const userId=req.params.userId;
        const records=await userRecord.find({userId:userId});
        if(records.length===0){
             res.status(404).send("No Records found for the user");
           
        }
        res.status(200).send(records);

    }
    catch(err){
        res.status(500).send(err);
    }
});


//fetch all doctor record
router.get("/getAll/doctor", async (req, res) => {
    try {
        
        const records = await doctorRecord.find();
        

        if (records.length === 0) {
           res.status(404).send("No Records found");
        }

        res.status(200).json(records);
    } catch (err) {
       
        res.status(500).json(err);
    }
});

//fetcging key details of doctor(fees and speciality)
router.get("/doctor-key-details/:userId", async (req, res) => {
    try {
        const userId=req.params.userId;
     
        const records=await DoctorKeyDetail.find({userId:userId});
       
        res.status(200).json(records);

    }
    catch(err){
        res.status(500).json(err.message);
}});

//all key details
router.get("/get/doctor-key-details", async (req, res) => {
    try {
     
        const records = await DoctorKeyDetail.find();
       
       
        res.status(200).json(records);

    }
    catch(err){
        res.status(500).json(err.message);
}});
//update using  put

//updating doctor data in profile
router.put("/doctor-update/:userId", async (req, res) => {
    try{
        const id=req.params.userId;
        const newRecordBody=req.body;

       const record=await doctorRecord.findByIdAndUpdate(
        id,
        newRecordBody);
        if(!record) {
            res.status(404).send();
        } 
        

        res.status(200).send(record);

    }
    catch(err){
        res.status(500).send(err);
    }})

    //updating user data in profile
    router.put("/user-update/:userId", async (req, res) => {
        try{
            const id=req.params.userId;
            const newRecordBody=req.body;
    
           const record=await userRecord.findByIdAndUpdate(
            id,
            newRecordBody);
            if(!record)  res.status(404).send();
            
    
            res.status(200).send(record);
    
        }
        catch(err){
            res.status(500).send(err);
        }});

module.exports = router;