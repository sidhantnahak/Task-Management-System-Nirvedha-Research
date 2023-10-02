
const { body } = require('express-validator')

exports.taskDataValidation = [

    body("title")
        .exists({ checkFalsy: true }).withMessage("Title is required")
        .isString().withMessage("Title should be string")
        .isLength({ min: 3, max: 30 }).withMessage("Title is too short"),


    body("description")
        .exists({ checkFalsy: true }).withMessage("Description is required")
        .isString().withMessage("Description should be string")
        .isLength({ min: 4 }).withMessage("Description is too short")

]

exports.RegisterDataValidation = [

    body("name")
        .exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isLength({ min: 4, max: 30 }).withMessage("name is too short")
        .isString()
        .withMessage("User name should be string"),
    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("enter a valid email"),
    body("phone")
        .isNumeric()
        .withMessage("phone number should be a number")
        .isLength({ min: 10, max: 10 }).withMessage("enter a valid phone number"),
    body("password")
        .exists().withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isLength({ min: 8 }).withMessage("Password should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("enter a strong password")
]

exports.LoginDataValidation = [

    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("enter a valid email"),

    body("password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 8 }).withMessage("Password should be at least 8 characters")
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("enter a strong password")
]







