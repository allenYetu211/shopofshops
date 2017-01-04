var gulp = require('gulp');
var scss = require('gulp-sass');
var fileinclude = require('gulp-file-include');    //html代码复用 
var concat = require('gulp-concat');               //文件合并插件 
var imagemin = require('gulp-imagemin');          //图片压缩 
var babel = require('gulp-babel');                //编译es6 
var uglify = require('gulp-uglify');              //Js 文件压缩 
var connect = require('gulp-connect');            //自动刷新
var autoprefixer = require('gulp-autoprefixer');  //css3自动添加前缀


// 设置监听任务
gulp.task('default', ['scss', 'es6', 'images', 'html', 'vendors', 'connect'], function() {});


// 监听变化
gulp.task('watch', ['default'], function() {
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/html/**/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['es6']);
    gulp.watch('./src/images/**/*.*', ['images']);
})

// 自动刷新
gulp.task('connect', function() {
        connect.server({
        // host: '192.168.1.172', //地址，可不写，不写的话，默认localhost
        port: 8080, //端口号，可不写，默认8000  --->>>> 拉取后需要将webpack-dev-server 中的端口号统一
        root: './', //当前项目主目录
        livereload: true //自动刷新
    })
})

// gulp.task('watch', function() {
//     gulp.watch('./src/scss/style.scss', ['html']); //监控css文件
//     gulp.watch('./src/js/**/*.js', ['html']); //监控js文件
//     gulp.watch(['./src/html/webPage/*.html'], ['html']); //监控html文件
// }); //执行gulp server开启服务器

// 编译scss
gulp.task('scss', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(autoprefixer({
            cascade: true,
            remove: true
        }))
        .pipe(scss())
        .pipe(concat('style.css'))
        // .pipe(shrink())
        .pipe(gulp.dest('./dist/css'));
})


// 编译
gulp.task('html', function() {
    return gulp.src('./src/html/webPage/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(connect.reload())
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
