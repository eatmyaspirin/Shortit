require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/', require('./routes/createShortURL'));
app.use('/', require('./routes/getShortURL'))
app.use('/user', require('./routes/user/createUser'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
