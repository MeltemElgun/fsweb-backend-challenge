const db = require("../../data/db-config");

const getAllTweet = async () => {
  return await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select("t.tweetId", "u.userId", "u.username", "t.content", " t.createdAt")
    .orderBy("t.createdAt", "DESC");
};
const getTweetById = async (id) => {
  return await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select(
      "t.tweetId",
      "u.userId",
      "u.username",
      "t.userId",
      "t.content",
      "t.createdAt"
    )
    .where("t.tweetId", id)
    .first();
};
const filterByTweet = async (filter) => {
  return await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select("t.tweetId", "u.userId", "u.username", "t.content", " t.createdAt")
    .where(filter)
    .first();
};
const createTweet = async (tweet) => {
  const [creatTweetId] = await db("tweets").insert(tweet);
  return await getTweetById(creatTweetId);
};

const updateTweet = async (tweetId, tweet) => {
  const updateTweet = await db("tweets")
    .where("tweetId", tweetId)
    .update(tweet);
  return getTweetById(updateTweet);
  return;
};
const removeTweet = async (id) => {
  return db("tweets").where("tweetId", id).del();
};

module.exports = {
  getAllTweet,
  getTweetById,
  createTweet,
  updateTweet,
  removeTweet,
  filterByTweet,
};
