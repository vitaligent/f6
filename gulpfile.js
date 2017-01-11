var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'postcss-*', 'postcss.*', 'autoprefixer']
});

var sassPaths = [
    'bower_components/foundation-sites/scss/',
    'bower_components/motion-ui/'
];

gulp.task('sass', function () {
    var processors = [
        $.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        })
    ];
    return gulp.src('scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: sassPaths
            // outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.postcss(processors))
        .pipe($.sourcemaps.write('.', {
            mapSources: function (sourcePath) {
                // source paths are prefixed with '../src/'
                return sourcePath;
            }
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
});
