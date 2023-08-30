const express = require('express');
const db = require('../utils/database');
const router = express.Router();

router.get('/:shortUri', (req, res) => {
    let params = [req.params.shortUri];
    let query = "SELECT * FROM url WHERE shorturl = ?"
    db.get(query, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(301).redirect("https://" + row.url);
      })
})

module.exports=router;