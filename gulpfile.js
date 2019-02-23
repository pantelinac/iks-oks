/* file: gulpfile.js */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');

gulp.task('default', function () {
    /**
     * BOOTSTRAP JS
     */
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('resources/assets/js/')).on('end', function () {
        gulp.src('resources/assets/js/bootstrap.js')
            .pipe(gulp.dest('public/assets/bootstrap/js/'));
    });

    /**
     * BOOTSTRAP CSS
     */
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('resources/assets/css/')).on('end', function () {
        gulp.src('resources/assets/css/bootstrap.css')
            .pipe(gulp.dest('public/assets/bootstrap/css/'));
    });

    /**
     * JQUERY JS
     */
    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('resources/assets/js/')).on('end', function () {
        gulp.src('resources/assets/js/jquery.js')
            .pipe(gulp.dest('public/assets/js/'));
    });

    /**
     * GAME
     */
    gulp.src('resources/assets/js/tictactoe/tictactoe.js')
        .pipe(gulp.dest('public/assets/js/'));

    /**
     * GAME JS
     */
    gulp.src('resources/assets/css/tictactoe.css')
        .pipe(gulp.dest('public/assets/css/'));

    /**
     * IMAGE
     */
    gulp.src('resources/assets/img/*')
        .pipe(gulp.dest('public/assets/images/'));

})

gulp.task('deploy', function () {
    /**
     * UVOZ
     */
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('resources/assets/js/')).on('end', function () {
        gulp.src('resources/assets/js/bootstrap.js')
            .pipe(uglify())
            .pipe(gulp.dest('public/assets/bootstrap/js/'));
    });

    /**
     * BOOTSTRAP CSS
     */
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('resources/assets/css/')).on('end', function () {
        gulp.src('resources/assets/css/bootstrap.css')
            .pipe(cleanCSS())
            .pipe(gulp.dest('public/assets/bootstrap/css/'));
    });

    /**
     * JQUERY JS
     */
    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('resources/assets/js/')).on('end', function () {
        gulp.src('resources/assets/js/jquery.js')
            .pipe(uglify())
            .pipe(gulp.dest('public/assets/js/'));
    });

    /**
     * GAME
     */
    gulp.src('resources/assets/js/tictactoe/tictactoe.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js/'));

    /**
     * GAME CSS
     */
    gulp.src('resources/assets/css/tictactoe.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/assets/css/'));

    /**
     * IMAGE
     */
    gulp.src('resources/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images/'));
})

