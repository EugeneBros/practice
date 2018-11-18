let path = require('path');

const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');

var isProduction = (process.env.NODE_ENV === 'production');

let conf = {
  entry: {
    src: [
      './src/index.js',
      './src/scss/style.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: '/node_modules/',
      },
        //SASS
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            },
          ],
          fallback: 'style-loader',
        }),
      },

      //Images
      {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'img-loader',
        ],
      },
    ]
  },
  plugins: [
      new extractTextPlugin(
          './css/style.css'
      ),
  ],
  devtool: 'source-map',
};

module.exports = (env, options) => {
  let production = options.mode === 'production';

  conf.devtool = production
      ? false
      : 'eval-sourcemap';

  return conf;
};