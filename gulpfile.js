var gulp = require('gulp');
var scss = require('gulp-sass');
var fileinclude = require('gulp-file-include');
// var include = require('gulp-include'); //html代码复用 1
var concat = require('gulp-concat'); //文件合并插件 1
// var imagemin = require('gulp-imagemin');         //图片压缩 1
var babel = require('gulp-babel'); //编译es6 1
var uglify = require('gulp-uglify'); //Js 文件压缩 1
var autoprefixer = require('gulp-autoprefixer'); //css3自动添加前缀
var shrink = require('gulp-cssshrink'); //css 文件压缩 1
// var zip = require('gulp-zip');                   // gulp压缩工具 1


// 设置监听任务
gulp.task('default', ['scss', 'es6', 'images', 'html', 'vendors'], function() {});
// 监听变化
gulp.task('watch', ['default'], function() {
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/html/**/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['es6']);
    gulp.watch('./src/images/**/*.*', ['images']);
})

// 编译scss
gulp.task('scss', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(autoprefixer({
            cascade: true,
            remove: true
        }))
        .pipe(scss())
        .pipe(concat('style.css'))
        .pipe(shrink())
        .pipe(gulp.dest('./dist/css'));
})

// 编译
gulp.task('html', function() {
    return gulp.src('./src/html/webPage/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .on('error', console.log) //监听错误， 打印日志
        .pipe(gulp.dest('./dist/html'));
})

gulp.task('images', function() {
    return gulp.src('src/images/**/*.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('es6', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//插件应用库
gulp.task('vendors', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('dist/vendors/bootstrap/css'));
  gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('dist/vendors/jquery'));
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('dist/vendors/bootstrap/js'));
    gulp.src('src/vendors/**')
        .pipe(gulp.dest('dist/vendors'));
});

gulp.task('pack', ['default'], function() {
    return gulp.src('./dist/**')
        .pipe(zip('icolor.static.zip'))
        .pipe(gulp.dest('./release'));
});
