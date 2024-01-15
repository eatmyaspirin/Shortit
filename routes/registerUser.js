const express = require("express");
const db = require("../utils/database");
const md5 = require("md5");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
  let { username, password } = req.body;
  let userId = md5(username).substring(0, 10);
  if (password.length < 8)
    res.json({ message: "Password should be more than 8 characters" });
  bcrypt.hash(password, 10, (err, hash) => {
    try {
      let query = `INSERT INTO user (userId, username, password) VALUES (?,?,?)`;
      db.run(query, [userId, username, hash], (err) => {
        if (err) {
          console.error("Transaction Error: ", err);
          if (err.errno == 19) {
            res.json({
              message: err.message,
              reason: "Username already exists",
            });
          }
        } else {
          const token = jwt.sign({ username, userId , isAdmin: false}, process.env.JWTSECRET, {
            expiresIn: process.env.MAXAGE,
          });
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: process.env.MAXAGE * 1000,
            sameSite: "strict",
            secure: true,
          });
          res.json({
            message: "User registered successfully",
            userId,
            username,
          });
        }
      });
    } catch (err) {
      console.log("Error: ", err);
      res.json({
        message: "Error",
        reason: err,
      });
    }
  });
});

module.exports = router;
