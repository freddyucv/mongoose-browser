module.exports = function (fileFullPath){
  var splits = fileFullPath.split('/');
  var fileName = splits[splits.length - 1];
  var modelName =  fileName.split('_')[0];
  return modelName.charAt(0).toUpperCase() + modelName.substring(1);
}
