require('dotenv').config()
const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const Dotenv = require('dotenv-webpack');

module.exports = withCSS(withSass({
    webpack: (config) => {
      // config environment by .env
      config.plugins.push(
        new Dotenv()
      )
      // url-loader
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      })

      return config
    }
  })
)
