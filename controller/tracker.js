const express = require("express")
const router = express.Router()
const Tracker = require("../models/Trackers")
const User = require("../models/Users")

router.get("/:userId", async (req, res) => {
    try{
        console.log("this hits")
    }
    catch(err){
        console.log(err)
    }
})

router.post("/:userId/new", async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.userId)
        const newItem = {item: req.body.addItem, expiration: req.body.addDate}
        console.log(foundUser)
        if(foundUser){
            Tracker.create(newItem, (err, createdTracker) => {
                if(err){
                    res.send(err)
                }
                else{
                    foundUser.trackers.push(createdTracker)
                    foundUser.save((err, data) => {
                        res.json("Success.")
                    })
                }
            })
        }
        else{
            res.json("Please log into your account.")
        }
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/:userId/delete", async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.userId)
        const foundTracker = await Tracker.findById(req.body._id)
        foundUser.trackers.remove(foundTracker._id)
        await foundUser.save()
        const deleteTracker = await Tracker.findByIdAndDelete(req.body._id)
        res.json("Removed.")
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router