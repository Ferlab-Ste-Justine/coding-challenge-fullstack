
const validator = require("../validations/authValidator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_CODE = require("../utils/constants");


const EXPIRIES_IN="1";
const CUSTOM_ERROR_CODE=780;

exports.signUp = (req,res,next)=>{
    const user = req.body.user;
    validator
        .validateUser(user)
        .then(result=>{
            const password = user.password ; 
            // registering the new user 
            return bcrypt
                .hash(password,12)
                .then(hashedPw=>{
                    user.password=hashedPw;
                    return User.create(user);
                })
                .then(response=>{
                    // creating the token since the user registred succesfully
                    const token=jwt.sign({
                            email:user.email,
                            id:user.id,
                        },
                        SECRET_CODE,
                        {expiresIn:EXPIRIES_IN}
                        );
                    res
                    .status(201)
                    .json({
                        userId:response.id,
                        username:user.username,
                        userEmail:response.email,
                        token:token,
                        message:"user created succesfully"
                    })
                })  
                .catch(error=>{
                    if(!error.statusCode){
                        error.statusCode=500;
                    }
                    next(error);
                })
            
                })
            .catch(error=>{
                res.json({
                    errors:error.message,
                    message:"an error occured",
                    code:CUSTOM_ERROR_CODE
                });
            })
}

exports.login=(req,res,next)=>{
    const user = req.body.user;
    let userToBeLoggedIn={};
    //cheking if the user exists 
    User
        .findOne({where:{
            username:user.username
        }})
        .then(fetchedUser=>{
            if(!fetchedUser){
                throw new Error("username doesn't exist");
            }else{
                // the username exists 
                //verifying the password
                userToBeLoggedIn=fetchedUser;
                return bcrypt.compare(user.password,fetchedUser.password)
            }
        })  
        .then(isEqual=>{
            if(!isEqual){
                throw new Error("wrong credentials");
            }
            // the creadentials are correct 
            // generetae the web token and send it back to the user
           const token= jwt.sign({
                    email:userToBeLoggedIn.email,
                    id:userToBeLoggedIn.id
                },
                SECRET_CODE,
                {expiresIn:`${EXPIRIES_IN}h`});
            res
            .status(200)
            .json({
                token:token,
                userEmail:userToBeLoggedIn.email,
                username:userToBeLoggedIn.username
            })
        })
        .catch(error=>{
            res.json({
                error:error.message,
                message:"error occured",
                code:CUSTOM_ERROR_CODE
            })
        })
}



