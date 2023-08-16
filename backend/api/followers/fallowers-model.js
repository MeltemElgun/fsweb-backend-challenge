const db = require("../../data/db-config");

const follow = async (followerId, followingId) => {
  return await db("followers").insert({
    follower: followerId,
    following: followingId,
  });
};

const unfollow = async (followerId, followingId) => {
  return await db("followers")
    .where({
      follower: followerId,
      following: followingId,
    })
    .del();
};
//takipeden
const getfollower = async (follower) => {
  return await db("followers as f")
    .where("followerId", follower)
    .join("users as u", "f.followerId", "u.userId")
    .select("users.*");
};

//takipedilen
const getfollowing = async (following) => {
  return await db("followers as f")
    .where("followingId", following)
    .join("users", "f.followingId", "u.userId")
    .select("users.*");
};
module.exports = {
  follow,
  unfollow,
  getfollower,
  getfollowing,
};
