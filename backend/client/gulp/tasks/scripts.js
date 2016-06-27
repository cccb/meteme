'use strict';

/**
 * Task: scripts
 *
 * Compile javascript source.
 */

var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');

// == Register task: scripts
gulp.task('scripts', ['webpack'], function(){
});

