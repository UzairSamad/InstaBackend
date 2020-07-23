const jwt = require('jsonwebtoken')
const JWT_SCERET = "efsgedtttvasolvb"
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: 'Invalid Token' })
    }
    // const token = authorization.replace("Bearer", "")
    // console.log(authorization)

    jwt.verify(token, JWT_SCERET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()

        })
    })
}