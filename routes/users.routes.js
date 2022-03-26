const express = require('express');
const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/users.controller');

//middlewares
const {
    validateSession,
    protectAdmin
} = require('../middlewares/auth.middleware');
const {
    userExists,
    protectAccountOwner
} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createNewUser);
router.post('/', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.use('/:id', userExists);
router
    .use('/:id', userExists)
    .route('/:id')
    .get(getUserById)
    .patch(protectAccountOwner, updateUser)
    .delete(protectAccountOwner, deleteUser);



module.exports = {
    usersRouter: router
};
