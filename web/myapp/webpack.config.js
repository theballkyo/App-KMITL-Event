var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: {
        www: "./src/bin/www",      
    },
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a valid name to reference
          query: {
            presets: ['es2015']
          }
        },
      ],
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src' },
        ], {
            ignore: ['*.js', 'bin/www', '.env.dev']
        }),
    ]
};
