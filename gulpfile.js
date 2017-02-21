// Requires
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var data = require('gulp-data');
var del = require('del');
var fs = require('fs');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var svgSprite = require('gulp-svg-sprite');


var svgConfig = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'sprite', // destination foldeer
      sprite: 'sprite.svg', //sprite name
      prefix: '.svg--%s', // BEM-style prefix if styles rendered
      example: true // Build sample page
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};


// BrowserSync reload
function reload(cb) {
  browserSync.reload();
  cb();
}


// CSS Task
gulp.task('css', function() {
  var processors = [
    autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions',
        'firefox ESR',
        'ie >= 10',
        'edge >= 12',
        'safari >= 7',
        'ios >= 7',
        'android >= 4.4',
        'ie_mob >= 10'
      ]
    }),
    cssnano({
      autoprefixer: false,
      safe: true
    })
  ];

  return gulp.src('src/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// JS Task
gulp.task('js', function() {
  return gulp.src([
      // include vendor files here
      'src/js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// HTML Task
gulp.task('html', function() {
  return gulp.src('src/views/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});


// Images Task
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(changed('dist/img'))
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});


// Fonts Task
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// Sprite svg
gulp.task('sprite-page', function() {
  return gulp.src('src/svg/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('src/svg'));
});

gulp.task('sprite-shortcut', function() {
  return gulp.src('src/svg/**/*')
    .pipe(gulp.dest('dist/svg'));
});

gulp.task('svg-sprite', 
  gulp.series('sprite-page', 'sprite-shortcut')
);

// Clean Task
gulp.task('clean', function() {
  return del(['dist']);
});

// Serve task
gulp.task('serve', function() {
  browserSync.init({
    notify: false,
    server: 'dist'
  });
});


// Watch task
gulp.task('watch', function() {
	gulp.watch('src/css/**/*.scss', gulp.series('css'));
	gulp.watch('src/js/**/*.js', gulp.series('js', reload));
	gulp.watch(['src/**/*.pug', 'src/**/*.html', 'src/**/*.json'], gulp.series('html', reload));
	gulp.watch('src/img/**/*', gulp.series('images'));
	gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch(['src/svg/**/*.svg', '!src/svg/sprite/**/*'], gulp.series('svg-sprite'));
});

// Default Task
gulp.task('default',
  gulp.parallel('css', 'js', 'html', 'images', 'fonts', 'svg-sprite')
);

// Dev task : build, serve and watch
gulp.task('dev',
  gulp.series(
    'default',
    gulp.parallel('serve', 'watch')
  )
);

// Build task : clean and build
gulp.task('build',
  gulp.series('clean', 'default')
);
