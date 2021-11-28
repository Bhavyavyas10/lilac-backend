const Router = require("express").Router();
const {
  allProducts,
} = require("../../controllers/ProductController/productController");

Router.get("/products", allProducts);

module.exports = Router;
