const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].bunde.js', // Tells webpack where to write hashed bundle.js file
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', // Tells webpack where to write hashed chunk.js file
    path: path.resolve(__dirname, '../dist'), // Tells webpack where the build folder should be
    publicPath: '/dist/' // Tels webpack where to serve public assets from related to base url
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCSSExtractPlugin.loader }, { loader: 'css-loader' }]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/styles/constants.scss')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      scriptLoading: 'defer'
    })
  ]
};

module.exports = merge(baseConfig, config);
