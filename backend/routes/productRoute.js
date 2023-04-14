const express = require("express");
const {getAllProduct , createProduct, updateProduct, deleteProduct, getProductDetail, getAllProductAdmin, createReview, getAllProductReviewByAdmin, deleteProductReviewByAdmin}  = require("../database/productDB");
const { isAuthenticatedUser,isAdmin } = require("../database/usersDB");
// const isAuthenticatedUser = require("../middleware/authentication");
// const   = require("../database/productDB");
const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/admin/products/addProduct").post(isAuthenticatedUser,isAdmin("admin"),createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,isAdmin("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser,isAdmin("admin"),deleteProduct);
router.route("/products/:id").get(getProductDetail);
router.route("/admin/products").get(isAuthenticatedUser,isAdmin("admin"),getAllProductAdmin);
router.route("/product/review").put(isAuthenticatedUser,createReview);
router.route("/product/getreviews").put(getAllProductReviewByAdmin);
router.route("/product/getreviews").delete(isAuthenticatedUser,deleteProductReviewByAdmin  );
module.exports = router