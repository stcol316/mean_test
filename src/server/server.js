const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server started!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

var bookingApi = require('./routes/bookingApi');

app.use('/api/v1/booking', bookingApi);


