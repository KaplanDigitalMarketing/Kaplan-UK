var path = require('path');
var gulp = require('gulp-help')(require('gulp'), {
  hideEmpty: true,
  hideDepsMessage: true
});
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var browserify = require ('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var $ = require('gulp-load-plugins')();
var del = require('del');
var vinylPaths = require('vinyl-paths');

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

gulp.task('cleanse-scripts', 'Remove old scripts', function() {
  return gulp.src('./Build/js/*', { read: false })
	.pipe(vinylPaths(del));
});

gulp.task('cleanse-styles', 'Remove old styles', function() {
  return gulp.src('./Build/css/*', { read: false })
	.pipe(vinylPaths(del));
});

gulp.task('clean-styles', 'Remove old styles', function() {
  return gulp.src('./Build/css', { read: false })
    .pipe($.clean());
});

gulp.task('clean-scripts', 'Remove old scripts', function() {
  return gulp.src('./Build/js', { read: false })
    .pipe($.clean());
});

gulp.task('styles', 'Compile, prefix & minify all SCSS', ['cleanse-styles'], function() {
  var sassFilter = $.filter(['**/*.scss'], { restore: true });
  var minFilter = $.filter(['**/*', '!**/*.min.*'], { restore: true });

  return gulp.src([
    './Source/css/**/*.scss',
    './Source/css/**/*.css',
    '!./Source/css/**/_*.scss'
  ])
    .pipe($.plumber())
    .pipe(minFilter)
    .pipe($.sourcemaps.init())
    .pipe(sassFilter)
    .pipe($.sass({
      'precision': 8,
      includePaths: ['./Source/css']
    })
      .on('error', function(err) {
        $.util.log(err);
        this.emit('end');
      }))
    .pipe(sassFilter.restore)
  .pipe(gulp.dest('./Build/css'))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe($.bytediff.start())
    .pipe($.cleanCss({ 'compatibility': 'ie7' }))
    .pipe($.autoprefixer({ browsers: ['last 2 version', 'iOS >= 8', 'Android >= 4.4', 'ie > 10'] }))
    .pipe($.bytediff.stop(outputDiff))
    .pipe($.sourcemaps.write('.'))
    .pipe(minFilter.restore)
  .pipe(gulp.dest('./Build/css'))
    .on('error', $.util.log);
});

gulp.task('scripts', 'Compile & minify all Javascript', ['build-scripts'], function() {
    return gulp.src('./Source/js/**/*.min.js')
      .pipe(gulp.dest('./Build/js'))
      .on('error', $.util.log);
});

gulp.task('build-scripts', ['cleanse-scripts'], function() {
  var bundler = browserify({
    entries: './Source/js/main.js',
    debug: true
  });

  return bundler.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.plumber())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.rename({ basename: 'scripts' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./Build/js'))
    .pipe($.filter(['**/*.js']))
    .pipe($.bytediff.start())
    .pipe($.uglify())
    .pipe($.bytediff.stop(outputDiff))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./Build/js'))
    .on('error', $.util.log);
});

gulp.task('watch', 'Automatically rebuild scripts & styles (long-running)', ['build'], function() {
  gulp.watch(['./Source/css/**/*.scss', './Build/css/**/*.css'], ['styles']);
  gulp.watch(['./Source/js//**/*.js'], ['scripts']);
});

gulp.task('build', 'Recompile styles & scripts', function(callback) {
  runSequence(['styles', 'scripts'], callback)
});
