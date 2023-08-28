const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE,
});

db.connect()
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Failed");
  });

module.exports = db;
