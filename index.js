require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { isLoggedIn, isAdmin } = require('./middleware/auth');

const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173'];

app.use(function(req, res, next) {  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
     res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
app.use(cookieParser());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/', require('./routes/url/getShortURL'))
app.use('/login', require('./routes/loginUser'));
app.use('/register', require('./routes/registerUser'));
app.use('/create', require('./routes/url/createShortURL'));
app.use('/user', isLoggedIn, require('./routes/user.js'));
app.use('/admin',[isLoggedIn, isAdmin], require('./routes/admin.js'));
app.use('/logout', (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: 'Logged out successfully'
  })
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
