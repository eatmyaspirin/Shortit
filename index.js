require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createShortURL = require('./routes/createShortURL');
const getShortURL = require('./routes/getShortURL');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shortUrl', createShortURL);
app.use('/api/shortUrl', getShortURL)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
