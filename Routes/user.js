const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const loginmiddleware = require('../middelwares/loginmiddleware')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id',(req,res)=>{
    User.find({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>res.status(404).json({error:"User not found"}))
})
module.exports = router