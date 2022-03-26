
const { Reviews } = require("../models/reviews.model");
const { catchAsync } = require("../util/catchAsync");



exports.getAllReviews = catchAsync(
    async (req, res, next) => {
        const Reviews = await Reviews.findAll({
            where: {
                status: 'active'
            }
        });

        res.status(200).json({
            status: 'success',
            data: {
                Reviews
            }
        });
    }
);

exports.getReviewById = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;

        const review = await Reviews.findOne({
            where: {
                id,
                status: 'active'
            }
        });

        if (!review) {
            return next(
                new AppError(
                    404,
                    'review not found, invalid Id'
                )
            );
        }

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        });
    }
);

exports.createNewReview = catchAsync(
    async (req, res, next) => {
        const {
            title,
            comment,
            rating,
            userId,
            movieId,
        } = req.body;

        if (!title || !comment || !userId || !movieId) {
            return next(
                new AppError(
                    400,
                    'You must provide the required information'
                )
            );
        }

        const review = await Reviews.create({
            title,
            comment,
            rating,
            userId,
            movieId,
        });

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        });
    }
);

exports.updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'title',
        'comment',
        'rating',
        'userId',
        'movieId',
    );

    const patch = await Reviews.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!patch) {
        return next(
            new AppError(404, 'review not found, invalid Id')
        );
    }

    await patch.update({ ...data });

    res.status(200).json({
        status: 'success',
        data: {
            patch
        }
    });
});

exports.deleteReview = catchAsync(
    async(req, res, next) => {
        const {id} = req.params

        const review = await Reviews.findOne({
            where:{
                id,
                status:'active'
            }
        })

        if(!review){
            return next( new AppError(400, 'review not found, invalid Id'))
        }

        await review.update({
            status:'disable'
        })

        res.status(200).json({
            status:'success',
            message:'review deleted'
        })

    }
)