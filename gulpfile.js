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
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// file paths
var paths = {
    entry: './src/index.js',
    src:   './src/**/*.js',
    html:  './src/**/*.html',
    tests: './test/**/*.js',
    dist:  './dist/'
};

// setup watchify, browserify
var b = watchify(
    browserify({
        entries: paths.entry,
        debug: true
    })
);
b.on('update', bundle);
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
        .pipe(gulp.dest(paths.dist));
}


function runTests() {
    return gulp.src(paths.tests, { read:false })
        .pipe( mocha({ reporter: 'spec' }) );
}

// gulp tasks
gulp.task('js', bundle);
gulp.task('test', runTests);
gulp.task('html-copy', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('dev', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch(
        [paths.src, paths.tests, paths.html],
        ['test', 'js', 'html-copy', reload]
    );
});

