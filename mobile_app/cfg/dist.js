'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');


let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/routes'),
  cache: false,
  devtool: 'eval',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CopyWebpackPlugin([{
      /*from: path.join(__dirname, '/../src/index.html'),
      to: path.join(__dirname, '/../dist/index.html')
    }, {
      from: path.join(__dirname, '/../src/images'),
      to: path.join(__dirname, '/../dist/images')
    }, {*/
      from: path.join(__dirname, '/../src/favicon.ico'),
      to: path.join(__dirname, '/../dist/favicon.ico')
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      hash: true,
      minify:{},
      timestamp: Date.now(),
      template: path.join(__dirname, '/../src/index.html')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

config.output.publicPath = '';
// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths, [path.join(__dirname, '/../src')]
  )
});

module.exports = config;