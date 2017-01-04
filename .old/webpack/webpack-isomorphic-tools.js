var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackUniversalResolveAlias = require('./universal.resolve-alias.config')

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  // debug: true,
  webpack_assets_file_path: 'webpack-assets.json',
  webpack_stats_file_path: 'webpack-stats.json',
  alias: webpackUniversalResolveAlias,

  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'otf',
        'woff',
        'woff2',
        'eot',
        'ttf'
      ],
      regular_expression: /\.(otf.*|woff.*|eot.*|ttf.*)$/,
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      regular_expression: /\.(svg.*)$/,
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extension: 'scss',
      filter: function(module, regex, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
    }
  }
}
