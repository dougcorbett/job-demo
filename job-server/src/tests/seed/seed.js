const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

//const {City} = require('./../../models/city');
//const {State} = require('./../../models/state');
const {User} = require('./../../models/user');
//const {Visit} = require('./../../models/visit');

const userOneId = new ObjectID();
// const userOneIdVisitOneId = new ObjectID();
// const userOneIdVisitTwoId = new ObjectID();

const userTwoId = new ObjectID();
// const userTwoIdVisitOneId = new ObjectID();
// const userTwoIdVisitTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  firstName: 'Tom',
  lastName: 'Selleck',
  // visits : [ 
  //   { _id: userOneIdVisitOneId, city: 'Pittsburgh', state: 'PA'}, 
  //   { _id: userOneIdVisitTwoId, city: 'Philadelphia', state: 'PA'} 
  // ],
  email: 'tom@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }],
  dateAdded: '2017-01-01',
  dateTimeAdded: '2017-01-01',
  lastUpdated: '2017-01-01'
}, {
  _id: userTwoId,
  firstName: 'Sam',
  lastName: 'Spade',
  // visits : [ 
  //   { _id: userTwoIdVisitOneId, city: 'Nashville', state: 'TN'}, 
  //   { _id: userTwoIdVisitTwoId, city: 'San Diego', state: 'CA'} 
  // ],
  email: 'sam@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }],
  dateAdded: '2017-02-14',
  dateTimeAdded: '2017-02-14',
  lastUpdated: '2017-02-14'
}];

// state and city collections don't change through existing api calls
// so we won't need to seed them right now programmatically. 

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {users, populateUsers};
