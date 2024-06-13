const express=require("express");
const Router=express.Router();
const multer=require("multer");
const upload = multer({ dest: 'uploads/' });
const {fetchvidoes}=require("../controller/handler1");
const {uplaodvideo}=require("../controller/handler1")
Router.get("/fetch-videos",fetchvidoes)
Router.post("/upload-video",upload.single('video'),uplaodvideo);
module.exports={Router}