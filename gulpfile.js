'use strict';

var browserify  = require('browserify');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var gutil       = require('gulp-util');
var mocha       = require('gulp-mocha');
var clean       = require('gulp-clean');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var deploy      = require('gulp-gh-pages');

// file paths
var paths = {
    entry: './src/scripts/index.js',
    src:   './src/**/*.js',
    html:  './src/**/*.html',
    tests: './test/spec/*.js',
    dist:  './dist/'
};

// gulp tasks
gulp.task('bundle-app', function() {
    var b = browserify({
        entries: paths.entry,
        debug: true
    });
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('dist-html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('dev', ['serve'], function() {
    gulp.watch(
        [paths.src, paths.tests, paths.html],
        ['test', 'bundle-app', 'dist-html', reload]
    );
});

gulp.task('test', function() {
    return gulp.src(paths.tests, { read:false })
        .pipe( mocha({ reporter: 'spec' }) );
});

gulp.task('dist-tests', function() {
    // copy mocha html runner
    gulp.src('./test/runner/*')
        .pipe(gulp.dest(paths.dist + 'test/'));

    // bundle tests
    var b = browserify({
        entries: ['./test/spec/parser-test.js', './test/spec/simulation-test.js']
    })
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('test.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist + 'test/'));
});

gulp.task('clean', function() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('dist-app', ['dist-html', 'bundle-app']);

gulp.task('dist', ['clean'], function() {
    gulp.start(['dist-app', 'dist-tests']);
});

gulp.task('deploy', function() {
    return gulp.src(paths.dist)
      .pipe(deploy());
});
