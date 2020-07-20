const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello in auth')
})

router.post('/sign-up', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please ADD All Fields" })
    }
    res.json({ message: 'Succefully Posted'})
})

module.exports = router