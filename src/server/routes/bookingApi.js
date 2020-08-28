const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', function(req, res) {
  res.json({
    status: 'API Working',
    message: 'Drop the base',
  });
});

router.route('/bookings')
    .get(bookingController.index)
    .post(bookingController.new);

router.route('/bookings/:booking_id')
    .put(bookingController.update)
    .delete(bookingController.delete);

module.exports = router;
