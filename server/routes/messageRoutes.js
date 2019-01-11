const express = require("express");
const messageController = require("../controllers/message");
const isAuth = require("../utils/isAuth");

const router = express.Router();

// /post/create => POST
router.post("/create",isAuth,messageController.create);

//post/getAll =>GET
router.get("/getAll",messageController.getPosts);

module.exports=router;