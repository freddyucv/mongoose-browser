var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

var client_file = 'js-client/*.js';
var server_file = 'lib/*.js';
var test_file = 'test/**/*';

gulp.task('dist', function() {
  gulp.src( client_file ).pipe(gulp.dest( 'dist/js-client' ));

  gulp.src( server_file )
    .pipe(babel())
    .pipe(gulp.dest( 'dist/lib' ));
});

gulp.task('test-dist', function() {
  gulp.src( test_file ).pipe(gulp.dest( 'dist' ));
});


gulp.task('test', [], function() {
  nodemon( {
    script: 'dist/server_test.js',
    ignore: ['dist/models.js', 'dist/models-client.js'],
    tasks: ['dist', 'test-dist']
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
