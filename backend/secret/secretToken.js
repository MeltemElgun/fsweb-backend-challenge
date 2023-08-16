require("dotenv").config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "shh",
  PORT: process.env.PORT || 9000,
};
