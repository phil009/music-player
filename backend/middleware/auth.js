const jwt = require("jsonwebtoken");

//Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    console.log("Decoded user:", user);
    req.user = user;
    next();
  });
};

//Middleware to check isAdmin
const isAdmin = (req, res, next) => {
  console.log("User in isAdmin middleware:", req.user);
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Admin privilages are required" });
  next();
};

module.exports = { verifyToken, isAdmin };
