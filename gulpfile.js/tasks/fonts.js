var gulp = require('gulp'),
	config = require('../config'),
	log = require('../lib/logger');

gulp.task('fonts', font);

function font() {
    log('Copying fonts');
    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
}