const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const marked = require('marked');

const renderer = new marked.Renderer();

module.exports = {
    devtool: 'inline-cheap-module-source-map',
    entry: {},
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            demo: path.resolve('demo/'),
            src: path.resolve('src/'),
            assets: path.resolve('src/shared/assets'),
            '@': path.resolve('src/shared/')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }, {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }, {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg|gif)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=0'
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'highlight-loader'
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            renderer
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'demo/app/index.html',
            filename: 'index.html',
            inject: 'body',
            hash: true
        }),

        new StyleLintPlugin({
            configFile: '.stylelintrc.json',
            failOnError: false,
            quiet: false
        }),

        new webpack.LoaderOptionsPlugin({
            eslint: {
                failOnWarning: false,
                failOnError: true
            }
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
