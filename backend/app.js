const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const colors = require('colors');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb://bolorundurovb:eberenus93@ds159845.mlab.com:59845/mean-post")
.then(() =>{
  console.log("Connected to database".blue.bgWhite);
})
.catch(() =>{
  console.log("Failed to connect to database".red.bgWhite);
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  res.setHeader("Access-Control-Allow-Methods",
   "GET, POST, PATCH, DELETE, PUT, OPTIONS");

  next();
});

app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);


module.exports = app;
