const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
    try{
        console.log(req.body, "the reqbody")
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router