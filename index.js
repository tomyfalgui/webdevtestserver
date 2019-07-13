require("dotenv").config()

const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")

require("./models/Food")
require("./models/Category")
const app = require("./app")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${
      process.env.MONGO_PASSWORD
    }@${process.env.MONGO_AT_LINK}`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 8000, function() {
      console.log(`Listening on PORT ${process.env.PORT || 8000}`)
    })
  })
  .catch(() => {
    console.log("cant connect to database")
  })
