const express = require("express");
const adminController = require("../controllers/auth");

const router = express.Router();

// /admin/signup => POST
router.post("/signup",adminController.signUp);
// /admin/login =>POST
router.post("/login",adminController.login);


module.exports=router;