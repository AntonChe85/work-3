var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass');

// Компиляция Jade в html
gulp.task('jade', function () {
  gulp.src('app/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('app'));
});

 //Компиляция SASS в CSS
 gulp.task('sass', function () {
   gulp.src('app/scss/*.scss')
     .pipe(sass({pretty: true}))
     .pipe(sass())
     .pipe(gulp.dest('app/css'))
 });

// Запускаем локальный сервер (только после компиляции jade&sass)
gulp.task('server', ['jade', 'sass'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

// слежка и запуск задач
gulp.task('watch', function () {
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);
