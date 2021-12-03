const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
const cors = require("cors");
const chalk = require("chalk");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

const UserRoutes = require("./routes/Users/index");
const ProductRoute = require("./routes/Products/index");
const CartRoute = require("./routes/Cart/index");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ data: "Successfully Handshake" });
});

app.use("/api/v1", UserRoutes);
app.use("/api/v1", ProductRoute);
app.use("/api/v1", CartRoute);

const handshake = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`serving on ${PORT}`));
      console.log(chalk.yellow("Mongo Connected !"));
    });
  } catch (e) {
    console.log(chalk.red(`error ${e}`));
  }
};

handshake();
