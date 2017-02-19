/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'assets/js');
var dir_libs = path.resolve(__dirname, 'libs');
var dir_build = path.resolve(__dirname, 'static');

module.exports = {
    entry: path.resolve(dir_js, 'main.js'),
    output: {
        path: dir_build,
        filename: 'js/main.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js,
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            {
                from: 'assets/libs',
                to: 'libs'
            } // to: output.path
        ]),
                new CopyWebpackPlugin([
            {
                from: 'assets/img',
                to: 'img'
            } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};