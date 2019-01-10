const sequelize = require("sequelize");
const database = require("../utils/database");


const Posts=database.define("Posts",{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    content:{
        type:sequelize.TEXT,
        allowNull:false
    }
   
});

module.exports=Posts;