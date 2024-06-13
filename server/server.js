const express=require("express");
const app=express();
const { connect } = require("./config/connect");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const {Router}=require("./routes/routes");
app.use(express.urlencoded({ extended: false }));
app.use("/api",Router);
require("dotenv").config();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const start = () => {
    const url = process.env.url;
    if (!url) {
        console.error("MongoDB URL is not defined in the environment variables.");
        return;
    }
    connect(url);
    app.listen(8000, () => {
      console.log(url);
      console.log("Consoled");
    });
  };
  start();