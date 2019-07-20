const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const spritesmith = require("gulp.spritesmith");
const rimraf = require("rimraf");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const cssIndexFiles = [
  "./source/styles/mainStyles/*.scss",
  "./source/styles/index/**/*.scss"
];

const cssCatalogFiles = [
  "./source/styles/mainStyles/*.scss",
  "./source/styles/catalog/**/*.scss"
];

const cssFormFiles = [
  "./source/styles/mainStyles/*.scss",
  "./source/styles/form/**/*.scss",
  "./source/styles/catalog/header.scss"
];

/* *******SERVER******* */
gulp.task("server", function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "./"
    }
  });
  gulp.watch(cssIndexFiles, gulp.series("styles:compileIndex"));
  gulp.watch(cssCatalogFiles, gulp.series("styles:compileCatalog"));
  gulp.watch("./*.html").on("change", browserSync.reload);
});

/* *******JS******* */
gulp.task("js", function() {
  return (
    gulp
      .src(["source/js/**/*.js"])
      // .pipe(babel({
      // 	presets: ['@babel/env']
      // }))
      .pipe(sourcemaps.init())
      .pipe(concat("main.min.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("build/js"))
  );
});

/* *******SASS******* */
gulp.task("styles:compileIndex", function() {
  return gulp
    .src(cssIndexFiles)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("mainIndex.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
  // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  // .pipe(rename('main.min.css'))
  // .pipe(gulp.dest('build/css'));
});

gulp.task("styles:compileCatalog", function() {
  return gulp
    .src(cssCatalogFiles)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("mainCatalog.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
  // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  // .pipe(rename('main.min.css'))
  // .pipe(gulp.dest('build/css'));
});

gulp.task("styles:compileForm", function() {
  return gulp
    .src(cssFormFiles)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("mainForm.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
  // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  // .pipe(rename('main.min.css'))
  // .pipe(gulp.dest('build/css'));
});

/* *******SPRITES******* */
gulp.task("sprite", function(cb) {
  const spriteData = gulp.src("source/images/icons/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      imgPath: "../images/sprite.png",
      cssName: "sprite.scss"
    })
  );

  spriteData.img.pipe(gulp.dest("build/images/"));
  spriteData.css.pipe(gulp.dest("source/styles/global/"));
  cb();
});

/* *******CLEANER******* */
gulp.task("clean", function del(cb) {
  return rimraf("build", cb);
});

/* *******COPY FONTS******* */
gulp.task("copy:fonts", function() {
  return gulp.src("./source/fonts/**/*.woff2").pipe(gulp.dest("build/fonts"));
});

/* *******COPY IMAGES******* */
gulp.task("copy:images", function() {
  return gulp.src("./source/images/**/*.*").pipe(gulp.dest("build/images"));
});

/* *******COPY FONTS AND IMAGES******* */
gulp.task("copy", gulp.parallel("copy:fonts", "copy:images"));

/* *******WATCHERS******* */
gulp.task("watch", function() {
  gulp.watch(cssIndexFiles, gulp.series("styles:compileIndex"));
  gulp.watch(cssCatalogFiles, gulp.series("styles:compileCatalog"));
  gulp.watch(cssFormFiles, gulp.series("styles:compileForm"));
  gulp.watch("source/js/**/*.js", gulp.series("js"));
});

gulp.task(
  "dev",
  gulp.series(
    "styles:compileIndex",
    "styles:compileCatalog",
    "styles:compileForm",
    "js",
    gulp.parallel("watch", "server")
  )
);

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel(
      "styles:compileIndex",
      "styles:compileCatalog",
      "styles:compileForm",
      "js",
      "sprite",
      "copy"
    ),
    gulp.parallel("watch", "server")
  )
);
