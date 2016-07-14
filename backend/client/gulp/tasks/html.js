'use strict';

/**
 * Task: html
 *
 * Copy all markup files.
 */

var gulp = require('gulp');


// == Register task
gulp.task('html', function(){

  // Copy html markup files
  gulp.src('assets/html/*.html').pipe(gulp.dest('static/client/'));

});


