module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?localIdentName=[hash:base64:5]&modules&importLoaders=1!sass'
        ]
      },
      { test: /\.svg$/, loader: 'url?limit=50000&name=[path][name].[ext]&context=../common' }
    ]
  }
};
