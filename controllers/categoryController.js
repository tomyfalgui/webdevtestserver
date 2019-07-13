const mongoose = require("mongoose")
const Category = mongoose.model("Category")

exports.getAll = async (req, res) => {
  const allCategory = await Category.find({}).populate("foods")

  res.json(allCategory)
}

exports.get = async (req, res) => {
  const category = await Category.findById(req.params.id).populate("foods")
  console.log(category)
  res.json(category)
}

exports.add = async (req, res) => {
  const newCategory = await Category.create(req.body)

  res.json(newCategory)
}

exports.addFood = async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $push: { foods: req.body.foodId }
    },
    { new: true }
  )

  res.json(updatedCategory)
}

exports.removeFood = async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { foods: req.body.foodId }
    },
    { new: true }
  )

  res.json(updatedCategory)
}
exports.edit = async (req, res) => {
  const updatedNameCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.newName
    },
    { new: true }
  )

  res.json(updatedNameCategory)
}

exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  res.json(true)
}
