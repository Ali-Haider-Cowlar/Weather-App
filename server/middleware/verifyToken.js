const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }


  const token = cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
