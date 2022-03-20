const { app } = require("./app");
const { sequelize } = require("./util/dataBase");


const PORT = process.env.PORT || 3002

sequelize.authenticate()
        .then(( ) => console.log('database authenticated') )
        .catch(err => console.log(err));


app.listen(PORT, `Running database on ${PORT}`)