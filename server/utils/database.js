const sequelize = require("sequelize");

const database = new sequelize("chu_assignment","root","root",{
    dialect:"mysql"
});

module.exports= database;


