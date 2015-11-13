/**
 * Webpack config
 */


'use strict';

var path = require('path'),
    webpack = require('webpack'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HTMLPlugin = require('html-webpack-plugin'),
    PACKAGE = require('./package.json'),
    ROOT_PATH = path.resolve(__dirname),
    TARGET = process.env.npm_lifecycle_event,
    template = new HTMLPlugin({
      description: PACKAGE.description,
      template: './templates/index.tpl'
    });


// Development
// ---------------------------

if (TARGET === 'start') {

  module.exports = {
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      //host: '172.18.61.102',
      port: 8080,
      progress: true
    },
    devtool: 'eval-source-map',
    entry: path.resolve(ROOT_PATH, 'example/app.jsx'),
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loaders: ['style', 'css', 'less'],
          includes: [
            path.resolve(ROOT_PATH, 'example'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            path.resolve(ROOT_PATH, 'example'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
        }
      ],
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      template,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
}


// Production
// ---------------------------

if (TARGET === 'build') {

  module.exports = {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'example/app.jsx'),
      libs: Object.keys(PACKAGE.dependencies)
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loader: ExtractTextPlugin.extract('style', 'css!less'),
          includes: [
            path.resolve(ROOT_PATH, 'example'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            path.resolve(ROOT_PATH, 'example'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
        }
      ]
    },
    plugins: [
      template,
      new CleanPlugin(['build']),
      new ExtractTextPlugin('style.[contenthash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'libs',
        'libs.[chunkhash].js'
      ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}