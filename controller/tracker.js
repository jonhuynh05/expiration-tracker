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


module.exports = router