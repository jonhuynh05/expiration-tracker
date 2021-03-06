const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema ({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    trackers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tracker"
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User