const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandname: {
    type: String,
  },
  logo: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mastercategories",
  },
});

module.exports = mongoose.model("brands", brandSchema);
