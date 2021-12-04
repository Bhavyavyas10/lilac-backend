const Router = require("express").Router();
const {
  makePayment,
} = require("../../controllers/StripeController/stripeController");

Router.post("/payment", makePayment);
