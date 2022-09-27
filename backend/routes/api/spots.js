const express = require('express')
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

module.exports = router;
