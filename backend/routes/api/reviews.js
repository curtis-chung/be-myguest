const express = require('express')
const { requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { url } = req.body;
    const { reviewId } = req.params;
    const userId = req.user.id;

    // query for review
    const review = await Review.findByPk(reviewId)

    // if review not found
    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // Review must belong to the current user
    if (review.userId !== userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    // Cannot add any more images because there is a maximum of 10 images per resource
    const reviewImageChecker = await ReviewImage.count({
        where: { reviewId: reviewId }
    })

    if (reviewImageChecker >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    // if review is found and has room
    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    })

    return res.json({
        "id": newReviewImage.id,
        "url": newReviewImage.url,
    })
})

// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    const userId = req.user.id
    const Reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: { exclude: ["createdAt", "updatedAt", "description"] }
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ],
        where: { userId: userId },
    })

    let reviewList = []

    for (let review of Reviews) {
        reviewList.push(review.toJSON())
    }

    for (let review of reviewList) {
        const previewImage = await SpotImage.findOne({
            where: {
                [Op.and]: [
                    { preview: true },
                    { spotId: review.Spot.id }
                ]
            }
        })

        if (previewImage) {
            review.Spot.previewImage = previewImage.url
        } else {
            review.Spot.previewImage = "no preview image yet"
        }
    }

    res.json({ Reviews: reviewList })
})

// Edit a Review
router.put("/:reviewId", [requireAuth, validateReview], async (req, res) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params
    const ownerId = req.user.id

    // query for review
    const currentReview = await Review.findByPk(reviewId)

    // if review not found
    if (!currentReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // if user is not the owner
    if (ownerId !== currentReview.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const edit = await currentReview.update({
        review,
        stars
    })

    return res.json(edit)
})

// Delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const userId = req.user.id

    const review = await Review.findByPk(reviewId)

    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if (userId !== review.userId) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    await review.destroy();

    const successfulDelete = {
        message: "Successfully deleted",
        statusCode: 200
    }

    return res.json(successfulDelete)
})

module.exports = router;
