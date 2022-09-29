const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');

// Get all of the Current User's Bookings
router.get("/current", async (req, res) => {
    const userId = req.user.id

    const Bookings = await Booking.findAll({
        where: { userId: userId },
        include: {
            model: Spot
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

module.exports = router;
