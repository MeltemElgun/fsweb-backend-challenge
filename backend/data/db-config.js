const knex = require("knex");
const knexConfig = require("../knexfile.js");
const { NODE_ENV } = require("../secret/secretToken.js");

module.exports = knex(knexConfig[NODE_ENV]);