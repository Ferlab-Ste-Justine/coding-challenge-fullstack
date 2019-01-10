const sequelize = require("sequelize");
const database = require("../utils/database");


const Users=database.define("users",{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:sequelize.STRING,
        unique:true,
        allowNull:false
    },
   email:{
       type:sequelize.STRING,
       allowNull:false,
       unique:true,
       validate:{
           isEmail:true
       }
   },
   password:{
       type:sequelize.STRING,
       allowNull:false,
       validate:{
           min:6
       }
   } 
});

module.exports=Users;