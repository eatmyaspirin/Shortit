const express = require('express');
const db = require('../utils/database');
const router = express.Router();

router.get('/getMyURLs', (req, res) => {
    const { userId }= req.decodedToken;
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

module.exports = router;