var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
require('dotenv').load();


var config = module.exports = require('./main.config.js');

config.output = _.merge(config.output, {
  //path: path.join(config.context, 'public', 'assets'),
  //filename: '[name]-bundle-[chunkhash].js',
  //chunkFilename: '[id]-bundle-[chunkhash].js'
});

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin('common', 'common-bundle.js'),
  // new ChunkManifestPlugin({
  //   filename: 'webpack-common-manifest.json',
  //   manfiestVariable: 'webpackBundleManifest',
  // }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({__HOST__: JSON.stringify('//avi-on-concourse.herokuapp.com')})
);
