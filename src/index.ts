// const express = require("express");
import express from "express";
const router = express.Router();


/* GET home page. */
router.get("/", function (req: express.Request, res: express.Response) {
  res.render("index", { title: "Express" });
});

module.exports = router;
