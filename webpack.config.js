let path = require('path');

const extractTextPlugin = require('extract-text-webpack-plugin');

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