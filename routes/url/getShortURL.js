const express = require("express");
const db = require("../../utils/database");
const router = express.Router();
router.get("/:shortUri", (req, res) => {
  console.log(req.ip, 'logged')
  let params = [req.params.shortUri];
  let query = "SELECT * FROM url WHERE shortUrl = ?";
  db.get(query, params, (err, row) => {
    if (err || !row) {
      res.status(400).json({ error: err ? err.message : "Invalid Url" });
      return;
    } else {
      if (row.userId != "0000nouser") {
        console.log('see twice')
        db.run(
          "INSERT INTO stats (urlId, userId, region) VALUES (?, ?, ?)",
          [row.urlId, row.userId, req.headers.origin],
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      if (row.isUrl != 0) {
        res.status(302).redirect("https://" + row.url);
        console.log(req.originalUrl, 'after redirect');
      } else {
        res.status(200).json({
          shortUri: row.shortUri,
          pasteData: row.pasteData,
        });
      }
    }
  });
});


const visited = () => {
  console.log('visited');
}


module.exports = router;
