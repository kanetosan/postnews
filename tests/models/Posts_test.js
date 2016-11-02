var expect = require('chai').expect;

var Post = require('../../models/Posts');

describe('post', function() {
  it('should be invalid if title is empty', function(done) {
    var post = new Post();

    post.validate(function(err) {
      expect(err.errors.title).to.exist;
      done();
    });
  });
});
