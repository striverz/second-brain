const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Invalid Token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = { authUser };
