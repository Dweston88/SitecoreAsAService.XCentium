'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';
import yargs from 'yargs';
import log from 'fancy-log';
import PluginError from 'plugin-error';
import fs from 'fs';

// map of all paths
let paths = {
    baseTheme: '_base',
    entry: {
        prod: path.join(__dirname, 'src/index.js')
    },
    themes: {
        dev: path.join(__dirname, 'demo/themes'),
        prod: path.join(__dirname, 'src/themes')
    },
    dist: path.join(__dirname, 'dist')
};

gulp.task('clean', (cb) => {
    del([paths.dist]).then(function (paths) {
        log.info('[clean]', paths);
        cb();
    });
});

gulp.task('demo-prod', ['clean'], (cb) => {
    const config = require('./config/webpack.dist.config');
    const args = yargs.argv;

    if(args.theme) {
        log(`Using theme: ${args.theme}`);

        config.output.path = path.join(paths.dist, args.theme);
        config.entry.app = path.join(paths.themes.dev, args.theme, 'index.js');

        createDistFiles(config, cb);
    } else {
        const themes = getFolders(paths.themes.dev);
        let completedThemes = 0;

        log.info(`No theme specified, building all themes`);

        themes.forEach(theme => {
            config.output.path = path.join(paths.dist, theme);
            config.entry.app = path.join(paths.themes.dev, theme, 'index.js');

            createDistFiles(config, () => {
                completedThemes++;

                if(completedThemes === themes.length) {
                    cb();
                }
            });
        });
    }
});

gulp.task('prod', ['clean'], (cb) => {
    const config = require('./config/webpack.dist.config');
    const args = yargs.argv;

    if(args.theme) {
        log(`Using theme: ${args.theme}`);

        config.output.path = path.join(paths.dist, args.theme);
        config.entry.app = path.join(paths.themes.prod, args.theme, 'index.js');

        createDistFiles(config, cb);
    } else {
        const themes = getFolders(paths.themes.prod);
        let completedThemes = 0;

        log.info(`No theme specified, building all themes`);

        themes.forEach(theme => {
            config.output.path = path.join(paths.dist, theme);
            config.entry.app = path.join(paths.themes.prod, theme, 'index.js');

            createDistFiles(config, () => {
                completedThemes++;

                if(completedThemes === themes.length) {
                    cb();
                }
            });
        });
    }
});

// Create a prod task based on the theme name
gulp.task('dev', () => {
    const config = require('./config/webpack.dev.config');
    const args = yargs.argv;

    if(args.theme) {
        log(`Using theme: ${args.theme}`);

        config.entry.app.push(path.join(paths.themes.dev, args.theme, 'index.js'));
    } else {
        log.info(`No theme specified, using theme: ${paths.baseTheme}`);

        config.entry.app.push(path.join(paths.themes.dev, paths.baseTheme, 'index.js'));
    }

    const compiler = webpack(config);

    serve({
        port: process.env.PORT || 3000,
        open: false,
        server: {
            baseDir: 'src/shared'
        },
        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(compiler, {
                stats: {
                    colors: colorsSupported,
                    chunks: false,
                    modules: false
                },
                publicPath: config.output.publicPath
            }),
            webpackHotMiddleware(compiler)
        ]
    });
});

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter((file) => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function createDistFiles(config, callback) {
    webpack(config, (err, stats) => {
        if(err) {
            throw new PluginError('webpack', err);
        }

        log('[webpack]', stats.toString({
            colors: colorsSupported,
            hash: false,
            version: false,
            timings: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        }));

        callback();
    });
}

gulp.task('default', ['dev']);
