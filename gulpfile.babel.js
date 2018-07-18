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
import watch from 'gulp-watch';

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

/**
 * Description: Starts a watch on all .scss assets in the src directory
 * and runs the production build on file change. If no theme is specified,
 * ALL themes are built.
 *
 * Usage: gulp watch
 *        gulp watch --theme <theme-name>
 */
gulp.task('watch', cb => {
    let isRunning = false;
    let isQueued = false;

    // Watch any scss changes in the themes and do a prod rebuild
    return watch('src/**/*.scss', { ignoreInitial: true }, () => {
        runWatch();
    });

    function runWatch() {
        if(!isRunning) {
            log('Starting Watch build');

            isRunning = true;

            configureProd(require('./config/webpack.dist.config'), paths.themes.prod, () => {
                log('Watch build is complete');
                isRunning = false;

                // If we're finished but another build is queued, run it
                if(isQueued) {
                    log('Starting Queued Watch build');

                    isQueued = false;
                    runWatch();
                }
            });
        } else {
            isQueued = true;
        }
    }
});

gulp.task('clean', cb => {
    del([paths.dist]).then(function (paths) {
        log.info('[clean]', paths);
        cb();
    });
});

/**
 * Description: Build the demo site out as minified assets. If no theme is
 * specified, ALL themes are built.
 *
 * Usage: gulp demo-prod
 *        gulp demo-prod --theme <theme-name>
 */
gulp.task('demo-prod', ['clean'], cb => {
    configureProd(require('./config/webpack.dist.config'), paths.themes.dev, cb);
});

/**
 * Description: Build the production site out as minified assets If no theme
 * is specified, ALL themes are built.
 *
 * Usage: gulp prod
 *        gulp prod --theme <theme-name>
 */
gulp.task('prod', ['clean'], (cb) => {
    configureProd(require('./config/webpack.dist.config'), paths.themes.prod, cb);
});

/**
 * Description: Starts a development server with the specified theme. IF
 * no theme is specified, the _base theme is used
 *
 * Usage: gulp dev
 *        gulp dev --theme <theme-name>
 */
gulp.task('dev', () => {
    const config = require('./config/webpack.dev.config');
    const args = yargs.argv;

    if(args.theme) {
        log(`Using theme: ${args.theme}`);

        config.entry.app.push(path.join(paths.themes.dev, args.theme, 'index.js'));
    } else {
        log(`No theme specified, using theme: ${paths.baseTheme}`);

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

gulp.task('default', ['dev']);

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(file => {
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

function configureProd(config, themePath, cb) {
    const args = yargs.argv;

    if(args.theme) {
        log(`Using theme: ${args.theme}`);

        config.output.path = path.join(paths.dist, args.theme);
        config.entry.app = path.join(themePath, args.theme, 'index.js');

        createDistFiles(config, cb);
    } else {
        const themes = getFolders(themePath);
        let completedThemes = 0;

        log(`No theme specified, building all themes`);

        themes.forEach(theme => {
            config.output.path = path.join(paths.dist, theme);
            config.entry.app = path.join(themePath, theme, 'index.js');

            createDistFiles(config, () => {
                completedThemes++;

                if(completedThemes === themes.length) {
                    cb();
                }
            });
        });
    }
}
