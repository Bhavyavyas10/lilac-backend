const mongoose = require("mongoose");
const SubCat = require("./subcategory");
const MasterCat = require("./mastercategory");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
  },
  productcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
  },
  productbrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
  },
  productphoto: {
    type: String,
  },
  productdiscription: {
    type: String,
  },
  productstock: {
    type: Number,
  },
  productcolor: {
    type: String,
  },
  productsize: {
    type: String,
  },
  productseller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  originalproductprice: {
    type: Number,
  },
  discountedproductprice: {
    type: Number,
  },
  productuid: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("products", productSchema);
