var Schema = require('mongoose').Schema;
var enums = require('./enums');
var Song = require('./song_model');
console.log(enums.COUNTRIES);

function toLower (v) {
  return v.toLowerCase();
}

var artistSchema = new Schema({
    name       : { type: String,
                    required: '{PATH} is required!',
                    maxlength:20,
                    minlength:6,
                    set: toLower },
    age         : { type: Number, min: 18, max:200},
    nationality : { type: String, enum: enums.COUNTRIES },
    email: {type: String, match: [/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
                                  'email invalid']},
    phone: { type: String,
      validate: {
        validator: function(v) {
          return /d{3}-d{3}-d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
      }
    }                                  /*,
    songs       : [ { type: Schema.ObjectId, ref: 'Song' } ]*/
});

artistSchema.virtual('withAge').get(function () {
  return this.name + ' ' + this.age;
});

/*artistSchema.pre('save', function (next) {
    console.log('PRE SAVE');
});

artistSchema.pre('remove', function (next) {
    console.log('PRE REMOVE');
});

artistSchema.post('remove', function (next) {
    console.log('POSt REMOVE');
});*/

//console.log(artistSchema.callQueue);

module.exports = artistSchema;
