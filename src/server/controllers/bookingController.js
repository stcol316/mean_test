const Booking = require('../models/bookingModel');

//Get
exports.index = function (req, res) {
    Booking.get(function (err, bookings) {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Bookings retrieved successfully",
            data: bookings
        });
    });
};

// Post
exports.new = function (req, res) {
    let booking = new Booking(JSON.parse(req.body.bookingParams));

    console.log(booking);
    booking.save(function (err) {
        res.json({
            message: 'New booking created!',
            data: booking
        });
    });
};

// Put
exports.update = function (req, res) {
    console.log(req.body);

    Booking.findById(req.params.booking_id, function (err, booking) {
        if (err)
            res.send(err);
        booking.firstName = req.body.firstName;// ? req.body.firstName : booking.firstName;
        booking.lastName = req.body.lastName;
        booking.bookingDate = req.body.bookingDate;
        booking.bookingTime = req.body.bookingTime;
        booking.phoneNumber = req.body.phoneNumber;
        booking.partySize = req.body.partySize;

        booking.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Booking Info updated',
                data: booking
            });
        });
    });
};

exports.delete = function (req, res) {
    Booking.deleteOne({
        _id: req.params.booking_id
    }, function (err, booking) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Booking deleted'
        });
    });
};