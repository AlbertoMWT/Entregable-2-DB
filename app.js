const express = require('express');

//controllers
const { globalErrorHandler } = require('./controllers/error.controller');


//Routes
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { usersRouter } = require('./routes/users.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/actors', actorsRouter)
app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/users', usersRouter)

app.use(globalErrorHandler)

module.exports = {
    app
}
