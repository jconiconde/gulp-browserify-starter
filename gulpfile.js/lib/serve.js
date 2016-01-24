var gulp = require('gulp'),
    config = require('../config'),
    $ = require('gulp-load-plugins')({lazy: false}),
    log = require('../lib/logger'),
    assign = require('object-assign'),
    browserSync = require('../lib/browserSync'),
    reload = browserSync.reload;


function serve(isDev, specRunner, cb) {
    var started = false;
    return $.nodemon(assign({}, config.nodemon, {
        env : {
            NODE_ENV : isDev ? 'dev' : 'build'
        }
    }))
    .on('restart', function(ev) {
        log('*** nodemon restarted **** - ');
        log('files changed:\n' + ev);
        setTimeout(function() {
            browserSync.notify('reloading now ...');
            reload({stream : true});
        }, config.browserSync.browserReloadDelay);
    })
    .on('start', function () {
        log('*** nodemon started **** - ');
        browserSync.startBrowserSync(isDev, specRunner);
        if (!started) {
            cb();
            started = true;
        }
    })
    .on('crash', function () {
        log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function () {
        log('*** nodemon exited cleanly');
    });
}

module.exports = serve;