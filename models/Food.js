const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Food", foodSchema)
