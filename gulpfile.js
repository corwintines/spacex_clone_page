// Variable setup
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const plumber = require('gulp-plumber');

gulp.task('browser-sync', ['index-refresh', 'sass-refresh'], function() {
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

gulp.task('sass-refresh', function() {
  return gulp.src('./src/css/main.scss')
  .pipe(plumber())
  .pipe(sass({
    includePaths: ['css', 'scss', 'sass'],
    indentedSyntax: true,
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade : true}))
  .pipe(browserSync.reload({stream : true}))
  .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/index.html', ['index-refresh']);
  gulp.watch('./src/css/**', ['sass-refresh']);
});

gulp.task('default', ['browser-sync', 'watch']);
