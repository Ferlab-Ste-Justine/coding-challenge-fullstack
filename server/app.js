
const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const database = require("./utils/database");
const associations=require("./associations/Post_User_Assoc");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes"); 
const io= require("./utils/socket");
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"static")));

app.use((req,res,next)=>{
    next();
});
app.use("/admin",adminRoutes);
app.use("/post",messageRoutes);

associations.associate();




database
    //.sync({force:true})
    .sync()
    .then(response=>{
        const server=app.listen(8080,()=>console.log("listening on port 8080"));
        const ioSocket= io.init(server);
        manageSockets(ioSocket);
    })
    .catch(error=>console.log(error));

manageSockets=(io)=>{
    io.on("connection",(socket)=>{
        console.log("connection ");
       
       })
       
}