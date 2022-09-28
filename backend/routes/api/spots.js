const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();

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

module.exports = router;
