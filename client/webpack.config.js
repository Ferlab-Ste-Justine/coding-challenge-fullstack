const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const STATIC_DIR = path.resolve(__dirname, 'static');

module.exports = {
  entry: `${__dirname}/src/js/index.js`,

  mode: 'development',

  output: {
    path: STATIC_DIR,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /.js(x)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: false
    })
  ],

  devServer: {
    contentBase: STATIC_DIR,
    historyApiFallback: true,
    port: 8888,
    stats: {
      assets: true,
      modules: false
    }
  }
};
