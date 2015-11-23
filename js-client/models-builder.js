(
  function(){
    var models = require('models');

    var get_docIfexists = function (value)  {
      if($.isArray(value)) {

        var v = value.map(function(item){
          return item.doc && item.doc._doc  ? item.doc._doc : item;
        });


        return v;
      }else{
        return value.doc && value.doc._doc  ? value.doc._doc : value;
      }
    }

    var getterFunction = 'function defaultGetter{0}(){' +
      'return this.doc["{1}"];' +
    '}';

    var setterFunction = 'function defaultSetter{0}(value){' +
      'value = get_docIfexists(value);' +
      'this.doc["{1}"] = value;' +
    '}';

    var callGetterFunction = 'defaultGetter{0}';
    var callSetterFunction = 'defaultSetter{0}';

    function resolveTemplate(name, property, template){
      return template.replace('{0}', name).replace('{1}', property);
    }

    console.log('creating models...');

    for (var name in models) {
      console.log(`creating model ${name}`);
      //Create Model
      var className = name.charAt(0).toUpperCase() + name.substring(1);

      this[className] = function(){
        this.doc = new mongoose.Document({}, models[this.model] );
      }

      this[className].prototype.model = name;
      this[className].prototype.className = className;
      this[className].prototype.schema = models[name];

      for (property in models[name].paths){
        name = property + className;
        eval(resolveTemplate(name, property, getterFunction)),
        eval(resolveTemplate(name, property, setterFunction))

        Object.defineProperty(this[className].prototype, property, {
          get: eval(resolveTemplate(name, property, callGetterFunction)),
          set: eval(resolveTemplate(name, property, callSetterFunction))
        });
      }

      //Save Method
      this[className].prototype.save = function (){
        var _ = this;
        console.log(`saving ${this}`);
        return new Promise(function(resolve, reject){
          commands.sendCommand(_, 'save').
            done(function(data){
              _.id = data._id;
              console.log(`saved id: ${_.id}`);
              resolve(data);
            }).
            fail(reject);
        });
      }

      /*this[className].prototype.find = function (){
        commands.sendCommand(this, 'save');
      }*/

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
