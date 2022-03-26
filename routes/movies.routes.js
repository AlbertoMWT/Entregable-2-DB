const express = require('express');

const {
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    createNewMovie
} = require('../controllers/movies.controller');

const router = express.Router();

router
    .route('/')
    .get(getAllMovies)
    .post(createNewMovie);

router
    .route('/:id')
    .get(getMovieById)
    .patch(updateMovie)
    .delete(deleteMovie);

module.exports = {
    moviesRouter: router
};
