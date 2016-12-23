const webpack = require('webpack')
const fs =  require('fs')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CONFIG = require('./webpack.base')
const { SERVER_ENTRY, SERVER_OUTPUT, PUBLIC_PATH }  = CONFIG

const inlinesvg = require('postcss-inline-svg');
const autoprefixer = require('autoprefixer');

function getExternals () {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {})
}

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  entry: SERVER_ENTRY,
  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js'
  },
  externals: getExternals(),
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "react", "stage-0", "react-optimize"],
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap', 'postcss-loader?parser=postcss-scss', 'sass-loader?sourceMap'])
      }
    ]
  },
  postcss: function() {
    return [autoprefixer, inlinesvg];
  },
  sassLoader: {
    includePaths: [path.join(__dirname, 'scss')]
  },
  plugins: [
    new webpack.BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
    ),
    new webpack.IgnorePlugin(/\.(css|less|png|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ]
}
