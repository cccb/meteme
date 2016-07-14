'use strict';

/**
 * Task: watch 
 *
 * Watch filesystem for changes in files and 
 * run the corresponding tasks.
 */

var gulp = require('gulp');

// == Register task: watch
gulp.task('watch', function(){

  // Watch CSS, Scripts, HTML, and everything
  // else in the source directory
  gulp.watch('assets/html/**/*.html', ['html']);
  gulp.watch('assets/js/**/*.js',     ['scripts']);
  gulp.watch('assets/js/**/*.jsx',    ['scripts']);
  gulp.watch('assets/scss/**/*.scss', ['stylesheets']);
  gulp.watch('assets/scss/**/*.css',  ['stylesheets']);
  gulp.watch('app/assets/**/*',       ['assets']);

});

