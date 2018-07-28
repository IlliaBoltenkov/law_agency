'use strict'

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/*.js',
        style: 'src/style/main.scss',
        css: 'src/style/*.css',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*'
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*'
    },
    clean: './build'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css', function () {
    gulp.src(path.src.css)
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', ['html', 'scripts', 'styles', 'css', 'fonts', 'images']);

gulp.task('watch', function () {
    gulp.watch(path.watch.style, ['styles']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.js, ['scripts']);
});

gulp.task('default', ['build', 'watch']);
