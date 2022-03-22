const express = require('express');
const {
    getAllReviews,
    getReviewById,
    createNewReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews.controller');

const router = express.Router();

router.get('/', getAllReviews);

router.get('/:id', getReviewById);

router.post('/', createNewReview);

router.patch('/:id', updateReview);

router.delete('/:id', deleteReview);

module.exports = {
    reviewsRouter: router
};
