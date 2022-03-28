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
    .sync(        )
    .then(() => console.log('database synced'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Running database on port: ${PORT}`);
});