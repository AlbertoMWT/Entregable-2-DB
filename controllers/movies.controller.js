
//Models
const { Movies } = require('../models/movies.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllMovies = catchAsync(
    async (req, res, next) => {
        const movies = await Movies.findAll({
            where: {
                status: 'active'
            }
        });

        res.status(200).json({
            status: 'success',
            data: {
                movies
            }
        });
    }
);

exports.getMovieById = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;

        const movie = await Movies.findOne({
            where: {
                id,
                status: 'active'
            }
        });

        if (!movie) {
            return next(
                new AppError(
                    404,
                    'Movie not found, invalid Id'
                )
            );
        }

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
    }
);

exports.createNewMovie = catchAsync(
    async (req, res, next) => {
        const {
            title,
            description,
            duration,
            rating,
            imgUrl,
            genre,
            actors
        } = req.body;

        //actors = [1,2,3,4]

        if (!title || !description || !imgUrl || !genre) {
            return next(
                new AppError(
                    400,
                    'You must provide the required information'
                )
            );
        }

        const movie = await Movies.create({
            title,
            description,
            duration,
            rating,
            imgUrl,
            genre
        });

        const actorsInMoviePromises = actors.map( async(actorId) => {
            return await ActorsInMovie.create({ actorId, movieId: movie.id})
        })

        await Promise.all(actorsInMoviePromises)

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
    }
);

exports.updateMovie = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'title',
        'description',
        'duration',
        'rating',
        'imgUrl',
        'genre'
    );

    const patch = await Movies.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!patch) {
        return next(
            new AppError(404, 'Movie not found, invalid Id')
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

exports.deleteMovie = catchAsync(
    async(req, res, next) => {
        const {id} = req.params

        const movie = await Movies.findOne({
            where:{
                id,
                status:'active'
            }
        })

        if(!movie){
            return next( new AppError(400, 'Movie not found, invalid Id'))
        }

        await movie.update({
            status:'disable'
        })

        res.status(200).json({
            status:'success',
            message:'Movie deleted'
        })

    }
)

