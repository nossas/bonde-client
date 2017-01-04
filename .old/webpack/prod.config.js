// Webpack config for creating the production bundle.

var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)

var webpackUniversalLoaders = require('./universal.loaders.config')
var webpackUniversalPostCSS = require('./universal.postcss.config')
var webpackUniversalResolveAlias = require('./universal.resolve-alias.config')
var styleModulesRegex = webpackIsomorphicToolsPlugin.regular_expression('style_modules')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': './src/client.js'
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: webpackUniversalLoaders
      .filter(loader => loader.test.toString() !== styleModulesRegex.toString())
      .concat([
        {
          test: styleModulesRegex,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?importLoaders=2&sourceMap'
              + '!postcss'
              + '!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
          )
        },
      ])
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
    new CleanPlugin([relativeAssetsPath]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.IgnorePlugin(/cptable/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
        PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
        GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    webpackIsomorphicToolsPlugin
  ]
};
