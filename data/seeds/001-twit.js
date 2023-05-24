/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("roles").truncate();
  await knex("users").truncate();
  await knex("tweets").truncate();
  await knex("comments").truncate();
  await knex("followers").truncate();

  await knex("roles").insert([{ rolename: "admin" }, { rolename: "user" }]);
  await knex("users").insert([
    {
      username: "meltem",
      email: "meltem@gmail.com",
      passhash: "$2a$08$rwP4o8GubsVx9APa7/2DUOPUbG9so7S96BBRT1hrWE5ShaQC4t5ka", //12aa*
      roleId: 1,
    },
    {
      username: "serhat",
      email: "serhat@gmail.com",
      passhash: "$2a$08$QebK3M7qXcWMtGU0f3nngejBJduFKSvjOPvf2qJ6ikq0kNwNv3fzC", //12ab*
      roleId: 2,
    },
    {
      username: "buse",
      email: "buse@gmail.com",
      passhash: "$2a$08$BduRnviv3vZhE6hRcb307eMf8Z4rH2l0XF9AAhifgwxgkIMxSZdzK", //12ac*
      roleId: 2,
    },
    {
      username: "taylan",
      email: "taylan@gmail.com",
      passhash: "$2a$08$dbohNGyJjs0zj6dXWHr5COFR/N6rq1yseFLoa.Ra8UW9woPkHwClO", //12ad*
      roleId: 2,
    },
  ]);

  await knex("tweets").insert([
    { content: "selammm", userId: 1 },
    { content: "günaydın", userId: 1 },
    { content: "naber", userId: 2 },
    { content: "hello", userId: 3 },
    { content: "hallo", userId: 3 },
  ]);

  await knex("comments").insert([
    { text: "harikasın", userId: 1, tweetId: 1 },
    { text: "kendine iyi bak", userId: 1, tweetId: 2 },
    { text: "gönderini beğendim", userId: 2, tweetId: 2 },
    { text: "sana katılıyorum", userId: 3, tweetId: 2 },
  ]);

  await knex("followers").insert([
    { followerId: 1, followingId: 2 },
    { followerId: 1, followingId: 3 },
    { followerId: 2, followingId: 3 }, //takipci takipeden
  ]);
};
