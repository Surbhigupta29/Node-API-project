const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
const updateInformationRoutes = require('./api/routes/updateinformation');
const getInformationRoutes = require('./api/routes/getInformation');
const file2JsonRoutes = require('./api/routes/file2Json'); 

mongoose.connect('mongodb+srv://supergirl:supergirl@cluster0-l8lp3.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
); 

//handling JSON Validation and url encodingMongo_Atlas_pass
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use ('/user',userRoutes);
app.use('/updateInformation',updateInformationRoutes);
app.use('/getInformation',getInformationRoutes);
app.use('/csvtoJSON',file2JsonRoutes);

module.exports = app;   
