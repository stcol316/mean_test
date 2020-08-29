const Booking = require('../models/bookingModel');

//Get
exports.index = function (req, res) {
    console.log('Getting bookings');
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
    console.log('Adding booking');
    console.log(req);
    let booking = new Booking();
    //booking.firstName = req.body.name ? req.body.name : booking.name;
    booking.firstName = req.body.firstName;// ? req.body.firstName : booking.firstName;
    booking.lastName = req.body.lastName;
    booking.bookingDate = req.body.bookingDate;
    booking.bookingTime = req.body.bookingTime;
    booking.phoneNumber = req.body.phoneNumber;
    booking.partySize = req.body.partySize;

    booking.save(function (err) {
        res.json({
            message: 'New booking created!',
            data: booking
        });
    });
};

// Put
exports.update = function (req, res) {
    console.log('Updating booking');

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
    console.log('Deleting booking');

    Booking.remove({
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