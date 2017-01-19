var path = require('path');
var gulp = require('gulp-help')(require('gulp'), {
  hideEmpty: true,
  hideDepsMessage: true
});
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var config;
var srcPaths = {};

/*********\
| HELPERS |
\*********/

function bytesToSize(bytes) {
  if (bytes == 0) return '0 B';
  var k = 1024;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)).toPrecision(3)) + ' ' + sizes[i];
}

function outputDiff(data) {
  var difference = (data.savings > 0) ? 'Saved' : 'Added';
  return data.fileName + ': ' + difference + ' ' + bytesToSize(data.savings);
}

/*******\
| TASKS |
\*******/

gulp.task('default', function(callback) {
  var prompter = $.prompt.prompt({
    type: 'input',
		name: 'task',
		message: "What would you like to do? (build)"
  }, function(res) {
    if (!res.task || res.task.length == 0)
      res.task = 'build';

    try {
      runSequence(res.task, callback);
    } catch(e) {
      console.log("Error: Unrecognised task");
      return false;
    }
  });

  runSequence('help');

  prompter.write();
  return prompter;
});

gulp.task('clean-styles', 'Remove old styles', function() {
  return gulp.src('./Custom/Build/css', { read: false })
    .pipe($.clean());
});

gulp.task('clean-scripts', 'Remove old scripts', function() {
  return gulp.src('./Custom/Build/js', { read: false })
    .pipe($.clean());
});

gulp.task('styles', 'Compile, prefix & minify all SCSS', ['clean-styles'], function() {
  var sassFilter = $.filter(['**/*.scss'], { restore: true });
  var minFilter = $.filter(['**/*', '!**/*.min.*'], { restore: true });

  return gulp.src([
    './Custom/Source/css/**/*.scss',
    './Custom/Source/css/**/*.css',
    '!./Custom/Source/css/**/_*.scss'
  ])
    .pipe($.plumber())
    .pipe(minFilter)
    .pipe($.sourcemaps.init())
    .pipe(sassFilter)
    .pipe($.sass({
      'precision': 8,
      includePaths: ['./Custom/Source/css']
    })
      .on('error', function(err) {
        $.util.log(err);
        this.emit('end');
      }))
    .pipe(sassFilter.restore)
  .pipe(gulp.dest('./Custom/Build/css'))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.bytediff.start())
    .pipe($.cleanCss({ 'compatibility': 'ie7' }))
    .pipe($.autoprefixer({ browsers: ['last 2 version', 'iOS >= 8', 'Android >= 4.4', 'ie > 10'] }))
    .pipe($.bytediff.stop(outputDiff))
    .pipe($.sourcemaps.write('.'))
    .pipe(minFilter.restore)
  .pipe(gulp.dest('./Custom/Build/css'))
    .on('error', $.util.log);
});

gulp.task('scripts', 'Compile & minify all Javascript', ['clean-scripts'], function() {
  var minFilter = $.filter(['**/*', '!**/*.min.*'], { restore: true });

  return gulp.src([
    './Custom/Source/js/**/*.js',
    '!./Custom/Source/js/**/_*.js'
  ])
    .pipe($.plumber())
    .pipe(minFilter)
    .pipe($.include())
  .pipe(gulp.dest('./Custom/Build/js'))
    .pipe($.sourcemaps.init())
    .pipe($.bytediff.start())
    .pipe($.uglify())
    .pipe($.bytediff.stop(outputDiff))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(minFilter.restore)
  .pipe(gulp.dest('./Custom/Build/js'))
    .on('error', $.util.log);
});

gulp.task('watch', 'Automatically rebuild scripts & styles (long-running)', ['build'], function() {
  gulp.watch(['./Custom/Source/css/**/*.scss', './Custom/Build/css/**/*.css'], ['styles']);
  gulp.watch(['./Custom/Source/js//**/*.js'], ['scripts']);
});

gulp.task('build', 'Recompile styles & scripts', function(callback) {
  runSequence(['styles', 'scripts'], callback)
});
