const gulp = require('gulp'),
    webpack = require("webpack-stream"),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-cssnano'),
    rimraf = require('rimraf'),
    sourceMaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        images: 'build/image/',
        fonts: 'build/css/fonts/',
    },
    src: {
        html: 'src/**/*.html',
        js: 'src/js/main.js',
        css: 'src/css/**/*.{scss,css}',
        images: 'src/image/**',
        fonts: 'src/css/fonts/**',
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        images: 'src/image/**/*.{png,jpg,svg,gif}',
        css: 'src/css/**/*.{scss,css}'
    },
    clean: './build'
};

gulp.task("webserver", function () {
    browserSync({
        server: path.build.html,
        host: 'localhost',
        port: 3000,
        tunnel: false
    });
});

gulp.task("html:build", function () {
   return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task("images:build", function () {
   return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});

gulp.task("fonts:build", function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task("style:build", function () {
   return gulp.src(path.src.css)
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task("js:build", function () {
   return  gulp.src(path.src.js)
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'main.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task("build", gulp.series(
    'images:build',
    'fonts:build',
    'js:build',
    'style:build',
    'html:build',
));

gulp.task("watch", function () {
    watch([path.watch.html], gulp.parallel('html:build'));
    watch([path.watch.css], gulp.parallel('style:build'));
    watch([path.watch.js], gulp.parallel('js:build'));
    watch([path.watch.images], gulp.parallel('images:build'));
});

gulp.task("clean", function (callback) {
    rimraf(path.clean, callback);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));

