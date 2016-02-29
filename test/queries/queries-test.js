/*globals it, describe, Song, chai, beforeEach, Query, before*/
var assert = chai.assert;

describe('Queries: ', function() {
    this.timeout(10000);

    before(function(done) {
      var count = 0;
      var wait = () => {
        count++;

        if (count === 3) {
          console.log('before');
          done();
        }else{
          wait();
        }
      };

      var saveCB = () => {count++};

      var song1 = new Song();
      song1.name = 'query 1';
      song1.duration = 130;

      var song2 = new Song();
      song2.name = 'query 2';
      song2.duration = 100;

      var song3 = new Song();
      song3.name = 'query 3';
      song3.duration = 70;

      song3.save(saveCB);
      song1.save(saveCB);
      song2.save(saveCB);

      wait();
    });

    it('find method with query', function() {
      console.log('test');
      var query = Song.find();
      assert.equal(true, query instanceof Query);
    });

    it('select method', function() {
      var query = Song.find( { name: 'find method with querys' } );
      query.select('duration');

      query.exec(function (err, songs) {
        assert.equal(3, songs.size());
        songs.forEach((song) => {
          assert.isUndefined(song.name);
          assert.isDefined(song.duration);
          assert.isTrue( song.duration === 130 ||
            song.duration === 100 ||
            song.duration === 70);
        });

      });
    });

    it('sort (1) method', function() {
      var query = Song.find();
      query.sort(1);

      query.exec(function (err, songs) {
        assert.equal(3, songs.size());
        songs.forEach((song, index) => {
          if (index === 0){
            assert.equal(song.duraction, 130);
          }else if (index === 1){
            assert.equal(song.duraction, 100);
          }else{
            assert.equal(song.duraction, 70);
          }
        });

      });
    });

    it('sort (-1) method', function() {
      var query = Song.find();
      query.sort(-1);

      query.exec(function (err, songs) {
        assert.equal(3, songs.size());
        songs.forEach((song, index) => {
          if (index === 0){
            assert.equal(song.duraction, 70);
          }else if (index === 1){
            assert.equal(song.duraction, 100);
          }else{
            assert.equal(song.duraction, 130);
          }
        });

      });
    });

    it('limit method', function() {
      var query = Song.find();
      query.sort(1)
        .limit(2);

      query.exec(function (err, songs) {
        assert.equal(2, songs.size());
        songs.forEach((song, index) => {
          if (index === 0){
            assert.equal(song.duraction, 130);
          }else if (index === 1){
            assert.equal(song.duraction, 100);
          }
        });

      });
    });

});
