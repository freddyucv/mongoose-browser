/*globals it, describe, Song, chai, beforeEach*/
var assert = chai.assert;

//TODO: Incluir una bsuqueda

describe('Finding By ID object: ', function() {
    it('findById method', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'Cancion 1';
      song.duration = 130;

      song.save(function(err, song){
        Song.findById(song.id, function(err, doc){

          if (!err){

            assert.equal( true, Object.prototype.toString.call( doc ) === '[object Object]' );
            assert.equal( 'cancion 1', song.name );
            assert.equal( 130, song.duration );
            done();
          }
        });
      });
    });
});
