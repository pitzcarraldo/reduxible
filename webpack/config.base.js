'use strict';

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'es3ify'
      }
    ]
  },
  output: {
    library: 'Reduxible',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
