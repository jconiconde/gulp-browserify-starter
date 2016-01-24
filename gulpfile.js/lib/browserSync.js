var gulp = require('gulp'),
	config = require('../config'),
	$ = require('gulp-load-plugins')({lazy: false}),
	log = require('../lib/logger'),
	bsync = require('browser-sync');

var browserSync = getBsInstance(config.server.src);
var port = config.proxy.port


function getBsInstance(name) {
    var bsyncInstance = null;
    try {
        bsyncInstance = bsync.get(name);
    }catch (e){
        bsyncInstance = bsync.create(name);
    }

    return bsyncInstance;
}


function startBrowserSync(isDev, specRunner) {
	if (browserSync.active) {
        return;
    }
    log('Starting BrowserSync on port ' + port);

	gulp.watch([config.css.sass],
		 ['sass'])
           .on('change', changeEvent);

    gulp.watch([config.html.src],
         ['html'])
           .on('change', changeEvent);

    browserSync.emitter.on('init', function() {
    	log('Browser sync has been initialized.');
    })
    browserSync.init(config.browserSync);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.root.src + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

browserSync.startBrowserSync = startBrowserSync;

module.exports = browserSync;