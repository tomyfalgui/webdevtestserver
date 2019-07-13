const { Router } = require("express")
const { categoryController, foodController } = require("../controllers")

const router = Router()

router.get("/food", foodController.getAll)
router.get("/food/:id", foodController.get)
router.post(
  "/food",
  foodController.upload,
  foodController.sendToCloudinary,
  foodController.add
)
router.patch(
  "/food/edit/:id",
  foodController.upload,
  foodController.sendToCloudinary,
  foodController.edit
)
router.delete("/food", foodController.delete)

router.get("/category", categoryController.getAll)
router.get("/category/:id", categoryController.get)
router.post("/category", categoryController.add)
router.patch("/category/add/:id", categoryController.addFood)
router.patch("/category/remove/:id", categoryController.removeFood)
router.patch("/category/edit/:id", categoryController.edit)
router.delete("/category/delete/:id", categoryController.delete)

module.exports = router
