/*globals it, describe, Song, chai, beforeEach*/
var assert = chai.assert;

describe('Finding object: ', function() {
    it('find method', function(done) {
      this.timeout(10000);
      Song.find(function(err, docs){

        if (!err){
          assert.equal( true, Object.prototype.toString.call( docs ) === '[object Array]' );
          done();
        }
      });
    });
});
