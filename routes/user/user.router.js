const {
    createUser,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    login,
    updateProfile
} = require("../../controller/user.controller");
const express = require("express");
const router = require("express").Router();
var bodyParser = require('body-parser');

//parse request of content type:= application/form
var urlencoderParser = bodyParser.urlencoded({extended:false});
router.use(bodyParser.json());

const {checkToken} = require("../../auth/token_validation");

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
router.post("/",  createUser);
router.get("/",checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/",  checkToken,updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);
router.patch('/user',checkToken,upload.single('profile'),updateProfile);
module.exports = router;