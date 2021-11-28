const mongoose = require("mongoose");

const mastercatShema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mastercategories", mastercatShema);
