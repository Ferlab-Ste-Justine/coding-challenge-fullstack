const User = require("../models/User");

exports.validateUser= (user)=>{
   
    //cheking if the user already exists
     return User
        .findOne({where:{
            email:user.email
        }})
    .then(userRes=>{
        if(userRes){
           throw  new Error("email already exists");
        }else{
            //chekking if the username exists 
            return User
                .findOne({where:{
                    username:user.username
                }});  
        }
    })
    .then(userRes=>{
        if(userRes){
            //username already exists
            throw new Error("the username is taken");
        }else{
            //cheking if the passwords match 
            if(user.password !== user.passwordConfirmation){
                throw new Error ("passwords don't match ");
            }else{
                return "";
            }
        }
    })
    .catch(error=>{
        throw error;
    })
}

