const mongoose = require("mongoose")
const multer = require("multer")
const dataUri = require("datauri")
const uuid = require("uuid")
const cloudinary = require("cloudinary").v2
const Food = mongoose.model("Food")

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/")
    console.log(isPhoto)
    console.log(file)
    if (isPhoto) {
      next(null, true)
    } else {
      next({ message: "That filetype isn't allowed!" }, false)
    }
  }
}

exports.upload = multer(multerOptions).single("image")

exports.sendToCloudinary = async (req, res, next) => {
  if (!req.file) {
    next()
    return
  }

  const extension = req.file.mimetype.split("/")[1]
  const dr = new dataUri()
  const formattedImageFile = dr.format(extension, req.file.buffer)
  try {
    const data = await cloudinary.uploader.upload(formattedImageFile.content, {
      public_id: `test/${uuid.v4()}`,
      tags: `test`,
      width: 800,
      crop: "scale"
    })

    req.body.image = data.secure_url
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  next()
}

exports.get = async (req, res) => {
  console.log(req.params.id)
  const specificFood = await Food.findById(req.params.id)

  res.json(specificFood)
}
exports.getAll = async (req, res) => {
  const allFood = await Food.find({})

  res.json(allFood)
}

exports.add = async (req, res) => {
  const newFood = await Food.create(req.body)

  res.json(newFood)
}

exports.edit = async (req, res) => {
  const updated = await Food.findByIdAndUpdate(req.params.id, req.body)

  res.json(updated)
}

exports.delete = async (req, res) => {
  const deleted = await Food.findByIdAndDelete(req.body.id)

  try {
    if (deleted) {
      res.send(true)
    }
  } catch (error) {
    console.log(error)
  }
}
