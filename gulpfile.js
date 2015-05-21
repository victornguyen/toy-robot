'use strict';

var browserify  = require('browserify');
var watchify    = require('watchify');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var gutil       = require('gulp-util');
var mocha       = require('gulp-mocha');

// setup watchify, browserify
var b = watchify(
    browserify({
        entries: './src/index.js',
        debug: true
    })
);
b.on('update', bundle);
b.on('update', runTests);
b.on('log', gutil.log); 


function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
}


function runTests() {
    return gulp.src('test/*.js', { read:false })
        .pipe( mocha({ reporter: 'spec' }) );
}

// gulp tasks
gulp.task('js', bundle);
gulp.task('test', runTests);
