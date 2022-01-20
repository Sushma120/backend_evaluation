const express = require('express');
const bodyparse = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('./config/mongodb');
const config = require('./config/config');
const swaggerUI=require("swagger-ui-express");
swaggerDocument=require('./api/swagger/swagger.json');


const app = express();





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));

require("./config/loader")(app, mongoose);

app.listen(config.port, () => {
     console.log('Express server started at port : 3000');
 });