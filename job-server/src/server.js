require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

// Add headers
app.use(function (req, res, next) {
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

var jobRouter = require('./routes/jobRoutes');
var userRouter = require('./routes/userRoutes');

//app.use('/state', stateRouter);
app.use('/jobs', jobRouter);
app.use('/users', userRouter);



app.get('/', (req, res) => {
    res.status(200).send("<h1>Classifieds API</h1>");
});

app.listen(3000, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};