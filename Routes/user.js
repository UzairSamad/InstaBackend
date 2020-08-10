const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const loginmiddleware = require('../middelwares/loginmiddleware')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id', (req, res) => {
    User.find({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => res.status(404).json({ error: "User not found" }))
})

// follow routes for user
router.put('/follow', loginmiddleware, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, (err, reslt) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).select("-password").then(result => res.json(result)).catch(err => res.status(422).json({ error: err }))
    }
    )
})

// unfollow user route
router.put('/unfollow', loginmiddleware, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, reslt) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).select("-password").then(result => res.json(result)).catch(err => res.status(422).json({ error: err }))
    }
    )
})

module.exports = router