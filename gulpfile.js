var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sh = require('shelljs');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var jade = require('gulp-jade');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['.src/sass/*.scss', '.src/sass/*.sass'],
  coffee: ['./src/coffee/app.coffee', './src/coffee/**/*.coffee'],
  jade: ['./src/jade/**/*.jade'],
  lib_js: [
    './www/lib/ionic/js/ionic.bundle.js'
  ]  // Add all library files, unminified
};

var outputs = {
  root: './www/',
  js: './www/js/',
  css: './www/css/'
}

gulp.task('default', ['sass', 'coffee:final', 'jade']);

gulp.task('sass', function(done) {
  gulp.src('./src/sass/app.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(gulp.dest(outputs.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(outputs.css))
    .on('end', done);
});

// Jade task
gulp.task('jade', function(done) {
  gulp.src(paths.jade)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(outputs.root))
    .on('end', done);
});

// Base coffee script task
gulp.task('coffee:base', function(done) {
  gulp.src(paths.coffee)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(coffee())
    .pipe(concat('application.js'))
    .pipe(gulp.dest(outputs.js))
    .on('end', done);

});

// Concat lib files for coffee
gulp.task('coffee:final', ['coffee:base'], function(done) {
  gulp.src(paths.lib_js.concat([outputs.js + 'application.js']))
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('completeApp.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputs.js))
    .on('end', done);
});


gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee:final']);
  gulp.watch(paths.jade, ['jade']);
});

/* --------------------- Other things ---------------------------- */
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
