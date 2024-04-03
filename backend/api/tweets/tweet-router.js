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

router.get("/:identifier", async (req, res, next) => {
  const identifier = req.params.identifier;
  try {
    // Check if the identifier is a valid tweet ID
    const tweetId = parseInt(identifier);
    if (!isNaN(tweetId)) {
      const getTweetId = await tweetModel.getTweetById(tweetId);
      res.status(200).json(getTweetId);
    } else {
      // If it's not a tweet ID, treat it as a username
      const getUserName = await tweetModel.getTweetByUsername(identifier);
      res.status(200).json(getUserName);
    }
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
