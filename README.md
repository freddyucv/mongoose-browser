browserify -r ./models/index.js:models > bundle.js


browserify -r ./test.js:test > bundle.js




browserify -r ./dist/models.js:models > dist/models-client.js


browserify -r ./dist/models.js > dist/models-client.js



##TO COMPILE

*  sudo npm install -g bower
* npm install