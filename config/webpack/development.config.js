var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
require('dotenv').load();


var config = module.exports = require('./main.config.js');

config = _.merge(config, {
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'eval-cheap-source-map',
});

config.entry.push('webpack-dev-server/client?http://localhost:8080/');

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin('common', 'common-bundle.js'),
  new webpack.optimize.DedupePlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({__HOST__: JSON.stringify(process.env.HOST)})
);
