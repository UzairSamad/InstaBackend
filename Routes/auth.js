const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('hello in auth')
})

module.exports = router