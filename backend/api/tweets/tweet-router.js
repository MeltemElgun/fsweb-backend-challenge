const router = require("express").Router();
const tweetModel = require("./tweet-model");
const mw = require("./tweet-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTweets = await tweetModel.getAllTweet();
    res.status(200).json(allTweets);
  } catch (error) {
    next(error);
  }
});
router.get("/:tweetId", mw.checkTweetId, async (req, res, next) => {
  try {
    const getTweetId = await tweetModel.getTweetById(req.params.tweetId);
    res.status(200).json(getTweetId);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTweets = await tweetModel.createTweet(req.body);
    res.status(201).json(newTweets);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:tweetId",
  mw.checkTweetId,
  mw.validatePayload,
  async (req, res, next) => {
    try {
      const updateTweet = await tweetModel.updateTweet(
        req.params.tweetId,
        req.body
      );
      res.json(updateTweet);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:tweetId", mw.checkTweetId, async (req, res, next) => {
  try {
    await tweetModel.removeTweet(req.params.tweetId);
    res.json({ message: `${req.params.tweetId} id'li tweet silindi` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
