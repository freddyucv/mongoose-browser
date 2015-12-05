commands = {
  /*object, commands, successFunction, errorFunction, cb*/
  sendCommands: function(opts){
    var object = opts.object;
    var commands = opts.commands;
    var successFunction = opts.successFunction;
    var errorFunction = opts.errorFunction;
    var cb = opts.cb;

    var data = {};
    data.model = object.className;
    data.object = object.doc._doc;
    data.object.id = data.object._id.id;
    delete data.object._id;
    data.commands = commands;

    $.ajax({
      url: 'sendCommand',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    }).
      then(function(data){
        if (successFunction){
          successFunction(data);
        }else{
          cb(data);
        }
      },
      function(err){
        if (errorFunction){
          errorFunction(err);
        }else{
          cb(err);
        }
      });
  },

  /*object, command, parameters,uccessFunction, errorFunction, cb*/
  sendCommand: function(opts){
    var command = opts.command;
    opts.commands =  [ {command: command, parameters: opts.parameters} ];
    return this.sendCommands(opts );
  }

};
