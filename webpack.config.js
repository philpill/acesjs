/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'assets/js');
var dir_ts = path.resolve(__dirname, 'assets/ts');
var dir_libs = path.resolve(__dirname, 'libs');
var dir_build = path.resolve(__dirname, 'static');

module.exports = {
    entry: path.resolve(dir_ts, 'main.ts'),
    output: {
        path: dir_build,
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
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
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};