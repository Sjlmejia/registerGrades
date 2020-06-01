const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const studentsRoutes = require("./routes/students");

const app = express();
mongoose.connect('mongodb://localhost:27017/studentsDB', {useNewUrlParser: true})
 .then(() => {
   console.log('se conecto');
 })
 .catch((res) => {
  console.log('No se conecto', res);
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

app.use('/api/students', studentsRoutes);
module.exports = app;
