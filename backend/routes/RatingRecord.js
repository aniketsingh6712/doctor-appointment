const express = require("express");
const router = express.Router();
const ReviewRecord=require("../schema/review-record")

//post

router.post("/send/review", async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new ReviewRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get("/fetch/review/", async (req, res) => {
    try{
    
            const records=await ReviewRecord.find({});
          
            res.status(200).json(records);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});
module.exports = router;
