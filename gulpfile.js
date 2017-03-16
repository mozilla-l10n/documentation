var gulp = require("gulp");
var through2 = require("through2");
var markdownlint = require("markdownlint");

gulp.task("markdownlint", function task() {
  return gulp.src(["**/*.md", "!./node_modules/**"], { "read": false })
    .pipe(through2.obj(function obj(file, enc, next) {
      markdownlint(
        {
            "files": [ file.relative ],
            "config": require("./.markdownlint.json")
        },
        function callback(err, result) {
          var resultString = (result || "").toString();
          if (resultString) {
            console.log(resultString);
          }
          next(err, file);
        });
    }));
});

gulp.task('default', ['markdownlint']);
