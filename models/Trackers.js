const mongoose = require("mongoose")
const Schema = mongoose.Schema
const trackerSchema = new Schema ({
    item: String,
    expiration: Date
})

const Tracker = mongoose.model("Tracker", trackerSchema)
module.exports = Tracker