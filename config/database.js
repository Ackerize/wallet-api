const mysql = require("mysql")

// Create a connection to the database
const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

module.exports = connection;