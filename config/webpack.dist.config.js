const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const cssLoader = {
    loader: 'css-loader',
    options: {
        url: false
    }
};

config.entry.app = {};

config.output = {
    filename: '[name].bundle.js',
    publicPath: '',
    path: path.resolve(__dirname, '../dist')
};

config.module.rules = config.module.rules.concat([{
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract({
        use: [
            cssLoader,
            'postcss-loader',
            'sass-loader'
        ],
        fallback: 'vue-style-loader'
    })
}]);

config.devtool = '#source-map';

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),

    new ExtractTextPlugin({
        filename: '[name].css'
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: true,
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
        compress: {
            warnings: false
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        },
        options: {
            postcss: [autoprefixer]
        }
    }),

    // Reduces bundles total size
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    })
]);

module.exports = config;
