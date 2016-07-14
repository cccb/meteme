'use strict';

/**
 * Task: bower_components
 *
 * Install all bower components in build directory.
 */

var gulp  = require('gulp');
var bower = require('gulp-bower');

// == Register task
gulp.task('bower_components', function(){
  return bower(); // bower install
});

