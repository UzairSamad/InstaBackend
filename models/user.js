const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        typr:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})

mongoose.model('user',userSchema)