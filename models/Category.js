const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Food" }]
})

module.exports = mongoose.model("Category", categorySchema)
