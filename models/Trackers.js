const mongoose = require("mongoose")
const Schema = mongoose.Schema
const trackerSchema = new Schema ({
    item: String,
    expiration: String
})

const Tracker = mongoose.model("Tracker", trackerSchema)
module.exports = Tracker