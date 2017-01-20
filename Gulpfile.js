const gulp = require('gulp');
const config = require('config');
const runner = require('punchcard-runner');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const path = require('path');

const options = runner.config({
  application: {
    library: {
      src: [
        'lib',
        'config',
        'content-types',
        'input-plugins',
        'workflows',
      ],
    },
  },
  tasks: {
    nodemon: {
      extension: 'js html yml',
    },
    build: {
      clean: [
        'clean:public',
      ],
      assets: [
        'sass',
        'imagemin',
        'js',
        'punchcard:js',
        'punchcard:images',
      ],
    },
    watch: [
      'browser-sync',
      'js:watch',
      'sass:watch',
      'imagemin:watch',
    ]
  },
  server: {
    port: config.env.port,
    host: config.env.host,
  },
});

runner(gulp, options);


gulp.task('punchcard:js', () => {
  return gulp.src('node_modules/punchcard-cms/src/js/**/*.js')
    .pipe(concat('punchcard.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(options.assets._folders.public, options.assets.js.dest)));
});

gulp.task('punchcard:images', () => {
  return gulp.src('node_modules/punchcard-cms/src/images/**/*')
    .pipe(imagemin(options.tasks.images.build.options))
    .pipe(gulp.dest(path.join(options.assets._folders.public, options.assets.images.dest)));
});
