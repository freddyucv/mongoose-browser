/*globals it, describe, Song, chai, beforeEach*/
var assert = chai.assert;

//TODO: Incluir una bsuqueda

describe('Saving a simple object: ', function() {
    it('Check id', function(done) {
      this.timeout(10000);

      var song = new Song();
      song.name = 'Cancion 1';
      song.duration = 130;

      assert.isUndefined(song.id, 'song id has been defined');

      song.save(function(err){

        if (err){
            return;
        }

        assert.isDefined(song.id, 'song is not has been defined');
        done();
      });
    });

    it('check set and get methods', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'CANCION';
      song.duration = 130;

      //TODO: make findOne here to check database value
      song.save(function(err){

        if (err){
            return;
        }

        assert.equal( song.name, 'cancion');
        assert.equal( song.duration, '2:10');
        done();
      });
    });

    it('saving enum value', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'Cancion';
      song.duration = 130;
      song.genre = 'Jazz';

      song.save(function(err){

        if (err){
            return;
        }

        assert.isDefined(song.id, 'song is not has been defined');

        done();
      });
    });

    it('enum validation fail', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'Cancion';
      song.duration = 130;
      song.genre = 'not valid';

      song.save(function(e){
        var errorMessage = e.errors.genre.message;
        assert.equal( '`not valid` is not a valid enum value for path `genre`.',
          errorMessage);
        done();
      });
    });

});
