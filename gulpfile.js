const gulp = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const connect = require("gulp-connect");
const notify = require("gulp-notify");
const gulpWebpack = require("webpack-stream");
const webpack = require("webpack");
const uglify = require("gulp-uglify");

gulp.task('default', ["connect", "watch"], () => {
  console.log("Running Deafeult!!!");
});

gulp.task("connect", () => {
  connect.server({
    livereload: true,
    port: 9500,
    index: 'vendor/index.html'
  });
});

gulp.task('webpack', function() {
   gulp.src(["./app/**/*.js"])
  .pipe(gulpWebpack({
    externals: "./node_modules",
    module: {
      loaders: [
        {
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ]
  }))
  .on('error', function handleError() {
      this.emit('end'); // Recover from errors
  })
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('vendor/js'))
  .pipe(connect.reload());
});

gulp.task('less', () => {
  gulp.src(["./app/views/style/less/*.less"])
  .pipe(less())
  .pipe(concat("all.css"))
  .pipe(cleanCSS())
  .pipe(gulp.dest("./vendor/css/"));
});

gulp.task('html', () => {
  gulp.src(['./app/views/**/*.tpl', '!./app/views/main.tpl'])
  .pipe(gulp.dest("./vendor/"));

  gulp.src('./app/views/main.tpl')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('./vendor/'))
  .pipe(notify("Compiled!!!"));
});

gulp.task("watch", () => {
  gulp.watch([
    "./app/**/*.js",
    "./app/**/*.css",
    "./app/**/*.less",
    "./app/**/*.html",
    "./app/**/*.tpl"
  ], ["less", "webpack", "html"]);
});

gulp.task('build', ['less', 'html', 'webpack']);
