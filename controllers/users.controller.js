const bcrypt = require('bcryptjs')

//Models
const { Users } = require('../models/users.model');
//Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const Users = await Users.findAll({
        where: {
            status: 'active'
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            Users
        }
    });
});

exports.getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!user) {
        return next(
            new AppError(404, 'user not found, invalid Id')
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.createNewUser = catchAsync(
    async (req, res, next) => {
        const { username, email, password } =
            req.body;

        if (!username || !email || !password) {
            return next(
                new AppError(
                    400,
                    'You must provide the required information'
                )
            );
        }

        const salt = await bcrypt.genSalt(12);

        const hashedPass = await bcrypt.hash(password, salt)

        const user = await Users.create({
            username,
            email,
            password: hashedPass     
        });

        password = undefined

        res.status(200).json({
            status: 'success',
            data: {
                user
            },
        });
    }
);

exports.updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'username',
        'email',
        'password',
    );

    const patch = await Users.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!patch) {
        return next(
            new AppError(404, 'user not found, invalid Id')
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

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!user) {
        return next(
            new AppError(400, 'user not found, invalid Id')
        );
    }

    await user.update({
        status: 'disable'
    });

    res.status(200).json({
        status: 'success',
        message: 'user deleted'
    });
});
