const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const { authAdmin } = require("../middlewares/auth")
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.post("/",authAdmin, productController.createProduct)
router.put("/", authAdmin,productController.updateProduct)
module.exports = router


