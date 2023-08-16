const router = require("express").Router();
const followModel = require("./fallowers-model");

router.get("/:id/following", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/:id/follower", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/:id/follow", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unfollow", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
