const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const Tracker = require("../models/Trackers")
const bcrypt = require("bcryptjs")


router.post("/login", async (req, res) => {
    try{
        console.log("hit login route")
        const foundUser = await User.findOne({email: req.body.email})
        if (foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.firstName = foundUser.firstName
                req.session.email = foundUser.email
                req.session.userId = foundUser._id
                const userTrackers = await Promise.all(foundUser.trackers.map((tracker) => {
                    let foundTracker = Tracker.findById(tracker)
                    return foundTracker
                }))
                res.json({
                    firstName: req.session.firstName,
                    email: req.session.email,
                    userId: req.session.userId,
                    trackers: userTrackers
                })
            }
            else{
                res.json("Password is incorrect.")
            }
        }
        else{
            res.json("Email not found.")
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post("/register", async (req, res) => {
    try{
        const foundEmail = await User.findOne({email: req.body.email})
        if(foundEmail){
            res.json({message: "Email is already registered."})
        }
        else{
            const userDbEntry = {}
            const password = req.body.password
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            userDbEntry.firstName = req.body.firstName
            userDbEntry.lastName = req.body.lastName
            userDbEntry.email = req.body.email
            userDbEntry.password = hashPassword
            const newUser = await User.create(userDbEntry)
            req.session.userId = newUser._id
            res.json({
                userId: req.session.userId,
                message: "Success."
            })
        }
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router