commands = {
  sendCommands: function(object, commands){
    var data = {};
    data.model = object.className;
    data.object = object.doc._doc;
    data.object.id = data.object._id.id;
    delete data.object._id;
    data.commands = commands;

    return $.ajax({
      url: 'sendCommand',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    });
  },

  sendCommand: function(object, command, parameters){
    return this.sendCommands(object, [ {command: command, parameters: parameters} ]);
  }

}
