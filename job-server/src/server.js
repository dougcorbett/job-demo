require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT;

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