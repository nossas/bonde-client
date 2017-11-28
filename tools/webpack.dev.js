const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')

module.exports = merge(common, {
  name: 'main',
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: 'http://app.bonde.devel:' + process.env.PORT + '/'
  },
  plugins: [
    new AutoDllPlugin({
      // debug: true,
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name]_[hash].js',
      entry: {
        vendor: [
          'react-apollo',
          // 'react-color',
          // 'react-colors-picker',
          'react-cookie',
          // 'react-countup',
          'react-dom',
          'react-ga',
          'react-helmet',
          'react-intl',
          'react-redux',
          // 'reapop',
          // 'reapop-theme-wybo',
          'redial',
          'redux',
          'redux-devtools',
          'redux-devtools-dock-monitor',
          'redux-form',
          'redux-form-validation',
          'redux-thunk',

          'cpf_cnpj',
          'keycode',
          'wysihtml-toolbar.min',

          'raven-js',
          'axios',
          'format-number',
          // 'slate-editor',
          'downloadjs',

          'react-router',
          'react-s3-uploader',
          'react-select-plus',

          'draft-js',
          'jquery'
        ]
      }
    }),
    new HtmlWebpackPlugin({
      template: '../tools/index.template.ejs',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
