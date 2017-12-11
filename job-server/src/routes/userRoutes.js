require('./../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');

var router = express.Router();

router.post('/', (req, res) => {
    
    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
    
    
    body.dateAdded = '2017-03-12';
    body.dateTimeAdded = '2017-03-12';
    body.lastUpdated = '2017-03-12';

    //console.log(body); 


    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});
    
router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});
    
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});
    
router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

module.exports = router;