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
      name: "meltem",
      username: "meltemElgun",
      email: "meltem@gmail.com",
      passhash: "$2a$08$rwP4o8GubsVx9APa7/2DUOPUbG9so7S96BBRT1hrWE5ShaQC4t5ka", //12aa*
      profilePicture: "ben.jpg",
      headerPicture: "ben.jpg",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lbHRlbUVsZ3VuIiwicm9sZW5hbWUiOiJhZG1pbiIsImlhdCI6MTY4NzQyMjc0NCwiZXhwIjoxNjg3NTA5MTQ0fQ.fVovKkuh-Orj4JDLbFY6udZ6d3PT5IRy1paOqj25Xh8",
      roleId: 1,
    },
    {
      name: "serhat",
      username: "serhat",
      email: "serhat@gmail.com",
      passhash: "$2a$08$QebK3M7qXcWMtGU0f3nngejBJduFKSvjOPvf2qJ6ikq0kNwNv3fzC", //12ab*
      profilePicture: "ben.jpg",
      headerPicture: "ben.jpg",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlcmhhdCIsInJvbGVuYW1lIjoidXNlciIsImlhdCI6MTY4NzQyMzI4MCwiZXhwIjoxNjg3NTA5NjgwfQ.1SELZE2qz2zQ8n_oTieZ6Qslgcc9lElxvVRq1MbMMaU",
      roleId: 2,
    },
  ]);

  await knex("tweets").insert([
    { image: "ben.jpg", content: "selammm", userId: 1 },
    { image: "ben.jpg", content: "günaydın", userId: 1 },
    { image: "ben.jpg", content: "naber", userId: 2 },
  ]);

  await knex("comments").insert([
    { text: "harikasın", userId: 1, tweetId: 1 },
    { text: "kendine iyi bak", userId: 1, tweetId: 2 },
  ]);

  await knex("followers").insert([
    { followerId: 1, followingId: 2 },
    { followerId: 1, followingId: 1 },
    { followerId: 2, followingId: 1 }, //takipci takipeden
  ]);
};
