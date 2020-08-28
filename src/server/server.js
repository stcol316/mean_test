const express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.get('/', (req, res) => res.send('All aboard the Server Express!'));

const port = 8080;
app.listen(port, () => {
  console.log(`Node Server started on ${port}!`)
});

const url = 'mongodb://localhost:27017/bookingsDb';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Mongoose is loose:', url)
});

db.on('error', err => {
  console.error('Mongoose is down:', err)
});

const bookingApi = require('./routes/bookingApi');

app.use('/api/v1/booking', bookingApi);


