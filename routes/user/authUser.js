const express = require('express');
const db = require('../../utils/database');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.post('/authUser', urlEncodedParser, (req, res) => {
    let { username, password } = req.body;
    try {
        let query = `SELECT * FROM user WHERE username = ?`;
        db.get(query, [username], (err, row) => {
            if (err) {
                console.error('Transaction Error: ', err);
            } else {
                    bcrypt.compare(password, row.password, (err, result) => {
                        res.json({
                            message: 'Successfully authenticated'
                        })
                })
            }
        })
    } catch (err) {
        console.log('Error: ', err);
        res.json({
            message: 'Error',
            reason: err,
        })
    }
});

module.exports = router;