var gulp = require("gulp");
var mocha = require("gulp-mocha");
var plumber = require("gulp-plumber");

function test(preventBreak) {
    var stream = gulp.src(["test/*.js", "test/**/*.js"]);

    stream = stream.pipe(plumber());
    if (preventBreak) {
        console.log("plumber");
    }

    return stream.pipe(mocha({fullTrace: true}));
}

gulp.task("test", function() {
    return test();
});

gulp.task("test-nobreak", function() {
    return gulp.src(["test/*.js", "test/**/*.js"])
        .pipe(plumber())
        .pipe(mocha({fullTrace: true}));
});

gulp.task("watch", function() {
    gulp.watch(["index.js", "test/*.js", "test/**/*.js"], ["test-nobreak"]);
});
