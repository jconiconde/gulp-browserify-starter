
var gulp = require('gulp'),
	config = require('../config'),
	$ = require('gulp-load-plugins')({lazy: false}),
	assign = require('object-assign'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	handleErrors = require('../lib/handleErrors'),
	source = require('vinyl-source-stream'),
	exorcist = require('exorcist'),
	browserSync = require('../lib/browserSync'),
	babelify = require('babelify'),
	log = require('../lib/logger');

gulp.task('js', ['eslint'],  js);

function js() {
    watchify.args.debug = true;
	var opts = assign({},
		config.js.browserify,
		watchify.args),
	b = watchify(browserify(opts));

	// #region Transforms
	//b.transform(reactify);
    // for ES6 or ES 2015
    b.transform(babelify);
	// #endregion
	config.js.browserify.excludedFiles.forEach(function(file){
        b.exclude(file);
	});

    //config.browserify.require.forEach(function (req) {
    //    b.require(req.file, {expose : req.expose});
    //});
    b.on('update', function() {
    	return bundle(b);
    });
    b.on('error', handleErrors);
    return bundle(b);
	function bundle(bundler) {
		log('Compiling JS');
		return bundler.bundle()
		.on('error', handleErrors)
		.pipe($.plumber())
		.pipe(exorcist(config.js.bundledMap))
		.pipe(source(config.js.bundledName))
		.pipe(gulp.dest(config.js.dest))
		.pipe(browserSync.stream({match: '**/*.js'}));
		// .pipe(browserSync.reload({
  //   		match : '**/*.css'
  //   	}));
	}

}

module.exports = js;