const express = require("express");
const db = require("../../utils/database");
const router = express.Router();

router.get("/:shortUri", (req, res) => {
  let params = [req.params.shortUri];
  let query = "SELECT * FROM url WHERE shortUrl = ?";
  db.get(query, params, (err, row) => {
    if (err || !row) {
      res.status(400).json({ error: err? err.message: "Invalid Url"});
      return;
    } else if (row.isUrl != 0) {
      res.status(301).redirect("https://" + row.url);
    } else {
      res.status(200).json({
        shortUri: row.shortUri,
        pasteData: row.pasteData,
      })
    }
  });
});

module.exports = router;
