const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'public/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

exports.watch = watch;
exports.styles = styles;
