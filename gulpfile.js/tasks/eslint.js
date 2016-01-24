var gulp = require('gulp'),
	config = require('../config'),
	$ = require('gulp-load-plugins')({lazy: false});

gulp.task('eslint', lint);

function lint() {
  return gulp.src(config.js.src)
    .pipe($.eslint())
    .pipe($.eslint.format());
}

module.exports = lint;