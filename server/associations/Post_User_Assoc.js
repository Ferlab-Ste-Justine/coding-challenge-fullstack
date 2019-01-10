const User = require("../models/User");
const Post = require("../models/Post");


exports.associate=()=>{
    User.hasMany(Post);
    Post.belongsTo(User)
}