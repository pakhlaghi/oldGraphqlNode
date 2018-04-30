const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../../server/public'),
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [new CopyWebpackPlugin([{ from: 'src/assets/data', to: 'assets/data' }])],
});
