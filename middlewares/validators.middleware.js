const { body, validationResult } = require('express-validator');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');


exports.createMovieValidator = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Must provide a valid title'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage(
            'Must provide a valid description'
        ),
    body('duration')
        .isNumeric()
        .withMessage('Duration must be a number')
        .custom((value) => value > 0)
        .withMessage(
            'Duration must be greater than 0'
        ),
    body('rating')
        .isNumeric()
        .withMessage('Rating must be a number')
        .custom((value) => value > 0 && value <= 5)
        .withMessage(
            'Rating must be between 1 and 5'
        ),
    body('genre')
        .isString()
        .withMessage('Genre must be a string')
        .notEmpty()
        .withMessage('Must provide a valid genre'),
    body('actors')
        .isArray({ min: 1 })
        .withMessage(
            'Must provide at least one actor id'
        )
];

//END: Movies validators

//Actors validator
exports.createActorValidator = [
    body('name').isString().notEmpty(),
    body('country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage(
            'Must provide a valid country name'
        ),
    body('rating')
        .isNumeric()
        .withMessage('Rating must be a number')
        .custom((value) => value > 0 && value <= 5)
        .withMessage(
            'Rating must be between 1 and 5'
        ),
    body('age')
        .isNumeric()
        .withMessage('Age must be a number')
        .custom((value) => value > 0)
        .withMessage('Age must be greater than 0')
];

exports.validateResult = catchAsync(async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsg = errors
            .array()
            .map(({ msg }) => msg)
            .join('. ');
        return next(new AppError(400, errorMsg));
    }

    next();
})