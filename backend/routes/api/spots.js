const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize')

// Get all spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = []

    for (let spot of spots) {
        // push in a JSON object into the new array so we can manipulate the data
        spotsList.push(spot.toJSON())
    }

    // get avg rating of every spot
    for (let spot of spotsList) {
        const average = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]
            ],
            raw: true
        })

        //console.log(average)
        if (average) {
            const fixedAvg = Number(average.avgRating).toFixed(1)
            const parseAvg = parseFloat(fixedAvg)
            spot.avgRating = parseAvg
        } else {
            spot.avgRating = "no ratings yet"
        }

        delete spot.Reviews
    }

    // iterate through each spot and check if there are any preview images
    for (let spot of spotsList) {
        for (let image of spot.SpotImages) {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        }

        // if no spot preview images found return an error
        if (!spot.previewImage) {
            spot.previewImage = "no preview image found"
        }

        // delete SpotImages object from response
        delete spot.SpotImages
    }

    res.json(spotsList)
})

// create a spot
router.post("/", requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(newSpot)
})

// add an image to a spot based on the spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId)

    // if spot not found
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // if user is not the owner
    if (userId !== spot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    // if spot is found
    const newSpotImage = await SpotImage.create({
        spotId,
        url,
        preview,
    })

    return res.json({
        "id": newSpotImage.id,
        "url": newSpotImage.url,
        "preview": newSpotImage.preview,
    })
})

// get all spots owned by the current user
router.get("/current", async (req, res) => {
    const userId = req.user.id
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],
        where: { ownerId: userId }
    })

    let spotsList = []

    for (let spot of spots) {
        // push in a JSON object into the new array so we can manipulate the data
        spotsList.push(spot.toJSON())
    }

    // get avg rating of every spot
    for (let spot of spotsList) {
        const average = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]
            ],
            raw: true
        })

        //console.log(average)
        if (average) {
            const fixedAvg = Number(average.avgRating).toFixed(1)
            const parseAvg = parseFloat(fixedAvg)
            spot.avgRating = parseAvg
        } else {
            spot.avgRating = "no ratings yet"
        }

        delete spot.Reviews
    }

    // iterate through each spot and check if there are any preview images
    for (let spot of spotsList) {
        for (let image of spot.SpotImages) {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        }

        // if no spot preview images found return an error
        if (!spot.previewImage) {
            spot.previewImage = "no preview image found"
        }

        // delete SpotImages object from response
        delete spot.SpotImages
    }

    res.json(spotsList)
})

// get details for a spot from an id
router.get("/:spotId", async (req, res) => {
    const currentSpotId = req.params.spotId

    // query for spot
    let currentSpot = await Spot.findByPk(currentSpotId, {
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ],
    })

    if (!currentSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const jsonCurrentSpot = currentSpot.toJSON()

    // get count
    const count = await Review.count({
        where: { spotId: currentSpotId }
    })

    if (count) {
        jsonCurrentSpot.numReviews = count
    } else {
        jsonCurrentSpot.numReviews = "no reviews yet"
    }

    // get average star rating
    const average = await Review.findOne({
        where: { spotId: currentSpotId },
        attributes: [
            [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]
        ],
        raw: true
    })

    if (average) {
        const fixedAvg = Number(average.avgRating).toFixed(1)
        const parseAvg = parseFloat(fixedAvg)
        jsonCurrentSpot.avgStarRating = parseAvg
    } else {
        jsonCurrentSpot.avgStarRating = "no ratings yet"
    }

    res.json(jsonCurrentSpot)
})

// edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotId = req.params.spotId
    const ownerId = req.user.id

    // query for spot
    const currentSpot = await Spot.findByPk(spotId)

    // if spot not found
    if (!currentSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // if user is not the owner
    if (ownerId !== currentSpot.ownerId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const edit = await currentSpot.update({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(edit)
})

// Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

    // query for spot
    const spot = await Spot.findByPk(spotId)

    // if spot not found
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // Review from the current user already exists for the Spot
    // findAll will return an array, findOne will return an object
    const reviewChecker = await Review.findOne({
        where: {
            [Op.and]: [
                { spotId: spotId },
                { userId: userId }
            ]
        }
    })

    if (reviewChecker) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    // if spot is found
    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars,
    })

    return res.json(newReview)
})

// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
    const userId = req.user.id;
    const { spotId } = req.params;

    const reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ],
        where: {
            [Op.and]: [
                { spotId: spotId },
                { userId: userId }
            ]
        }
    })

    if (reviews.length === 0) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let reviewList = []

    for (let review of reviews) {
        reviewList.push(review.toJSON())
    }

    res.json({ Reviews: reviewList })
})

// Create a Booking from a Spot based on the Spot's id

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

    // query for spot
    const spot = await Spot.findByPk(spotId)

    // if spot not found
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // Review must not belong to the current user
    if (spot.ownerId === userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    // check to see if booking is today or in the past
    const todayDate = new Date().toJSON().slice(0, 10)

    if (todayDate === startDate) {
        res.status(403);
        return res.json({
            message: "Sorry, cannot book for same day",
            statusCode: 403,
            errors: {
                startDate: "Start date cannot be today",
            }
        })
    }

    if (todayDate > startDate) {
        res.status(403);
        return res.json({
            message: "Sorry, cannot book for a past date",
            statusCode: 403,
            errors: {
                startDate: "Start date cannot be in the past",
            }
        })
    }

    // check to see if booking end date is after booking start date
    if (endDate <= startDate) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    // check to see if bookings overlap
    const existingBookings = await Booking.findAll({
        where: { spotId: spotId },
        raw: true
    })

    let errors = {}

    for (let booking of existingBookings) {

        console.log(booking)

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
                message: "Sorry, there are date conflicts with an existing booking",
                statusCode: 403,
                errors
            })
        }
    }

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    // console.log(existingBookings)

    return res.json({
        "id": newBooking.id,
        "spotId": spotId,
        "userId": userId,
        "startDate": startDate,
        "endDate": endDate,
        "createdAt": new Date(),
        "updatedAt": new Date()
    })
})

module.exports = router;
