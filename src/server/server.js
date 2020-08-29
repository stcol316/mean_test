const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

//Configure Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => res.send('All aboard the Server Express!'));

//Configure port
const port = 8080;
app.listen(port, () => {
  console.log(`Node Server started on ${port}!`)
});

//Configure Mongoose
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

//Configure Api routes
const bookingApi = require('./routes/bookingApi');

app.use('/api/booking', bookingApi);


