var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
//var watch = require('gulp-watch');
var babel = require('gulp-babel');

var clientFile = 'js-client/*.js';
var serverFile = 'lib/*.js';
var testFile = 'test/**/*';

gulp.task('dist', function() {
  gulp.src( clientFile ).pipe(gulp.dest( 'dist/js-client' ));

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

/*gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('./models/index.js')
        .pipe(browserify({
          shim: {
            models: {
                path: './models/index.js',
                exports: 'models'
            }
          }
         }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./views'))
});*/
