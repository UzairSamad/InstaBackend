const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginmiddleware = require('../middelwares/loginmiddleware')
const JWT_SCERET = "efsgedtttvasolvb"


router.get('/', (req, res) => {
        res.json({
            name: 'UZair',
            msg: 'hello'
        })
    })
    // router.get('/protected', loginmiddleware, (req, res) => {
    //     res.send('hello in auth')
    // })

router.post('/sign-up', (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please ADD All Fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: 'User already exist' })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = new User({
                        email,
                        password: hashedPassword,
                        name
                    })
                    newUser.save().then(newUser => {
                        res.json({ message: "Created Succesfully" })
                    }).catch(err => {
                        console.log(err)
                    })
                })



        }).catch(err => {
            console.log(err)
        })
})

router.post('/sign-in', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: 'Please Add Email and Password' })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid Email or Password' })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SCERET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                            // res.json({ message: 'Login Succesfully' })
                    } else {
                        return res.status(422).json({ eror: 'Invalid Email or Password' })
                    }
                }).catch(err => {
                    console.log(err)
                })
        })

})

module.exports = router