const express = require('express');
const { ActorsInMovie } = require('./models/actorsInMovie.model');


//Routes
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRoutes } = require('./routes/movies.routes');
const { reviewsRouter } = require('./routes/reviews.routes');
const { usersRoutes } = require('./routes/users.routes');

const app = express();
app.use(express.json());


app.use('/api/v1/actors', actorsRouter)
// app.use('/api/v1/actorsinmovie',)
app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/reviews', reviewsRouter)
app.use('/api/v1/users', usersRoutes)

module.exports = {
    app
}
