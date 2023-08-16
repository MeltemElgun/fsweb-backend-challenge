const tweetModels = require("./tweet-model");

const checkTweetId = async (req, res, next) => {
  try {
    const isExistValid = await tweetModels.getTweetById(req.params.tweetId);
    if (!isExistValid) {
      res
        .status(404)
        .json({ message: `ID No: ${req.params.tweetId} tweet not found` });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

const validatePayload = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: `${content} property is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { checkTweetId, validatePayload };
