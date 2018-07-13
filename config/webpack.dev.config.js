const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

const cssLoader = {
    loader: 'css-loader',
    options: {
        url: false
    }
};

config.entry.app = [
    'webpack-hot-middleware/client?reload=true'
];

config.output = {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
};

config.module.rules = config.module.rules.concat([{
    test: /\.css$/,
    use: [
        'vue-style-loader',
        cssLoader
    ]
}, {
    test: /\.scss$/,
    use: [
        'vue-style-loader',
        'style-loader',
        cssLoader,
        'sass-loader'
    ]
}]);

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
