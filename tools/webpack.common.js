const dotenv = require('dotenv')
dotenv.config()
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const sourcePath = path.join(__dirname, './../client/')
const staticsPath = path.join(__dirname, './../public/')

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  context: sourcePath,
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  entry: {
    main: [
      './index.js'
    ]
  },
  output: {
    path: staticsPath,
    filename: '[name].[hash].js',
    publicPath: isProd ? `https://s3-sa-east-1.amazonaws.com/${process.env.AWS_BUCKET}/` : '/'
  },
  resolve: {
    alias: {
      './rangy-core': 'rangy/lib/rangy-core'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/assets'
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
                { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader', query: { sourceMaps: true } }
          ]
        })
      },
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /(node_modules|wysihtml-toolbar.min)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true,
          // other config options to be passed through to standard e.g.
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|server|wysihtml-toolbar.min)/
      },
      {
        test: /\.otf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
      }, // end otf, woff and woff2 test
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?limit=10000&name=assets/fonts/[name].[ext]'
      }, // end ttf , eot and svg test
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000, // Convert images < 10k to base64 strings
            name: 'assets/images/[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
      GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
      APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
      PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
      AWS_BUCKET: JSON.stringify(process.env.AWS_BUCKET),
      SENTRY_DSN_PUBLIC: JSON.stringify(process.env.SENTRY_DSN_PUBLIC),
      GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY),
      BOT_URL: JSON.stringify(process.env.BOT_URL)
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true})
  ],

  performance: isProd && {
    maxAssetSize: 100,
    maxEntrypointSize: 300,
    hints: 'warning'
  },

  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },

  devServer: {
    allowedHosts: [
      '.bonde.devel',
      'bonde.devel'
    ],
    host: '0.0.0.0',
    contentBase: './client',
    historyApiFallback: true,
    port: process.env.PORT,
    compress: true,
    inline: !isProd,
    noInfo: !isProd,
    hot: !isProd,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      errorDetails: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
}

// vendor: [
//   'react',
//   'react-dom',
//   'react-ga',
//   'react-helmet',
//   'react-cookie',
//   'react-redux',
//   'react-apollo',
//   'react-intl',
//   'react-router',
//   'react-countup',
//   'redial',
//   'redux',
//   'redux-promise',
//   'redux-thunk',
//   'redux-form',
//   'redux-form-validation',
//   'raven-js',
//   'axios',
//   'reapop',
//   'format-number'
// ]
