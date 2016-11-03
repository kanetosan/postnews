var expect = require('chai').expect;

var User = require('../../models/Users');

describe('user', function() {
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
});
