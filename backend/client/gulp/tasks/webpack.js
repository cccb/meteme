
/**
 * Gulp Webpack
 */

var gulp    = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');

var webpack = require('webpack-stream');

var webpackConfig = require('../webpack.config')

gulp.task('webpack', ['bower_components'], function() {
  // Create bundled app and minified app
  gulp.src('assets/js/app.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('static/client/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/client/js/'));
});


