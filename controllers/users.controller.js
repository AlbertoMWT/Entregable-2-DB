const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//Models
const { Users } = require('../models/users.model');
//Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: '/config.env' })

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
    const { user } = req;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.createNewUser = catchAsync(
    async (req, res, next) => {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return next(
                new AppError(
                    400,
                    'You must provide the required information'
                )
            );
        }

        const salt = await bcrypt.genSalt(12);

        const hashedPass = await bcrypt.hash(
            password,
            salt
        );

        const user = await Users.create({
            username,
            email,
            password: hashedPass,
            role
        });

        password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
);

exports.updateUser = catchAsync(async (req, res, next) => {

    const {user} = req

    const data = filterObj(
        req.body,
        'username',
        'email',
        'password'
    );

    await user.update({ ...data });

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    
    const{user} = req;

    await user.update({
        status: 'disable'
    });

    res.status(200).json({
        status: 'success',
        message: 'user deleted'
    });
});

exports.loginUser = catchAsync(
    async (req, res, next) => {

        const {email, password} = req.body;

        const user = await Users.findOne({
            where:{
                email,
                status: 'active'
            }
        });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return next(new AppError(404, 'Credential are invalids'))
        };

        const token = await jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                token
            }
        })

    }
);
