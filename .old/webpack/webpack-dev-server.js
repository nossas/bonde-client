var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('./dev.config'),
  host = process.env.HOST || 'localhost',
  port = parseInt(process.env.PORT) + 1 || 3002,
  serverOptions = {
    watchOptions: {
        poll: 1000 // <-- it's worth setting a timeout to prevent high CPU load
    },
    contentBase: 'http://' + host + ':' + port,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
  },
  webpackDevServer = new WebpackDevServer(webpack(config), serverOptions);

webpackDevServer.listen(port, "0.0.0.0", function() {
  console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
});
