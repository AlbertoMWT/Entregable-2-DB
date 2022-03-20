const { Actors } = require("../models/actors.model")
const { AppError } = require("../util/appError")
const { catchAsync } = require('../util/catchAsync')



exports.getAllActors = catchAsync(async(req, res, next) => {

    const actors = await Actors.findAll({
        where: {
            status: 'active'
        }
    })

    if(!actors){
        return next(new AppError(404, 'Actors not found'))
    }

    res.status(200).json({
        status: 'success',
        data: {
            actors
        }
    })

})

exports.createNewActor = catchAsync(async(req, res, next) => {

    const {
        name, 
        country, 
        oscarPriezes, 
        raiting,
        age,
    } = req.body

    if( !name || !country || !age){
        return next(new AppError(400, 'Must provide information'))
    }

    const actor = await Actors.create({
        name,
        country,
        oscarPriezes,
        raiting,
        age
    })

    res.status(201).json({
        status: 'succes',
        data: {
            actor
        }
    });


})

exports.updateActor = catchAsync(async(req, res, next) => {

    const {id} = req.params
    const {country, age} = req.body

    const actor = await Actors.findOne({
        where:{
            id,
            status: 'active'
        }
    })

    if(!actor){
        return next(new AppError(404, 'Id not valid'))
    }

    await actor.update({
        country,
        age
    })

    res.status(200).json({
        status: 'success',
        data:{
            actor
        }
    })

})

exports.deleteActor = catchAsync(async(req, res, next) => {
    const {id} = req.params
    
    const actor = await Actors.findOne({
        where:{
            id,
            status:'active'
        }
    });

    if(!actor){
        return next(new AppError(404, 'Id not valid'))
    }

    await actor.update({
        status: 'disable'
    })

    res.status(200).json({
        status: 'success',
        message: 'actor deleted'
    })

})