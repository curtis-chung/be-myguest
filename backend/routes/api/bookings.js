const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();
const { Op, DATE } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required')
        .bail()
        .isDate()
        .withMessage('Must be in date format, YYYY-MM-DD'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End Date is required')
        .bail()
        .isDate()
        .withMessage('Must be in date format, YYYY-MM-DD'),
    handleValidationErrors
];

// Get all of the Current User's Bookings
router.get("/current", async (req, res) => {
    const userId = req.user.id

    const Bookings = await Booking.findAll({
        where: { userId: userId },
        include: {
            model: Spot,
            attributes: { exclude: ["description"] }
        },
    })

    let bookingList = []

    for (let booking of Bookings) {
        bookingList.push(booking.toJSON())
    }

    for (let booking of bookingList) {
        const previewImage = await SpotImage.findOne({
            where: {
                [Op.and]: [
                    { preview: true },
                    { spotId: booking.Spot.id }
                ]
            }
        })

        if (previewImage) {
            booking.Spot.previewImage = previewImage.url
        } else {
            booking.Spot.previewImage = "no preview image yet"
        }
    }

    return res.json({ Bookings: bookingList })
})

// edit a booking
router.put("/:bookingId", [requireAuth, validateBooking], async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params
    const userId = req.user.id

    // query for booking
    const currentBooking = await Booking.findByPk(bookingId)

    // if booking not found
    if (!currentBooking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    // if user is not the owner
    if (userId !== currentBooking.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    // check to see if booking end date is after booking start date
    if (endDate <= startDate) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    // check to see if booking is in the past
    const todayDate = new Date().toJSON().slice(0, 10)

    if (todayDate > startDate) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403,
        })
    }

    // check to see if bookings overlap
    const allBookingsForCurrentSpot = await Booking.findAll({
        where: {
            spotId: currentBooking.spotId,
            [Op.not]: [
                { id: bookingId }
            ]
        },
        raw: true
    })

    let errors = {}

    for (let booking of allBookingsForCurrentSpot) {

        // if start date is on or between existing dates
        if (startDate >= booking.startDate && startDate <= booking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking"
        }

        // if end date is on or between existing dates
        if (endDate >= booking.startDate && endDate <= booking.endDate) {
            errors.endDate = "End date conflicts with an existing booking"
        }

        // if existing bookings are in between startDate and endDate
        if (startDate <= booking.startDate && endDate >= booking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking"
            errors.endDate = "End date conflicts with an existing booking"
        }

        const hasErrors = Object.keys(errors).length !== 0

        if (hasErrors) {
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors
            })
        }
    }

    const edit = await currentBooking.update({
        startDate,
        endDate,
        updatedAt: new Date()
    })

    return res.json(edit)
})

// Delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const userId = req.user.id
    const todayDate = new Date().toJSON().slice(0, 10)

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (userId !== booking.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    if (booking.startDate < todayDate) {
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403,
        })
    }

    await booking.destroy();

    const successfulDelete = {
        message: "Successfully deleted",
        statusCode: 200
    }

    return res.json(successfulDelete)
})

module.exports = router;
