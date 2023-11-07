const express = require('express');
const db = require('../utils/database');
const router = express.Router();

router.get('/getAllUsers', (req, res) => {
    let query = `SELECT * FROM user`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Transaction Error: ', err);
            res.json({
                message: 'Error',
                reason: err,
            })
        } else {
            res.json({
                message: 'Success',
                data: rows,
            })
        }
    })
});

router.get('/getAllURLs', (req, res) => {
    let query = `SELECT url, urlId, shortUrl, username FROM url JOIN user ON url.userId = user.userId`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Transaction Error: ', err);
            res.json({
                message: 'Error',
                reason: err,
            })
        } else {
            res.json({
                message: 'Success',
                data: rows,
            })
        }
    })
});

router.get('/getAllStats', (req, res) => {
    let query = `SELECT * FROM stats`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Transaction Error: ', err);
            res.json({
                message: 'Error',
                reason: err,
            })
        } else {
            res.json({
                message: 'Success',
                data: rows,
            })
        }
    })
});

router.post('/deleteUser', (req, res) => {
    let { userId } = req.body;
    let query = `DELETE FROM user WHERE userId = ?`;
    db.run(query, [userId], (err) => {
        if (err) {
            console.error('Transaction Error: ', err);
            res.json({
                message: 'Error',
                reason: err,
            })
        } else {
            res.json({
                message: 'Success',
            })
        }
    })
});

router.post('/deleteURL', (req, res) => {
    let { urlId } = req.body;
    let query = `DELETE FROM url WHERE urlId = ?`;
    db.run(query, [urlId], (err) => {
        if (err) {
            console.error('Transaction Error: ', err);
            res.json({
                message: 'Error',
                reason: err,
            })
        } else {
            res.json({
                message: 'Success',
            })
        }
    })
});


module.exports = router;