require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { isLoggedIn, isAdmin } = require('./middleware/auth');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/', isLoggedIn, require('./routes/url/createShortURL'));
app.use('/', require('./routes/url/getShortURL'))
app.use('/', require('./routes/registerUser'));
app.use('/', require('./routes/loginUser'));
app.use('/user', isLoggedIn, require('./routes/user.js'));
app.use('/admin', isAdmin, require('./routes/admin.js'));

app.use('/logout', (res) => {
  res.clearCookie('jwt');
  res.status(200).json({
    message: 'Logged out successfully'
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
