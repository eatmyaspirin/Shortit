const express = require('express');
const db = require('../utils/database');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlEncodedParser, (req, res) => {
    let { username, password } = req.body;
    try {
        let query = `SELECT * FROM user WHERE username = ?`;
        db.get(query, [username], (err, row) => {
            if (err) {
                console.error('Transaction Error: ', err);
            } else {
                if (row) {
                    bcrypt.compare(password, row.password, (err, result) => {
                        if (result) {
                            const token = jwt.sign(
                                { username, userId: row.userId, isAdmin: row.isAdmin }, process.env.JWTSECRET, { expiresIn: process.env.MAXAGE*1000 }
                            );
                            res.cookie("jwt", token, {
                                httpOnly: true,
                                maxAge: process.env.MAXAGE * 1000,
                            }).json({
                                message: 'Successfully authenticated',
                                userId: row.userId,
                            })
                        } else {
                            res.status(400).json({
                                message: 'Authentication failed'
                            })
                        }
                    })
                } else {
                    res.json({
                        message: 'User not found'
                    })
                }
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