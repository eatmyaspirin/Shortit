const express = require('express');
const db = require('../../utils/database');
const md5 = require('md5')
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
router.post('/', urlEncodedParser, (req, res) => {
  let url = req.body.url.match(/((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)/)[4];
  let urlId = require('crypto').randomBytes(16).toString('hex').substring(0,9);
  let shortUri = '';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while(shortUri.length < 10) {
    shortUri += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  let query = "INSERT INTO url (urlId, url, shorturl, userId) VALUES (?,?,?,?)"
  db.run(query, [urlId, url, shortUri, req.decodedToken.userId], (err) => {
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