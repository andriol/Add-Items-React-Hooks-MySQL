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

router.route("/:id").get((req, res) => {
  knex
    .select("*")
    .from("items")
    .where("id", req.params.id)
    .then((data) => {
      res.json(data[0]);
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
router.route("/:id").delete((req, res) => {
  knex
    .select()
    .where("id", req.params.id)
    .from("items")
    .del()
    .then(function () {
      res
        .status(200)
        .json({ message: `item with id ${req.params.id} deleted` });
    })
    .catch(() => {
      res.status(400).json({ message: "can't delete item" });
    });
});
module.exports = router;
