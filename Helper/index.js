const jwt = require("jsonwebtoken");
const { JWT } = process.env.JWT;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res
      .status(404)
      .send({ data: "A token is required for authentication", status: 404 });
  try {
    const decoded = jwt.verify(token, JWT);
    req.user = decoded;
  } catch (err) {
    return res.status(404).send({ data: "Invalid Token", status: 404 });
  }
  return next();
};

module.exports = verifyToken;
