var Schema = require('mongoose').Schema;
var enums = require('./enums');
var Song = require('./song');
console.log(enums.COUNTRIES);

function toLower (v) {
  return v.toLowerCase();
}

var artistSchema = new Schema({
    name       : { type: String, required: true, set: toLower },
    age         : Number,
    nationality : { type: String, enum: enums.COUNTRIES },
    songs       : [ { type: Schema.ObjectId, ref: 'Song' } ]
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
