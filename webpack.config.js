'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

const developmentConfig = {
  devtool: dev ? 'cheap-module-eval-source-map' : false,
  mode: dev ? 'development' : 'production',
  context: path.resolve(__dirname, 'frontend'),
  entry: './app',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js",
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      "containers": path.resolve(__dirname, "frontend", "containers")
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          {
            loader: 'linaria/loader',
            options: {sourceMap: dev}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: dev}
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new HtmlWebpackPlugin({template: 'index.html'})
  ],

  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3002,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    }
  }
};

module.exports = env => {
  console.log('environment', env);
  return developmentConfig;
};