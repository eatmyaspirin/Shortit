const express = require('express');
const db = require('../utils/database');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/getMyUrls', (req, res) => {
    const { userId } = req.decodedToken;
    let query = `SELECT * FROM url WHERE userId = ?`;
    db.all(query, [userId], (err, rows) => {
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

router.get('/stats/:id', (req, res) => {
    const params = [req.params.id, req.decodedToken.userId];
    const query = `SELECT * FROM stats WHERE urlId = ? AND userId = ?`;
    db.get(query, params, (err, rows) => {
        if (err) {
            console.error('Transaction Error:', err);
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


router.post('/delete', bodyParser.json(), (req, res) => {
    const { urlId } = req.body;
    const { userId } = req.decodedToken;
    let query = `DELETE FROM url WHERE urlId = ? AND userId = ?`;
    db.run(query, [urlId, userId], (err) => {
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