const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Visit} = require('./../models/visit');
const {User} = require('./../models/user');

const {users, populateUsers} = require('./../tests/seed/seed');

beforeEach(populateUsers);

describe('POST /user/:userId/visits/', () => {

    it('should create a new visit for a user', (done) => {

        var userId = users[0]._id.toHexString();  
        var city = 'Birmingham';
        var state = 'AL';

        request(app)
            .post(`/user/${userId}/visits`)
            .send({userId, city, state})
            .expect(200)
            .expect((res) => {
                expect(res.body.visit.city).toBe(city);
                expect(res.body.visit.state).toBe(state);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(userId).then((user) => {
                    expect(user.visits.length).toBe(3);
                    expect(user.visits[2].city).toBe(city);
                    expect(user.visits[2].state).toBe(state);
                    done();
                }).catch((e) => done(e));
            });

    });

});

describe('POST /user/:userId/visits/:visitId', () => {
    
    it('should delete an existing visit for a user', (done) => {

        var userId = users[0]._id.toHexString(); 
        var visitId = users[0].visits[0]._id.toHexString();

        request(app)
            .delete(`/user/${userId}/visits/${visitId}`)
            .send({userId, visitId})
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findById(userId).then((user) => {
                    expect(user.visits.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            })
    });

});

describe('POST /user/:userId/visits/:visitId', () => {
    
    it('should delete an existing visit for a user', (done) => {

        var userId = users[0]._id.toHexString(); 
        var visitId = users[0].visits[0]._id.toHexString();

        request(app)
            .delete(`/user/${userId}/visits/${visitId}`)
            .send({userId, visitId})
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findById(userId).then((user) => {
                    expect(user.visits.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            })
    });

});

describe('GET /user/:userId/visits', () => {
    
    it('should return a list of cities the user has visited', (done) => {

        var userId = users[0]._id.toHexString(); 

        request(app)
            .get(`/user/${userId}/visits`)
            .send({userId})
            .expect(200)
            .expect((res) => {
                expect(res.body.visits.length).toBe(2);
            })
            .end(done);
    });

});

describe('GET /user/:userId/visits/states', () => {
    
    it('should return an array of one state the user has visited when two visits have the same state', (done) => {

        var userId = users[0]._id.toHexString(); 

        request(app)
            .get(`/user/${userId}/visits/states`)
            .send({userId})
            .expect(200)
            .expect((res) => {
                expect(res.body.states.length).toBe(1);
                expect(res.body.states[0]).toBe('PA');
            })
            .end(done);
    });

    it('should return an array of two states the user has visited when two visits have different states', (done) => {

        var userId = users[1]._id.toHexString(); 

        request(app)
            .get(`/user/${userId}/visits/states`)
            .send({userId})
            .expect(200)
            .expect((res) => {
                expect(res.body.states.length).toBe(2);
                expect(res.body.states[0]).toBe('CA');
                expect(res.body.states[1]).toBe('TN');
            })
            .end(done);
    });

});

describe('GET /user/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/user/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
  
    it('should return 401 if not authenticated', (done) => {
      request(app)
        .get('/user/me')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });
});
  
describe('POST /user', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';
        var firstName = "Sandy"
        var lastName = "Rollins";


        request(app)
        .post('/user')
        .send({firstName, lastName, email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
            //expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if (err) {
            return done(err);
            }

            User.findOne({email}).then((user) => {
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
            }).catch((e) => done(e));
        });
    });
  
    it('should return validation errors if request invalid', (done) => {
      request(app)
        .post('/user')
        .send({
          email: 'and',
          password: '123'
        })
        .expect(400)
        .end(done);
    });
  
    it('should not create user if email in use', (done) => {
      request(app)
        .post('/user')
        .send({
          email: users[0].email,
          password: 'Password123!'
        })
        .expect(400)
        .end(done);
    });
});
  
describe('POST /user/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
        .post('/user/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
        })
        .end((err, res) => {
            if (err) {
            return done(err);
            }

            User.findById(users[1]._id).then((user) => {
            expect(user.tokens[1].access).toEqual('auth');
            expect(user.tokens[1].token).toEqual(res.headers['x-auth']);
            done();
            }).catch((e) => done(e));
        });
    });

    it('should reject invalid login', (done) => {
        request(app)
        .post('/user/login')
        .send({
            email: users[1].email,
            password: users[1].password + '1'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).not.toBeTruthy();
        })
        .end((err, res) => {
            if (err) {
            return done(err);
            }

            User.findById(users[1]._id).then((user) => {
            expect(user.tokens.length).toBe(1);
            done();
            }).catch((e) => done(e));
        });
    });
});
  
describe('DELETE /user/me/token', () => {
    it('should remove auth token on logout', (done) => {
      request(app)
        .delete('/user/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
});