var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)

module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: [
      'react-hot-loader/webpack',
      'babel?stage=0&optional=runtime&plugins=typecheck'
    ]
  },
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('images'),
    loader: 'url-loader?limit=10240'
  },
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
    loader: 'url?limit=100000'
  },
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
    loader: 'url?limit=100000'
  },
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('style_modules'),
    loaders: [
      'style',
      'css?importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      'postcss',
      'sass?outputStyle=expanded&sourceMap'
    ]
  },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.modernizrrc$/, loader: 'modernizr' }
]
