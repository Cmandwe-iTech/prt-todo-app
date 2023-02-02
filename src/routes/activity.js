const express = require("express");
const ActiveModel = require("../model/activity");
const active_router = express.Router();

active_router.post("/todo", async(req,res)=>{
    try {
        const activities = await ActiveModel.create({
            activity:req.body.activity,
            status:req.body.status,
            user:req.user
        })
        res.status(200).json({
            status:"success",
            activities
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})
active_router.get("/todo", async(req,res)=>{
    try{
        const activities = await ActiveModel.find({user:req.user});
        if(activities.length){
            res.status(200).json({
                status:"success",
                activities
            })
        }else{
            res.status(404).json({
                status:"failed",
                message:"page not found"
            })
        }
    }catch(e){
        res.json({
            message:e.message
        })
    }
})
module.exports = active_router