const dotenv = require('dotenv');
const { Users } = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(
    async (req, res, next) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(
                new AppError(400, 'invalid session')
            );
        }

        const decodedToken = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const user = await Users.findOne({
            where: {
                id: decodedToken.id,
                status: 'active'
            },
            attributes: {
                exclude: ['password']
            }
        });

        if (!user) {
            return next(
                new AppError(
                    401,
                    'This user is no longer available'
                )
            );
        }

        req.currentUser = user;

        next();
    }
);

exports.protectAdmin = catchAsync(
    async (req, res, next) => {

        if(req.currentUser.role !== 'admin'){
            return next(new AppError(403, 'access denied'))
        }

        

        next();
    }
);
