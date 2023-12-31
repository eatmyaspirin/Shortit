const express = require('express');
const db = require('../../utils/database');
const md5 = require('md5')
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
router.post('/', jsonParser, (req, res) => {
  let url = '';
  let pasteData = '';
  if(req.body.isUrl) {
    url = req.body.url.match(/((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)/)[4];
  } else {
    pasteData = req.body.pasteData;
  }
  let urlId = require('crypto').randomBytes(16).toString('hex').substring(0,9);
  let shortUri = '';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while(shortUri.length < 10) {
    shortUri += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  console.log(urlId, url, shortUri, req.decodedToken.userId, pasteData, req.body.isUrl)
  let query = "INSERT INTO url (urlId, url, shortUrl, userId, pasteData, isUrl) VALUES (?,?,?,?,?,?)"
  db.run(query, [urlId, url, shortUri, req.decodedToken.userId, req.body.pasteData, req.body.isUrl], (err) => {
    if(err) {
      console.error('DB Transaction Error');
      res.json({
        "message": "failed",
        "reason": err,
    })
    } else {
      console.log('Added new URL/Paste');
      res.json({
        "message": "success",
        shortUri
    })
    }
  })
})

module.exports=router;