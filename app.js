const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const routes = require("./routes")

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", routes)

module.exports = app
