const router = require("express").Router();
const mw = require("./comment-middleware");
const commetsModel = require("./comment-model");

router.get("/", async (req, res, next) => {
  try {
    const allCommets = await commetsModel.getAllComment();
    res.status(200).json(allCommets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCommetId, async (req, res, next) => {
  try {
    const getId = await commetsModel.getCommentById(req.params.id);
    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validatePayload, async (req, res, next) => {
  try {
    const newCommets = await commetsModel.createComment(req.body);
    res.status(201).json(newCommets);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.checkCommetId,
  mw.validatePayload,
  async (req, res, next) => {
    try {
      const updatedCommet = await commetsModel.updateComment(
        req.params.id,
        req.body
      );
      res.json(updatedCommet);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.checkCommetId, async (req, res, next) => {
  try {
    await commetsModel.removeComment(req.params.id);
    res.json({ message: `${req.params.commentId} id'li comment silindi` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
