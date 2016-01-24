
var assign = require('object-assign');
function config() {

	var c = {},
		dist = './dist/',
		src = './src/';

	c.root = {
		'src' : src,
		'dest' : dist
	};

	c.server = {
		port : 8007,
		src : src + 'server.js' // one of the best practice is to change this to your app name
	}

	c.proxy = {
		target : require('ip').address() + ':' + c.server.port,
		port : 8006
	}

	c.js = {
		src : src + '**/*.js',
		dest : dist + 'scripts/',
		bundledMap : dist + 'scripts/bundle.js.map',
		bundledName: 'bundle.js',
		browserify : {
			entries : [
				src + 'index.js'
			],
			excludedFiles : [
				c.server.src
			],
			cache: {},
			packageCache: {},
			basedir : '.',
			debug: true,
			paths : src + '**/*.js'
		}
	};

	c.css = {
		sass : src + 'styles/**/*.scss',
		bundledName : 'bundle.css',
		src : src + 'styles',
		dest : dist + 'styles',
		vendor : {
			src : [],
			bundledName : 'vendor.bundle.css'
		}
	};

	c.html = {
		src : src + '*.html',
		dest : dist
	};

	c.fonts = {
		src : [
			src + 'fonts/**/*.*'
		],
		dest : dist + 'fonts'
	};

	c.browserSync = {
		proxy : {
			target : c.proxy.target,
			ws : false
		},
        // port: c.proxy.port,
        // host : require('ip').address(),
        open: 'external',
        files : [
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'Browser glass',
        notify: true,
        reloadDelay: 1000, //,
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.js'
        },
        minify : false,
        ui : false
	};

	c.nodemon = {
		script: src + 'server.js',
		delayTime: 1,
		env: {
		    'PORT': c.server.port
		},
		ignoreRoot: [dist]
	}

	return c;
}

module.exports = config();