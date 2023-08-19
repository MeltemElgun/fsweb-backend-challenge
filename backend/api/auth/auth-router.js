const router = require("express").Router();
const mw = require("./auth-middleware");
const userModel = require("../users/user-modele");
const bcryptjs = require("bcryptjs");
const utils = require("../../secret/utils");

router.get("/", mw.isValidToken, async (req, res, next) => {
  try {
    const usermodel = await userModel.getAllUsers();
    res.status(201).json(usermodel);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/register",
  mw.validatePayload,
  mw.usernameExist,
  async (req, res, next) => {
    try {
      let inserted = await userModel.createUser({
        username: req.body.username,
        email: req.body.email,
        passhash: bcryptjs.hashSync(req.body.passhash, 8),
        rolename: req.body.rolename,
      });
      res.status(201).json(inserted);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  mw.usernameCheck,
  mw.passwordCheck,
  async (req, res, next) => {
    try {
      const payload = {
        username: req.body.username,
        passhash: req.body.passhash,
      };
      const token = utils.createUserToken(payload, "1d");
      res.json({
        message: `welcome ${payload.username}`,
        token: token,
        username: payload.username,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/reset_password", (req, res) => {
  res.status(200).json({ message: "reset password çalışıyor" });
});

module.exports = router;
