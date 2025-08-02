const jwt = require("jsonwebtoken");

const AuthenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unathorised access" });
  }
  try {
    const decoded = jwt.verify(token, "12345");
    req.user = decoded;
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired token" });
  }
};
module.exports = AuthenticateUser