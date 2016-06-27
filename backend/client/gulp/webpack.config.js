
/**
 * Webpack configuration
 */

var webpack = require('webpack');

var config = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
      },
    ]
  }
};

// == Exports
module.exports = config;

