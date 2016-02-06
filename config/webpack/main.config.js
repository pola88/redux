require('dotenv').load();

var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  context: path.join(__dirname, '../', '../'),
};

config.node = {
  fs: "empty"
}

config.entry = [
  'babel-polyfill',
  './webapp/index.js'
]

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(__dirname, '../', '../', 'webapp','public'),
  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: 'bundle.js',
  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  publicPath: 'http://localhost:8080/public'
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.css'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: [ 'node_modules', 'bower_components' ],
};


config.plugins = [
  // we need this plugin to teach webpack how to find module entry points for bower files,
  // as these may not have a package.json file
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ]),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),

];

config.module= {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query:
      {
        plugins: ['transform-runtime'],
        presets:['react','es2015']
      }
    },
    { test: /\.css$/,
      loader: "style-loader!css-loader"
    }
  ]
}
