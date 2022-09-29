const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize')

// Delete a spot image
router.delete("/:imageId", requireAuth, async (req, res) => {
    const { imageId } = req.params
    const userId = req.user.id

    const image = await ReviewImage.findByPk(imageId)

    if (!image) {
        res.status(404);
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findByPk(image.reviewId)

    if (userId !== review.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    await image.destroy();

    const successfulDelete = {
        message: "Successfully deleted",
        statusCode: 200
    }

    return res.json(successfulDelete)
})

module.exports = router;
