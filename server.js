process.title = 'macrofitter';
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.disable('x-powered-by');
app.use(cors());

var port = process.env.PORT || 3000;

//method serving the html
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/index.html'));
});

//method serving as a proxy for cors requests
app.post('/getcolors', (req, res) => {
  console.log('Requested. Offset: ', req.body.resultOffset);
  axios
    .get(
      `http://www.colourlovers.com/api/palettes/new?format=json&numResults=10&resultOffset=${req.body.resultOffset}`,
      {}
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Error getting assets' });
    });
});

app.listen(port, () => {
  console.log('server running on port ' + port);
});
