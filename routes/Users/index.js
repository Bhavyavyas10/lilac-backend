const Router = require("express").Router();
const {
  register,
  login,
  registerToken,
  sendNotification,
} = require("../../controllers/UserController/authcontroller");

Router.post("/register", register);
Router.post("/login", login);
Router.post("/regtoken", registerToken);
Router.post("/notification", sendNotification);

module.exports = Router;
