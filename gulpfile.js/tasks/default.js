var gulp = require('gulp'),
	serve = require('../lib/serve');

gulp.task('default', ['js', 'styles', 'html', 'fonts'], function(cb) {
	return serve(true, false, cb)
});