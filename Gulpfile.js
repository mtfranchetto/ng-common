'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server;

var KARMA_CONFIG = '/karma.conf.js';

gulp.task('lint', function () {
    gulp.src('lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + KARMA_CONFIG,
        singleRun: false
    }, function () {
    	gulp.start('test');
    });
});

gulp.task('default', ['test']);