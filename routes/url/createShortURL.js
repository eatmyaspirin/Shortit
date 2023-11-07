const express = require('express');
const db = require('../../utils/database');
const md5 = require('md5')
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
router.post('/', urlEncodedParser, (req, res) => {
  let shortUri = md5(req.body.url + req.decodedToken.userId).substring(0,7);
  let query = "INSERT INTO url (urlId, url, shorturl, userId) VALUES (?,?,?,?)"
  db.run(query, [shortUri, req.body.url, shortUri, req.decodedToken.userId], (err) => {
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