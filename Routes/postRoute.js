const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const loginmiddleware = require('../middelwares/loginmiddleware')


router.post('/create-post', loginmiddleware, (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(422).json({ error: "PLease add all the fields" })
    }
    console.log(req.user)
    res.send('ok')
})

module.exports = router