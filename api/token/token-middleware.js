const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secret/secretToken");

const restricted = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ message: "Token not provided." });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decodeToken) => {
        if (err) {
          res.status(401).json({ message: "Token is not valid." });
        } else {
          req.decodedToken = decodeToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
const onlyRoleNameContains = (role_name) => (req, res, next) => {
  try {
    let isAdmin = req.decodedToken.rolename === role_name;
    if (isAdmin) {
      next();
    } else {
      res.status(401).json({ message: `Sadece ${role_name} erişebilir.` });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  restricted,
  onlyRoleNameContains,
};
