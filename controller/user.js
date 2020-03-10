const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const bcrypt = require("bcryptjs")

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