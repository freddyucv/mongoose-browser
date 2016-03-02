var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
//var watch = require('gulp-watch');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

var clientFile = 'js-client/*.js';
var serverFile = ['lib/*/*.js', 'lib/*.js'];
var testFile = 'test/**/*';

gulp.task('dist', function() {

  gulp.src( 'package.json' ).pipe(gulp.dest( 'dist' ));

  gulp.src( clientFile )
      .pipe( minify() )
      .pipe( concat('mongoose-browser.js') )
      .pipe(gulp.dest( 'dist' ));

  gulp.src( 'index.js' )
      .pipe(babel())
      .pipe(gulp.dest( 'dist' ));

  gulp.src( serverFile )
    .pipe(babel())
    .pipe(gulp.dest( 'dist/lib' ));
});

gulp.task('test-dist', function() {
  gulp.src( testFile ).pipe(gulp.dest( 'dist' ));
});


gulp.task('test', ['dist', 'test-dist'], function() {
  nodemon( {
    script: 'dist/server_test.js',
    ignore: ['dist/models.js', 'dist/models-client.js']
  });
});

gulp.task('default', ['dist'], function() {
});

