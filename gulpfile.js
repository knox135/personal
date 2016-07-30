var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');


gulp.task('js', function (){
return gulp.src('./public/**/*.js')
.pipe(concat('all.min.js'))
.pipe(gulp.dest('public/gulped'))
});

gulp.task('css', function(){
  gulp.src('./public/**/*.css')
    .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/gulped'));
})

gulp.task('watch', function() {
  gulp.watch('styles/*.css', ['css.min']);
  gulp.watch('./js/**/*.js', ['js']);
})

gulp.task('default', ['js', 'css', 'watch']);
