require('dotenv').config();
const mongoDB = require('./config/db')
const express = require('express')
const todoRoutes = require('./routes/todoRoutes');
const app = express();

mongoDB();


app.use('/',todoRoutes);



module.exports = app