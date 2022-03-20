const { Actors } = require('../models/actors.model');
const { ActorsInMovie } = require('../models/actorsInMovie.model');
const { Movies } = require('../models/movies.model');
const { Reviews } = require('../models/reviews.model');
const { Users } = require('../models/users.model');

const initModel = () => {
  //Users <--> Review
  Users.hasMany(Reviews);
  Reviews.belongsTo(Users);

  //Reviews <--> Movies
  Movies.hasMany(Reviews);
  Reviews.belongsTo(Movies);

  //Movies <--> Actors
  Movies.belongsToMany(Actors, { through: ActorsInMovie });
  Actors.belongsToMany(Movies, { through: ActorsInMovie });
};

module.exports = {
  initModel
};
