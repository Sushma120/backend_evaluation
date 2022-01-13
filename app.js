const express = require('express');
const bodyparse = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('./config/mongodb');
const config = require('./config/config');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/loader")(app, mongoose);

app.listen(config.port, () => {
     console.log('Express server started at port : 3000');
 });