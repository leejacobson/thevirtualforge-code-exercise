const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const mainBowerFiles = require('main-bower-files');
const bower = require('gulp-bower');

gulp.task('clean', () => {
  return gulp.src(['public/js', 'public/css'], {read: false})
  .pipe(clean());
});

gulp.task('styles', () => {
  return gulp.src('src/css/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', () => {
  // Get vendor scripts
  var files = mainBowerFiles();
  // Get app scripts
  files.push('src/js/*.js');

  return gulp.src(files)
    .pipe(babel({
        presets: ['es2015']
    })).on('error', gutil.log)
    .pipe(concat('./scripts.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build', ['clean', 'bower'], () => {
  gulp.start('styles', 'js');
});
 
gulp.task('bower', function() {
  return bower();
});

gulp.task('default', () => {
    gulp.watch('src/css/**/*.sass',['styles']);
    gulp.watch('src/js/**/*.js',['js']);
});