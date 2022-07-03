require('dotenv').config();

const mysql = require('mysql2');
let con  = mysql.createPool({
  connectionLimit : 2,
  host: process.env.HOST,
  user: `root`,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = {
  con,
};
