require('./../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var {Job} = require('./../models/job');
var {authenticate} = require('./../middleware/authenticate');

var router = express.Router();

router.post('/', (req, res) => {
    
    //console.log(req); 

    var body = _.pick(req.body, ['position', 
                                 'locationCity', 
                                 'locationState', 
                                 'company',
                                 'type',
                                 'payRate',
                                 'payPeriod',
                                 'description']);

    body.datePosted = new Date();
    body._creator = new ObjectID(); // req.user._id;

    console.log(body); 

    var job = new Job(body);

    job.save().then((doc) => {
        res.status(200).send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.get('/', (req, res) => {
    Job.find({})
    .then((jobs) => {
        if (!jobs) { return res.status(404).send({ error: 'No jobs found.' }); }
        return res.status(200).send( jobs );
    }, (e) => {
        return res.status(500).send({ error: 'Internal error.' });
    });
});

router.get('/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Job.findOne({"_id": id})
    .then((job) => {
        if (!job) { return res.status(404).send({ error: 'No jobs found.' }); }
        return res.send( job );
    }, (e) => {
        return res.status(500).send({ error: 'Internal error.' });
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Job.findOneAndRemove({
        _id: id//,
        //_creator: req.user._id
    }).then((job) => {
        if (!job) {
        return res.status(404).send();
        }
    
        res.send({job});
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['position', 
                                 'locationCity', 
                                 'locationState', 
                                 'company',
                                 'type',
                                 'payRate',
                                 'payPeriod',
                                 'description']);
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Job.findOneAndUpdate({
        _id: id, 
    //    _creator: req.user._id
    }, {$set: body}, {new: true}).then((job) => {
        if (!job) {
        return res.status(404).send();
        }
    
        res.send({job});
    }).catch((e) => {
        res.status(400).send();
    })
});

module.exports = router;