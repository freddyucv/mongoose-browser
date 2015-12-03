/*globals it, describe, Artist, Song, chai, beforeEach*/
var assert = chai.assert;

describe('Validation: ', function() {
  //TODO: Incluir una bsuqueda
  it('valid artist', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 21;
      artist.nationality = 'Venezolano';
      artist.phone = '201-555-0123';
      artist.email = 'a@a.com';

      artist.save().then(function(){
        done();
      });
  });

  it('field required', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.age = 23;
      artist.nationality = 'Venezolano';

      artist.save().then(function(){

      },
      function(e){
        var errorMessage = e.errors.name.message;
        assert.equal( errorMessage, 'name is required!');
        done();
      });
  });

  it('min invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 17;
      artist.nationality = 'Venezolano';

      artist.save().then(function(){

      },
      function(e){
        var errorMessage = e.errors.age.message;
        assert.equal( errorMessage, 'Path `age` (17) is less than minimum allowed value (18).');
        done();
      });
  });

  it('max invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 201;
      artist.nationality = 'Venezolano';

      artist.save().then(function(){

      },
      function(e){
        var errorMessage = e.errors.age.message;
        assert.equal( errorMessage, 'Path `age` (201) is more than maximum allowed value (200).');
        done();
      });
  });

  it('minlength invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'A';
      artist.age = 21;
      artist.nationality = 'Venezolano';

      artist.save().then(function(){

      },
      function(e){
        var errorMessage = e.errors.name.message;
        assert.equal( errorMessage, 'Path `name` (`a`) is shorter than the minimum allowed length (6).');
        done();
      });
  });

  it('maxlength invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'qwertyuioplkjhgfdsazx';
      artist.age = 21;
      artist.nationality = 'Venezolano';

      artist.save().then(function(){

      },
      function(e){
        var errorMessage = e.errors.name.message;
        assert.equal( errorMessage, 'Path `name` (`qwertyuioplkjhgfdsazx`) is longer than the maximum allowed length (20).');
        done();
      });
  });

  it('match invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 21;
      artist.nationality = 'Venezolano';
      artist.email = 'a';

      artist.save().then(function(){
      },
      function(e){
        var errorMessage = e.errors.email.message;
        assert.equal( errorMessage, 'email invalid');
        done();
      });
  });

  it('custom validator invalid value', function(done) {
      this.timeout(10000);
      var artist = new Artist();
      artist.name = 'Artist';
      artist.age = 21;
      artist.nationality = 'Venezolano';
      artist.phone = '123-123-123';

      artist.save().then(function(){
      },
      function(e){
        var errorMessage = e.errors.phone.message;
        assert.equal( errorMessage, '123-123-123 is not a valid phone number!');
        done();
      });
  });

});
