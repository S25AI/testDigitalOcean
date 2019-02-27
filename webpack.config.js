'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV ? "production" : "development";

const developmentConfig = {
  devtool: env === "development" ? 'cheap-module-eval-source-map' : false,
  mode: env,
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
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