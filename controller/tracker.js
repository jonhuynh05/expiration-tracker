const express = require("express")
const router = express.Router()
const Tracker = require("../models/Trackers")

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
        console.log("hits new item")
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router