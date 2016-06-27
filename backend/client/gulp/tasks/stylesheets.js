'use strict';

/**
 * Task: stylesheets 
 *
 * Compile stylesheets from less source.
 */

var gulp   = require('gulp');
var sass   = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

// == Register task: stylesheets 
gulp.task('stylesheets', function(){
  // Compile less files
  gulp.src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/crm/css/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('static/crm/css/'));
});

