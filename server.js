const { app } = require('./app');

//Utils
const { sequelize } = require('./util/dataBase');
const { initModel } = require('./util/initModels');

sequelize
    .authenticate()
    .then(() => console.log('database authenticated'))
    .catch((err) => console.log(err));

initModel();

sequelize
    .sync()
    .then(() => clg('Database Synced'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3002;

app.listen(PORT, `Running database on ${PORT}`);
