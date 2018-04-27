var expect = require('chai').expect;
var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../../models/Users');

describe('user', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/postnews_test', done);
    User.findOne({ 'username': 'postuser' }).remove().exec();
  });

  it('should be invalid if username is empty', function(done) {
    var user = new User();

    user.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should converts username string to lowercase', function() {
    var user = new User({username: 'POSTUSER'});

    expect(user.username).to.equal('postuser');
  });

  it('username should be unique', function(done) {
    var user = new User({username: 'postuser'});
    var promise = user.save();

    promise.then(function() {
      // Try saving a duplicate user
      new User({username: 'postuser'}).save().catch(function(err) {
        console.log('here');
          expect(err.errors.username.message).to.equal('Error, expected `username` to be unique. Value: `postuser`');
          done();
      });
    });
    promise.catch(done);
  });

  it('should set crypto password', function() {
    var user = new User({username: 'postuser'});
    user.setPassword('test123');

    /* TODO: maybe test with mock if calls randomBytes */

    var hash = crypto.pbkdf2Sync('test123', user.salt, 1000, 64).toString('hex');

    expect(user.hash).to.equal(hash);
  });

  it('validPassword should return false', function() {
    var user = new User({username: 'postuser'});
    user.setPassword('test123');

    expect(user.validPassword('123test')).to.be.false;
  });

  it('validPassword should return true', function() {
    var user = new User({username: 'postuser'});
    user.setPassword('test123');

    expect(user.validPassword('test123')).to.be.true;
  });

  it('should generate JWT', function() {
    var user = new User({username: 'postuser'});
    user.setPassword('test123');

    console.log(user.generateJWT());
  });
});
