'use strict';

module.exports = {
  module: {
    loaders: [{test: /\.js$/, loaders: ['babel-loader']}],
    postLoaders: [{test: /\.js$/, loaders: ['es3ify']}]
  },
  output: {
    library: 'Reduxible',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
