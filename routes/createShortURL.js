const express = require('express');
const db = require('../utils/database');
const md5 = require('md5')
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlEncodedParser, (req, res) => {
  let shortUri = md5(req.body.url).substring(0,7);
  let query = "INSERT INTO url (url, shorturl) VALUES (?,?)"
  db.run(query, [req.body.url, shortUri], (err) => {
    if(err) {
      console.error('DB Transaction Error');
      res.json({
        "message": "failed",
        "reason": err,
    })
    } else {
      console.log('Added new URL');
      let data = {
        url: req.body.url, 
        shortUri
      }
      res.json({
        "message": "success",
        "data": data,
    })
    }
  })
})

module.exports=router;