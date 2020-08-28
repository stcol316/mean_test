const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    partySize: {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now
    }
});

const Booking = module.exports = mongoose.model('booking', bookingSchema);
module.exports.get = function (callback, limit) {
    Booking.find(callback).limit(limit);
}