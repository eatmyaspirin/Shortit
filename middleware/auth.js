const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({
                    message: 'Invalid or Expired Token, Authentication Failed'
                })
            } else {
                if (decodedToken.isAdmin) {
                    next();
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
            }
        })
    } else {
        res.status(401).json({
            message: 'Token not found, Authentication Failed'
        })
    }
}

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({
                    message: 'Invalid or Expired Token, Authentication Failed'
                })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({
            message: 'Token not found, Authentication Failed'
        })
    }
}

module.exports = {
    isAdmin,
    isLoggedIn
}