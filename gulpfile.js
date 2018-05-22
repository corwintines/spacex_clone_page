// Variable setup
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const plumber = require('gulp-plumber');

gulp.task('browser-sync', ['index-refresh'], function() {
  browserSync({
    server: {
      baseDir: './src'
    }
  });
});

gulp.task('index-refresh', function() {
  return gulp.src('./src/index.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch('./src/index.html', ['index-refresh']);
});

gulp.task('default', ['browser-sync', 'watch']);
