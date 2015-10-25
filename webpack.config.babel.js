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
      port: 8080,
      progress: true
    },
    devtool: 'eval-source-map',
    entry: path.resolve(ROOT_PATH, 'src/app.jsx'),
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loaders: ['style', 'css', 'less'],
          includes: [
            path.resolve(ROOT_PATH, 'src'),
            path.resolve(ROOT_PATH, 'node_modules/font-awesome')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'src')
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
  console.log(TARGET);

  module.exports = {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'src/app.jsx'),
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
            path.resolve(ROOT_PATH, 'src'),
            path.resolve(ROOT_PATH, 'node_modules/font-awesome')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'src')
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