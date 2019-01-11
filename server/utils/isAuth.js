
const jwt = require("jsonwebtoken");

const SECRET_CODE = require("../utils/constants");

module.exports=(req,res,next)=>{
    console.log(req.get("token"));
    const token = req.get("token");
    let decodedToken;
    try{
        decodedToken= jwt.verify(token,SECRET_CODE);
    }catch(err){
        err.statusCode=500;
        throw err;
    }

    //the user is not authenticated 
    // throw an error 
    if(!decodedToken){
        const error = new Error("Not authenticated");
        error.statusCode=401;
        throw error;
    }

    // the user is indeed authenticated 
    req.userId = decodedToken.id;
    next(); // on to the next middleware 
}