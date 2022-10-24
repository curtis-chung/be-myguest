const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 50 })
        .withMessage('Username must be between 1 and 50 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6, max: 50 })
        .withMessage('Password must be between 6 and 50 characters'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be between 1 and 50 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must be between 1 and 50 characters'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    const findUserByEmail = await User.findOne({
        where: {
            email: email
        }
    })

    const findUserByUsername = await User.findOne({
        where: {
            username: username
        }
    })

    let errors = {}

    if (findUserByEmail) {
        errors.email = "User with that email already exists"
    }

    if (findUserByUsername) {
        errors.username = "User with that username already exists"
    }

    const hasErrors = Object.keys(errors).length !== 0

    if (hasErrors) {
        res.status(403)
        return res.json({
            message: "User already exists",
            statusCode: 403,
            errors
        })
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    const responseUser = user.toJSON();

    responseUser.token = token;

    delete responseUser.createdAt;
    delete responseUser.updatedAt;

    return res.json(
        responseUser
    );
});

module.exports = router;
