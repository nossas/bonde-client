const webpack = require('webpack')
const merge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
// const S3Plugin = require('webpack-s3-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const common = require('./webpack.common.js')

module.exports = merge.smart(common, {
  devtool: 'source-map',
  output: {
    publicPath: `https://s3-sa-east-1.amazonaws.com/${process.env.AWS_BUCKET}/`
  },
  plugins: [
    new AssetsPlugin({ filename: './build/assets.json' }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new CompressionPlugin({
      asset: '[path][query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$$/,
      minRatio: 0.8
    }),
    new Visualizer({
      filename: './build/main.stats.html'
    })
  ]
})

// if ('AWS_ACCESS_KEY_ID' in process.env) {
//   plugins.push(
//     new S3Plugin({
//       // Only upload css and js
//       include: /\.js$|\.css$|\.svg$|\.ttf$|\.eot$|\.png$|\.otf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//       // s3Options are required
//       s3Options: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: 'sa-east-1'
//       },
//       s3UploadOptions: {
//         Bucket: process.env.AWS_BUCKET,
//         ContentEncoding (fileName) {
//           if (/\.js$|\.css$|\.svg$/.test(fileName)) {
//             return 'gzip'
//           }
//         }
//       }
//     })
//   )
// }
