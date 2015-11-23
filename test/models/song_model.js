var Schema = require('mongoose').Schema;

function toLower (v) {
  return v.toLowerCase();
}

module.exports = new Schema({
    name  : { type: String, required:true , set: toLower}
});
