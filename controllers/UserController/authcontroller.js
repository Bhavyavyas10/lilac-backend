const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT } = process.env;
const admin = require("firebase-admin");
const cron = require("node-cron");

const tokens = [];

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(404).send({ data: "Fields are required", status: 404 });
    } else {
      const check = await User.find({ email: email });
      if (check.length)
        return res
          .status(404)
          .send({ data: "user already exist", status: 404 });
      const encryptedPassword = await bcrypt.hash(password, 10);
      req.body.password = encryptedPassword;
      const user = new User(req.body);
      const new_user = await user.save((err, user) => {
        if (err) return res.json({ data: "something went wrong", status: 404 });
        const token = jwt.sign({ user_id: user._id, email }, JWT, {
          expiresIn: "1d",
        });
        res
          .status(201)
          .send({ data: "user registered", status: 201, token: token });
      });
    }
  } catch (e) {
    return res.status(501).send({ data: "error", status: 501 });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res
        .status(404)
        .send({ data: "All input is required", status: 404 });
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, JWT, {
        expiresIn: "2h",
      });
      res.status(200).send({
        data: "login success",
        status: 200,
        token: token,
        user: user._id,
      });
    } else {
      res.status(404).send({ data: "Invalid Credentials", status: 404 });
    }
  } catch (e) {
    res.status(501).send({ data: "error", status: 501 });
  }
};

exports.registerToken = async (req, res) => {
  console.log(req.body.token);
  tokens.push(req.body.token);
  res.status(200).json({ data: "Successfully registered FCM Token!" });
};

exports.sendNotification = async (req, res) => {
  try {
    // const { title, body, imageUrl } = req.body;
    cron.schedule("*/1 * * * *", () => {
      await admin.messaging().sendMulticast({
        tokens,
        notification: {
          title: "Notification",
          body: "Cron Notification",
        },
      });
      res.status(200).json({ data: "Successfully sent notifications!" });
    });
  } catch (e) {
    console.log(e);
    res.status(501).send({ data: "error", status: 501 });
  }
};
