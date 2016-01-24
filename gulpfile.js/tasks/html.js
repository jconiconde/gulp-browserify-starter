var gulp = require('gulp'),
	config = require('../config'),
	$ = require('gulp-load-plugins')({lazy: false}),
	log = require('../lib/logger'),
	browserSync = require('../lib/browserSync');

gulp.task('html', html);

function html() {
	log('Processing html');
	return gulp.src(config.html.src)
	.pipe(gulp.dest(config.html.dest))
	.pipe(browserSync.stream({match: '**/*.html'}));
}