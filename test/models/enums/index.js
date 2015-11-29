//var requireDir = require('require-dir');
//var enums = requireDir('./');

//TODO: Cargar con plugin de gulp
//delete enums['index'];
var toExports = {};

toExports.COUNTRIES = {
  values: require('./countries'),
  message: 'Valor no valido'
};

toExports.GENRES = {
  values: require('./genres'),
  message: 'Valor no valido'
};

/*var toExports = {};

for (var enumName in enums) {
  toExports[enumName.toUpperCase()] = enums[enumName];
}*/

module.exports = toExports;
