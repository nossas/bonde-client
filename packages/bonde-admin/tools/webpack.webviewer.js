const dotenv = require('dotenv')
dotenv.config()
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const sourcePath = path.join(__dirname, './../client/')
const staticsPath = path.join(__dirname, './../mob-render/webviewer/')
const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

function getExternals () {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {})
}

module.exports = {
  devtool: 'source-map',
  context: sourcePath,
  target: 'node',
  externals: getExternals(),
  node: {
    fs: 'empty'
  },
  // externals: [
  //   {
  //     './cptable': 'var cptable'
  //   }
  // ],
  entry: '../client/mobrender/components/index.js',
  output: {
    path: staticsPath,
    filename: 'webviewer.js',
    publicPath: '/',
    library: 'webviewer',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
    // new AssetsPlugin({ filename: './build/assets.json' }),
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   beautify: false,
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     screw_ie8: true
    //   },
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   output: {
    //     comments: false,
    //     screw_ie8: true
    //   }
    // }),
    // new CompressionPlugin({
    //   asset: '[path][query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$$/,
    //   minRatio: 0.8
    // }),
    new Visualizer({
      filename: './build/webviewer.stats.html'
    })
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
