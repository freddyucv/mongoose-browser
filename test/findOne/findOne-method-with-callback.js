/*globals it, describe, Song, chai, beforeEach*/
var assert = chai.assert;

describe('Finding one object: ', function() {
    it('findOne method', function(done) {
      this.timeout(10000);
      Song.findOne(function(err, doc){
        if (!err){
          assert.equal( true, Object.prototype.toString.call( doc ) === '[object Object]' );
          done();
        }
      });
    });
});
