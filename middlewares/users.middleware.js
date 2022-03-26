const { Users } = require('../models/users.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.userExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id,
            status: 'active'
        },
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        return next(
            new AppError(404, 'user not found, invalid Id')
        );
    }

    req.user = user;
    next();
});

exports.protectAccountOwner = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;

        const {currentUser} = req;

        if(currentUser.id !== +id){
            return next ( new AppError(403, `you can't update other users accounts`));
        }

        next();
    }
);
