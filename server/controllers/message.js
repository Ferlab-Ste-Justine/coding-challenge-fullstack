const socket= require("../utils/socket");
const User = require("../models/User");
const Posts = require("../models/Post");

// this is supposed to be a private route 
exports.create = (req,res,next)=>{
    const userId = req.userId;
    //getting the post content
    const content = req.body.content;
    let creator;
    //finding the user 
    return User
            .findById(userId)
            .then(user=>{
                creator=user;
                return user.createPost({
                    content:content
                });
            })
            .then(createdPost=>{
                const io = socket.getIo();
                if(io){
                    io.emit("create",{
                        action:"create",
                        post:{
                            id:createdPost.id,
                            content:createdPost.content,
                            username:creator.username
                        }
                    });
                }
                res.status(201).json({
                    message:"post created succesfully",
                    post:{
                        id:createdPost.id,
                        content:createdPost.content,
                        username:creator.username
                    }
                });
            })
            .catch(err=>{
                console.log(err);
               res.status(401).json({
                    message:'an error occured',
                    error:err.message
               })
            });

   
}


exports.getPosts=(req,res,next)=>{
    return Posts
            .findAll({include:["user"]})
            .then(posts=>{
                res.status(200).json({
                    posts:posts.map(post=>{
                        return {
                            id:post.id,
                            content:post.content,
                            username:post.user.username
                        }
                    })
                })
            })
            .catch(error=>{
                console.log(error);
                res.status(401).json({
                    message:"couldn't get the posts",
                    error:err.message
                })
            })
}

exports.edit= async(req,res,next)=>{
    console.log("editing ");
    postId = req.params.postId;
    newContent = req.body.content;
    try{
         // getting the post 
        const post=  await Posts.findById(postId);
        if(post){
            post.content=newContent;
            const updatedPost = await post.save();
            res.status(201).json({
                message:"the post was succesfully updated",
                post:updatedPost
            })
       }else{
           // the post wasn't found
           //throw an error 
           throw new Error("the id isn't valide");
       }

    }catch(error){
        res.status(400).json({
            message:"couldn't edit the post",
            error:error.message
        })       
    }
   



}