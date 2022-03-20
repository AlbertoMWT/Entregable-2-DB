const { ActorsInMovie } = require("../models/actorsInMovie.model");
const { AppError } = require("../util/appError");
const { catchAsync } = require("../util/catchAsync");

exports.getAllActorsInMovie = catchAsync(async(req, res, next) => {

    const actors = await ActorsInMovie.findAll({
        where:{
            status:'active'
        }
    })

    res.status(200).json({
        status: 'success',
        data:{
            actors
        }
    })
})

exports.getActorInMovieById = catchAsync(async(req, res, next) =>{

    const {id} = req.params

    const actor = await ActorsInMovie.findOne({
        where:{
            id,
            status:'active'
        }
    })

    if(!actor){
        return next(new AppError(404, 'Actor not found, invalid Id' ))
    }

    res.status(200).json({
        status:'active',
        data:{
            actor
        }
    })
})

exports.createNewActorInMovie = catchAsync(async(req, res, next) =>{

    const {actorId, movieId} = req.body

    const actor = await ActorsInMovie.findOne({
        where:{
            movieId
        }
    })

})