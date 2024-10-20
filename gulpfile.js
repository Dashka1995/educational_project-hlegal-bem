// const либо let либо var - объявление переменной, где ... gulp = ...; - название переменной
const gulp = require("gulp");
const rimraf = require("rimraf");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

gulp.task("clean", (cb) => {
    rimraf("./build", cb);
});

gulp.task("css", () => {
    return gulp.src("./dev/scss/**/*.scss")
//возьми в папке dev/в подпапке scss/в любом количестве подпапок/все файлы с расширением .scss
    .pipe(sass())
//возьми и прогони через (ф-цию sass)
    .pipe(autoprefixer())
//возьми и прогони через (ф-цию autoprefixer)
    .pipe(csso())
//возьми и прогони через (ф-цию csso)
    .pipe(rename({
        suffix: ".min"
    }))
//возьми и прогони через (ф-цию rename)
    .pipe(gulp.dest("./build/css"))
//возьми и положи в папку build/css  
});

gulp.task("html", () => {
    return gulp.src("./dev/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("./build"))
});

gulp.task("copy", () => {
    return gulp.src("./dev/assets/**/*")
// возьми папку dev/assets/любое количество подпапок/всё, что лежит внутри
    .pipe(gulp.dest("./build/assets"))
// возьми и положи в папку build/assets
});

gulp.watch("./dev/scss/**/*.scss", gulp.series("css"));
// следи за "папкой dev/scss/любым количеством подпапок/всеми файлами расширения .scss", при изменениях выполняй gulp.series("css") 
gulp.watch("./dev/*.html", gulp.series("html"));
// следи за "папкой dev/scss/любым количеством подпапок/всеми файлами расширения .scss", при изменениях выполняй gulp.series("css") 

gulp.task("start", gulp.series("clean","css", "html", "copy"));
//gulp.parallel - команды выполняются паралельно, gulp.series - команды выполняются последовательно
//проверка

