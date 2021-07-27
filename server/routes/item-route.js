const express = require("express");
const knex = require("knex")(require("../knexfile")["development"]);
const router = express.Router();

router.route("/").get((req, res) => {
  knex
    .select("*")
    .from("items")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send("error getting items data"));
});
router.route("/").post((req, res) => {
  knex

    .insert({ item: req.body.item })
    .into("items")
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(400).json({ message: "Error can't create item" });
    });
});
module.exports = router;
