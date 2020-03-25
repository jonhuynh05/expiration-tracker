require('dotenv').config()
const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const session = require("express-session")
const fetch = require("node-fetch")
const userController = require("./controller/user")
const trackerController = require("./controller/tracker")
const PORT = process.env.PORT || 3000
const SID = process.env.SID
const Token = process.env.Token
const twilio = require("twilio")
const client = new twilio(SID, Token)

require("./config/db")

app.use(express.static(path.join(__dirname, "build")))
app.use(session({
    secret: "secret tracker",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride("_method"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/user", userController)
app.use("/tracker", trackerController)


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

// client.verify.services('VAd65a493e423b16d75cd6adf08faaa195')
//     .verifications
//     .create({to: '+17145101992', channel: 'sms'})
//     .then(verification => console.log(verification.sid))

// client.messages.create({
//     body: "hi tiff, please let jon know if this works",
//     to: "+17145101992",
//     from: "+12075693367"
// })
// .then((message) => console.log(message.sid))

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}.`)
})