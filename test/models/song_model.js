var Schema = require('mongoose').Schema;
var enums = require('./enums');

function toLower (v) {
  return v.toLowerCase();
}

module.exports = new Schema({
    name  : { type: String, required:true , set: toLower},
    duration: { type: Number, required: true, get: function(value){
      var minutes = parseInt(value / 60);
      var seconds = value - ( minutes * 60 );
      return minutes + ':' + seconds;
    }},
    genre:  { type: String, enum: ['Alternative Rock', 'Punk', 'Blues', 'Jazz', 'Opera', 'Latin Music'] }
});
