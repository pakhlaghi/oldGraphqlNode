const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, '../src/index.js')],
    output: {
        path: path.join(__dirname + '../dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, 
            {
                test:/\.(s*)css$/, 
                use: ExtractTextPlugin.extract({ 
                        fallback:'style-loader',
                        use:['css-loader','sass-loader'],
                    })
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, '../src/index.html'),
            path: path.join(__dirname, "../dist/"),
            filename: 'index.html'
        }),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        contentBase: path.join(__dirname, '../src'),
        port: 9000,
        historyApiFallback: true
    }
}