/*globals it, describe, Song, chai, beforeEach*/
var assert = chai.assert;

describe('Saving a simple object: ', function() {
    var Song;

    beforeEach(function() {
      var mongoose = require('mongoose');
      var songSchema = require('../models/song_model');

      mongoose.connect('mongodb://freddyucv:leones2009@ds051923.mongolab.com:51923/musci_example');
      Song = mongoose.model('Song', songSchema);
    });

    it('Check id', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'Cancion 1';

      assert.isUndefined(song.id, 'song id has been defined');

      song.save().then(function(){
        assert.isDefined(song.id, 'song is not has been defined');
        done();
      });
    });

    it('check set method', function(done) {
      this.timeout(10000);
      var song = new Song();
      song.name = 'CANCION';

      song.save().then(function(){
        Song.findOne({ id: song.id }, function(err, songDB){
          assert.equal( songDB.name, 'cancion');
          done();
        });

      });
    });
});
