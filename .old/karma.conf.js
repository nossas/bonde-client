// Karma configuration
// Generated on Fri Jul 03 2015 10:56:54 GMT-0300 (BRT)
var webpack = require('webpack');
var path = require('path')
var webpackUniversalLoaders = require('./webpack/universal.loaders.config')
var webpackUniversalPostCSS = require('./webpack/universal.postcss.config')
var webpackUniversalResolveAlias = require('./webpack/universal.resolve-alias.config')

module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      './app/scripts/tests/globals.js',
      'webpack.test.config.js'
    ],

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        extensions: [ '', '.js', '.jsx', '.json' ],
        alias: webpackUniversalResolveAlias,
      },

      module: {
        loaders: webpackUniversalLoaders
      },

      postcss: webpackUniversalPostCSS,

      node: { fs: 'empty' },

      externals: [
        {
          './cptable': 'var cptable',
          './jszip': 'jszip'
        },
        {
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': 'window'
        }
      ],

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'API_URL': '"http://localhost:3000"',
            'NODE_ENV': '"test"'
          }
        }),
        new webpack.IgnorePlugin(/cptable/),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'webpack.test.config.js': [ 'webpack', 'sourcemap' ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
