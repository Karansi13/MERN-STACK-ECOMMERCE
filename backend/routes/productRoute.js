const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productControllers")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router()


router.route("/products").get(getAllProducts)

router.route("/Admin/product/new").post(isAuthenticatedUser,authorizeRoles("Admin"), createProduct)

router.route("/Admin/product/:id").put(isAuthenticatedUser,authorizeRoles("Admin"), updateProduct).delete(isAuthenticatedUser,authorizeRoles("Admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser , createProductReview)

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

module.exports = router