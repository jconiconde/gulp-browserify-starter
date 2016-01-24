var gulp = require('gulp'),
	config = require('../config'),
	$ = require('gulp-load-plugins')({lazy: false}),
	log = require('../lib/logger'),
	browserSync = require('../lib/browserSync'),
	reload = browserSync.reload;

var tasks = ['sass'];
if (config.css.vendor.src.length) {
	tasks.push('vendor-css');
}

function sass() {
	log('Compiling SASS --> CSS');
	return gulp
	.src(config.css.sass)
    .pipe($.plumber()) // exit gracefully if something fails after this
    .pipe($.sourcemaps.init({loadMaps : true, debug : true}))
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($.concat(config.css.bundledName))
    .pipe($.sourcemaps.write('./', {
    	includeContent: false,
    	sourceRoot: config.css.src
    }))
    .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.stream({
    	match : '**/*.css'
    }));
}


function vendorCss() {
	log('Compiling Vendor CSS');
	return gulp
    .src(config.css.vendor.src)
    .pipe($.plumber()) // exit gracefully if something fails after this
    .pipe($.sourcemaps.init({loadMaps : true, debug : true}))
    .pipe($.concat(config.css.vendor.bundledName))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.css.dest))
    .pipe(reload({stream:true}));
}

gulp.task('sass', sass);
gulp.task('vendor-css', vendorCss);

gulp.task('styles', tasks);