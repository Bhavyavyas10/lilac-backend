const Product = require("../../models/product");

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find({
      originalproductprice: { $gt: 0 },
    }).populate({
      path: "productcategory",
      populate: { path: "parentCategory" },
    });
    return res.status(200).send({ data: products, status: 200 });
  } catch (e) {
    res.status(501).send({ data: "something went wrong", status: 501 });
  }
};
