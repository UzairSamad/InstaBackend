const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
// const MONGODBURI = require('./keys')

mongoose.connect("mongodb+srv://uzair:PWK6z6lbsofmWdnU@cluster0.mg7j7.mongodb.net/<dbname>?retryWrites=true&w=majority")
mongoose.connection.on('connected',()=>{
    console.log('connected to MOngo DB')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting',err )
})
   


app.get('/',(req,res)=>{
    res.send("hello world")

})

app.listen(PORT,()=>{
    console.log('Server is runing on Port :',PORT)
})