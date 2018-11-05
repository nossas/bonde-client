require('dotenv').config()

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const { ANALYZE, REACT_APP_DOMAIN_PUBLIC, NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? `https://static.${REACT_APP_DOMAIN_PUBLIC}` : '',
  webpack: (config, { dev }) => {
    config.output.publicPath = isProd ? `https://static.${REACT_APP_DOMAIN_PUBLIC}${config.output.publicPath}` : config.output.publicPath;

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(new webpack.EnvironmentPlugin({
      REACT_APP_API_REST: JSON.stringify(process.env.API_URL),
      REACT_APP_DOMAIN_API_GRAPHQL: JSON.stringify(process.env.REACT_APP_DOMAIN_API_GRAPHQL),
      REACT_APP_DOMAIN_PUBLIC: JSON.stringify(process.env.REACT_APP_DOMAIN_PUBLIC),
      PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }))

    config.plugins.push(new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }))

    config.module.rules.push(
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|wysihtml-toolbar.min)/
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000, // Convert images < 10k to base64 strings
            name: 'static/images/[name].[ext]'
          }
        }]
      }
    )
    return config
  }
}
