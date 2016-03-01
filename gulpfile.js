'use strict';

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();

gulp.task('lint', () => {
  return gulp.src(['app/**/*.js', 'test/**/*.js', 'gulpfile.js', 'karma.conf.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('default', ['lint']);
