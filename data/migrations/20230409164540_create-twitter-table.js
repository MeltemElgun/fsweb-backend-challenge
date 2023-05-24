/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("roleId");
      tbl.string("rolename", 128).notNullable();
    })
    .createTable("users", (users) => {
      users.increments("userId");
      users.string("username", 255).notNullable().unique();
      users.string("email", 255).notNullable();
      users.string("passhash", 40).notNullable();
      users.timestamp("createdAt").defaultTo(knex.fn.now());
      users
        .integer("roleId")
        .defaultTo(2)
        .notNullable()
        .unsigned()
        .references("roleId")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("tweets", (tweet) => {
      tweet.increments("tweetId");
      tweet.string("content", 140).notNullable();
      tweet.timestamp("createdAt").defaultTo(knex.fn.now());
      tweet
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("comments", (t) => {
      t.increments("commentId");
      t.string("text", 280).notNullable();
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.integer("userId")
        .unsigned()
        .references("userId")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      t.integer("tweetId")
        .unsigned()
        .references("tweetId")
        .inTable("tweets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("followers", (follow) => {
      follow
        .integer("followerId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      follow
        .integer("followingId")
        .notNullable()
        .unsigned()
        .references("userId")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      follow.primary(["followerId", "followingId"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("followers")
    .dropTableIfExists("comments")
    .dropTableIfExists("tweets")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
