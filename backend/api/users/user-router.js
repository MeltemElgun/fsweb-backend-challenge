const router = require("express").Router();
const UserModel = require("./user-modele");
const mw = require("./user-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await UserModel.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});
router.get("/:username", async (req, res, next) => {
  try {
    const getUserName = await UserModel.getUserByUsername(req.params.username);
    res.status(200).json(getUserName);
  } catch (error) {
    next(error);
  }
});
router.get("/:userId", mw.userIdCheck, async (req, res, next) => {
  try {
    const getId = await UserModel.getUserById(req.params.userId);
    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.userIdCheck, async (req, res, next) => {
  try {
    const updateUser = await UserModel.updateUser(req.params.id, req.body);
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", mw.userIdCheck, async (req, res, next) => {
  try {
    const deleteUser = await UserModel.deleteUser(req.params.id);
    res.json({ message: "kullanıcı silindi" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
