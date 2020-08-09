const mongoose = require('mongoose')
const {objectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:objectId,ref:'user'}],
    following:[{type:objectId,ref:'user'}]

    
})

mongoose.model('User',userSchema)