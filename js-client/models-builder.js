/*globals commands*/
(
  function(){
    var models = require('models');

    var getDocIfexists = function (value)  {
      if($.isArray(value)) {

        var v = value.map(function(item){
          return item.doc && item.doc._doc  ? item.doc._doc : item;
        });


        return v;
      }else{
        return value.doc && value.doc._doc  ? value.doc._doc : value;
      }
    }

    function getParameters(args){
      var parameters = [];
      var i = 0;
      while(args[i]){

        if (Object.prototype.toString.call( args[i] ) !== '[object Function]'){
          parameters.push(args[i]);
        }

        i++;
      }
      return parameters;
    }

    var getterFunction = 'function defaultGetter{0}(){' +
      'return this.doc["{1}"];' +
    '}';

    var setterFunction = 'function defaultSetter{0}(value){' +
      'value = getDocIfexists(value);' +
      'this.doc["{1}"] = value;' +
    '}';

    var callGetterFunction = 'defaultGetter{0}';
    var callSetterFunction = 'defaultSetter{0}';

    function resolveTemplate(name, property, template){
      return template.replace('{0}', name).replace('{1}', property);
    }

    function callFindMethod(methodName, args){
      var argumentsLenght = args.length;
      var lastArguments = args[ argumentsLenght - 1 ];

      if ( typeof lastArguments === 'function' ){
        console.log(`${methodName} ${args}`);
        var parameters = getParameters(args);

        commands.sendCommand({
            model: className,
            command: methodName,
            parameters: parameters,
            cb: lastArguments
        });
      }
    }

    console.log('creating models...');

    for (var name in models) {
      console.log(`creating model ${name}`);
      //Create Model
      var className = name.charAt(0).toUpperCase() + name.substring(1);

      this[className] = function(){
        this.doc = new mongoose.Document({}, models[this.model] );
      };

      this[className].prototype.model = name;
      this[className].prototype.className = className;
      this[className].prototype.schema = models[name];

      for (var property in models[name].paths){
        name = property + className;
        eval(resolveTemplate(name, property, getterFunction));
        eval(resolveTemplate(name, property, setterFunction));

        Object.defineProperty(this[className].prototype, property, {
          get: eval(resolveTemplate(name, property, callGetterFunction)),
          set: eval(resolveTemplate(name, property, callSetterFunction))
        });
      }

      //Save Method
      this[className].prototype.save = function (cb){

        console.log(`saving ${this}`);

        commands.sendCommand({
            object: this,
            command: 'save',
            successFunction:function(data){
              data.id = data._id;
              console.log(`saved id: ${data.id}`);
              cb(null, data);
            },
            cb: cb
        });
      };

      //find Methods
      this[ className ].find = function (){
          callFindMethod('find', arguments);
      };

      this[ className ].findOne = function (){
          callFindMethod('findOne', arguments);
      };

      this[ className ].findById = function (){
          callFindMethod('findById', arguments);
      };
      //this[className].prototype.findOne =
      //this[className].prototype.findBy =
      //this[className].prototype.count =
      //this[className].prototype.remove =
      //this[className].prototype.update =
      //pre y post
      //virtuals
      //query
      // Trabajar fuertemente las relaciones
      //Probar guardando datos bytes
      //Concurrencia

      console.log(`created model ${name}`);
    }
}());
