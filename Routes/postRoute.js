const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const loginmiddleware = require('../middelwares/loginmiddleware')
const Post = mongoose.model("Post")


// get all posts route
router.get('/all-posts', (req, res) => {
    Post.find().populate("postedBy","_id name")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

// create post route
router.post('/create-post', loginmiddleware, (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(422).json({ error: "PLease add all the fields" })
    }
    // console.log(req.user)
    // res.send('ok')

    // making password undefined just to not store it with post while adding refrence to post
    req.body.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router