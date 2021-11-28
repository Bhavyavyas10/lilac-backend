const Router = require("express").Router();
const {
  register,
  login,
} = require("../../controllers/UserController/authcontroller");

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
