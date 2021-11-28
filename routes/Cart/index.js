const Router = require("express").Router();
const {
  addToCart,
  userCart,
  releaseCart,
} = require("../../controllers/CartController/cartController");
const Auth = require("../../Helper/index");

Router.get("/add", Auth, addToCart);
Router.get("/get", Auth, userCart);
Router.get("/release", Auth, releaseCart);

module.exports = Router;
