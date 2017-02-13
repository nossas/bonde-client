var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = process.env.HOST || 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3002;

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)

var webpackUniversalLoaders = require('./universal.loaders.config')
var webpackUniversalPostCSS = require('./universal.postcss.config')
var webpackUniversalResolveAlias = require('./universal.resolve-alias.config')

module.exports = {
  watchOptions: {
      poll: 1000 // <-- it's worth setting a timeout to prevent high CPU load
  },
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: webpackUniversalLoaders
  },
  postcss: webpackUniversalPostCSS,
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js'],
    alias: webpackUniversalResolveAlias,
  },
  node: { fs: 'empty' },
  externals: [
    {
      './cptable': 'var cptable',
      './jszip': 'jszip'
    }
  ],
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.IgnorePlugin(/cptable/),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
        PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
        GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};
