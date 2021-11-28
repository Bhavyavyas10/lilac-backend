const Cart = require("../../models/cart");
const User = require("../../models/user");
const Product = require("../../models/product");

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.query;
    const check_user = await User.find({ _id: user_id });
    const check_product = await Product.find({ _id: product_id });
    if (check_user.length > 0 && check_product.length > 0) {
      const check_cart = await Cart.find({ productuid: product_id });
      if (check_cart.length > 0) {
        const num = check_cart[0].count;
        const updateCart = await Cart.findOneAndUpdate(
          { _id: check_cart[0]._id },
          { count: num + 1 }
        );
        res.status(201).send({ data: "item added successfully", status: 201 });
      } else {
        const cart = new Cart({
          customeruid: user_id,
          productuid: product_id,
          count: 1,
        });
        const new_cart = await cart.save((err, cart) => {
          if (err)
            return res
              .status(404)
              .send({ data: "something went wrong", status: 404 });
          res
            .status(201)
            .send({ data: "item added successfully", status: 201 });
        });
      }
    } else {
      res.status(404).send({ data: "something went wrong", status: 404 });
    }
  } catch (e) {
    res.status(501).send({ data: "something went wrong", status: 501 });
  }
};

exports.userCart = async (req, res) => {
  try {
    const { user_id } = req.query;
    const check_cart = await Cart.find({ customeruid: user_id }).populate({
      path: "productuid",
      populate: { path: "productcategory" },
    });
    if (check_cart.length > 0) {
      res.status(200).send({ data: check_cart, status: 200 });
    } else {
      res.status(404).send({ data: "something went wrong", status: 404 });
    }
  } catch (e) {
    res.status(501).send({ data: "something went wrong", status: 501 });
  }
};

exports.releaseCart = async (req, res) => {
  try {
    const { user_id, cart_id } = req.query;
    const check_cart = await Cart.find({ _id: cart_id, customeruid: user_id });
    const num = check_cart[0].count;

    if (num === 1) {
      const deleteCart = await Cart.findOneAndDelete({ _id: cart_id });
    }
    if (check_cart.length > 0) {
      if (num > 0) {
        const updateCart = await Cart.findOneAndUpdate(
          { _id: check_cart[0]._id },
          { count: num - 1 }
        );
        res.status(201).send({ data: "item added successfully", status: 201 });
      } else {
        res.status(404).send({ data: "something went ", status: 404 });
      }
    } else {
      res.status(404).send({ data: "something went wrong", status: 404 });
    }
  } catch (e) {
    console.log(e);
    res.status(501).send({ data: e, status: 501 });
  }
};
