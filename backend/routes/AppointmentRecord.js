const express = require("express");
const router = express.Router();
const AppointmentRecord=require("../schema/appointment-record");
const EndSessionRecord=require("../schema/close-appointment");
//post

//for saving appointment data (user send it)
router.post("/send/appointment-record", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new AppointmentRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

//user

router.get("/fetch/appointment-record/user/:userId", async (req, res) => {
    try{
            const userId=req.params.userId;
            const records=await AppointmentRecord.find({appoint_creater_id:userId});
            if(records.length===0){
                 res.status(404).send("No Records found for the user");
               
            }
            res.status(200).json(records);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});
//doctor
router.get("/fetch/appointment-record/doctor/:userId", async (req, res) => {
    try{
            const userId=req.params.userId;
            const records=await AppointmentRecord.find({docId:userId});
            if(records.length===0){
                 res.status(404).send("No Records found for the user");
               
            }
            res.status(200).json(records);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});

/***----------------------------closed appointment  */

//for closing session by sending data to end session 
router.post("/send/End-session-record", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new EndSessionRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

//deleting data from appointment record
router.delete("/delete/appointment-record/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const record=await AppointmentRecord.findByIdAndDelete(id);

       if(!record) res.status(404).send();
       res.status(200).send(record);
        

        res.status(200).send(record);
    }
    catch(err){
        res.status(500).send(err);
    }
});

//fetching end session date for the doctor
router.get("/fetch/End-session-record/doctor/:userId", async (req, res) => {
    try{
            const userId=req.params.userId;
            const records=await EndSessionRecord.find({docId:userId});
           
            res.status(200).json(records);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});
//fetching end session data for the user
router.get("/fetch/End-session-record/user/:userId", async (req, res) => {
    try{
            const userId=req.params.userId;
            const records=await EndSessionRecord.find({appoint_creater_id:userId});
          
            res.status(200).json(records);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});
module.exports = router;

