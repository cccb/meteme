'use strict';

/**
 * Task: assets 
 *
 * Copy / process all assets like images, fonts, etc.
 */

var gulp    = require('gulp');
var flatten = require('gulp-flatten');

// == Register task: watch
gulp.task('assets', function(){

  // Just copy all assets.
  var assets = ['images'];
  assets.forEach(function(asset){
    gulp.src('assets/'+asset+'/**')
      .pipe(gulp.dest('static/client/'+asset));
  });

  // Copy local fonts
  gulp.src('assets/fonts/**')
    .pipe(gulp.dest('static/client/fonts/'));


  // Copy fonts from bower components
  gulp.src('bower_components/**/*.{otf,eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest('static/client/fonts/'));

});

