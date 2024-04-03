const db = require("../../data/db-config");

const getAllTweet = async () => {
  return await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select(
      "t.tweetId",
      "u.userId",
      "u.name",
      "u.username",
      "t.userId",
      "t.content",
      "t.createdAt",
      "u.profilePicture",
      "u.headerPicture",
      "t.image"
    )
    .orderBy("t.createdAt", "DESC");
};
const getTweetById = async (id) => {
  return await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select(
      "t.tweetId",
      "u.userId",
      "u.name",
      "u.username",
      "t.userId",
      "t.content",
      "t.createdAt",
      "u.profilePicture",
      "u.headerPicture",
      "t.image"
    )
    .where("t.tweetId", id)
    .first();
};
const getTweetByUsername = async (name) => {
  let nameExist = await db("tweets as t")
    .leftJoin("users as u", "t.userId", "u.userId")
    .select(
      "t.tweetId",
      "u.userId",
      "u.name",
      "u.username",
      "t.userId",
      "t.content",
      "t.createdAt",
      "u.profilePicture",
      "u.headerPicture",
      "t.image"
    )
    .where("u.username", name);

  return nameExist;
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
  return getTweetById(creatTweetId);
};

const updateTweet = async (tweetId, tweet) => {
  const updateTweet = await db("tweets")
    .where("tweetId", tweetId)
    .update(tweet);
  return getTweetById(updateTweet);
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
  getTweetByUsername,
};
