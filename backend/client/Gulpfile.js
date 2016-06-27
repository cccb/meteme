
/**
 * Mete98 ME Gulpfile
 *
 * (c) 2016 Matthias Hannig
 */

var gulp = require('gulp');
var path = require('path');


// == Set environment: Choose between 'development' or 'production'
// TODO: Get build env from environment.
global.buildEnv = 'development';

// == Load gulp config
require('./gulp/build');

