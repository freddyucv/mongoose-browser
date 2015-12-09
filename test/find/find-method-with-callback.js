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

    it('find method with querys', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'find method with querys';
      song.duration = 130;

      song.save(function(err, song){
        Song.find( { name: 'find method with querys' }, function(err, docs){

          if (!err){
            assert.equal( true, Object.prototype.toString.call( docs ) === '[object Array]' );
            assert.equal( 1, docs.length );

            var findMethodResult = docs[0];
            assert.equal( 'find method with querys', findMethodResult.name );
            assert.equal( 130, findMethodResult.duration );
            assert.equal( song.id, findMethodResult._id );
            done();
          }
        });
      });
    });

    it('find method with fields', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'AAAAAAAA';
      song.duration = 130;

      song.save(function(){

        Song.find( { }, 'name', function(err, docs){

          if (!err){
            assert.equal( true, Object.prototype.toString.call( docs ) === '[object Array]' );

            for (var i = 0; i < docs.length; i++){
              for(var propt in docs[ i ]){
                assert.equal( true, propt === 'name' || propt === '_id');
              }
            }

            done();
          }
        });
      });
    });
});
