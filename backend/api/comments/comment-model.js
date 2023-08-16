const db = require("../../data/db-config");

const getAllComment = async () => {
  return await db("comments as c")
    .leftJoin("users as u", "c.userId", "u.userId")
    .leftJoin("tweets as t", "t.tweetId", "c.tweetId")
    .select(
      "u.userId",
      "u.username",
      "t.content",
      "t.tweetId",
      "c.commentId",
      "c.text",
      "c.createdAt"
    )
    .orderBy("c.createdAt", "DESC");
};
const getCommentById = async (id) => {
  return await db("comments as c")
    .leftJoin("users as u", "c.userId", "u.userId")
    .leftJoin("tweets as t", "t.tweetId", "c.tweetId")
    .select(
      "u.userId",
      "u.username",
      "t.tweetId",
      "c.commentId",
      "c.text",
      "c.createdAt"
    )
    .where("c.commentId", id)
    .first();
};
const filterByComment = async (filter) => {
  return await db("comments as c")
    .leftJoin("users as u", "c.userId", "u.userId")
    .select("u.userId", "u.username", "c.commentId", "c.text", "c.createdAt")
    .where(filter)
    .first();
};
const createComment = async (comment) => {
  const [creatTCommentId] = await db("comments").insert(comment);
  return await getCommentById(creatTCommentId);
};

const updateComment = async (commentId, comment) => {
  const updateComment = await db("comments")
    .where({ commentId })
    .update(comment);
  return getCommentById(updateComment);
};
const removeComment = async (id) => {
  return await db("comments").where("comments", id).del();
};
module.exports = {
  getAllComment,
  getCommentById,
  filterByComment,
  createComment,
  updateComment,
  removeComment,
};
