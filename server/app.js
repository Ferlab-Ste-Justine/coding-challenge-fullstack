
const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const database = require("./utils/database");
const associations=require("./associations/Post_User_Assoc");
const adminRoutes = require("./routes/adminRoutes"); 

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"static")));

app.use((req,res,next)=>{
    next();
});
app.use("/admin",adminRoutes);

associations.associate();

database
    //.sync({force:true})
    .sync()
    .then(response=>{
        app.listen(8080,()=>console.log("listening on port 8080"));
    })
    .catch(error=>console.log(error));

