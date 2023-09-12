const express = require('express');
const db = require('../../utils/database');
const md5 = require('md5')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.post('/createUser', urlEncodedParser, (req, res) => {
    let { username, password } = req.body;
    let userId = md5(username).substring(0,10);
    if (password.length < 8) res.json({message: 'Password should be more than 8 characters'});
    bcrypt.hash(password, 10, (err, hash) => {
        try {
            let query = `INSERT INTO user (userId, username, password) VALUES (?,?,?)`;
        db.run(query, [userId, username, hash], (err) => {
            if(err) {
                console.error('Transaction Error: ', err);
                if(err.errno == 19) {
                    res.json({
                        message: err.message,
                        reason: 'Username already exists',
                    })
                }
            } else {
                res.json({
                    message: 'User registered successfully',
                })
            }
        })
    } catch(err) {
        console.log('Error: ', err);
        res.json({
            message: 'Error',
            reason: err,
        })
    }
})
});

module.exports = router;