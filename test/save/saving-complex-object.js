/*globals it, describe, Artist, Song, chai, beforeEach*/
var assert = chai.assert;

//TODO: Incluir una bsuqueda/ probar con el populate

describe('Saving a complex object: ', function() {
    it('Saving reference', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 21;
      artist.nationality = 'Venezolano';
      artist.phone = '201-555-0123';
      artist.email = 'a@a.com';

      var song = new Song();
      song.name = 'CANCION';
      song.duration = 130;

      artist.songs.push(song);

      artist.save().then(function(){
        console.log(artist.songs);
        done();
      });
    });
});
