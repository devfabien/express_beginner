const express = require("express");
const client = require("../../databasepg");
const route = express.Router();

client.connect();

route.get("/", (req, res) => {
  client.query(`SELECT * FROM blog`, (err, result) => {
    if (!err) {
      res.json(result.rows);
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

module.exports = route;
