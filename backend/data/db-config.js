require("dotenv").config();
//aşağıdaki satırı alttaki şekilde deüğiştirirsen render hata vermiyor
//const knex = require('knex')('development')
// const knex = require('knex')(process.env.NODE_ENV)
// const knexConfig = require('../knexfile.js');
// const NODE_ENV=process.env.NODE_ENV || 'development';
// const environment = NODE_ENV || 'development';

// module.exports = knex(knexConfig[environment]);

const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
module.exports = db;
