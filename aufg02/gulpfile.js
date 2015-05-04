var gulp = require('gulp'),                         //used all
    autoprefixer = require('gulp-autoprefixer'),    //used 8
    minifycss = require('gulp-minify-css'),         //used 9
    jshint = require('gulp-jshint'),                //used 4
    uglify = require('gulp-uglify'),                //used 5
    imagemin = require('gulp-imagemin'),            //used 2
    concat = require('gulp-concat'),                //used 5
    notify = require('gulp-notify'),                //used all
    del = require('del'),                           //used all
    babel = require('gulp-babel'),                  //used 6
    sass = require('gulp-sass'),                    //used 7
    header = require('gulp-header'),                //used 10
    minifyHTML = require('gulp-minify-html');       //used 3

//##########################################################################################################DEFAULT TASK
//Ausführen der Aufgaben in einem 'default'-Task
gulp.task("default", ["clean"], function() {
    gulp.start("copyIndex", "comprImage", "minifyHTML", "jsHint", "minCat", "ecmaToJS", "sassToCss", "cssPrefix",
     "mssMini", "copyright");
});
//############################################################################################################CLEAN TASK
gulp.task("clean", function(cb){
    console.log("...clean...");
    del(["./playzone/copy", "./playzone/image/compressed", "./playzone/mini", "./playzone/jshint/out.log",
        "./playzone/uglyConcat", "./playzone/ecma", "./playzone/css", "./dist"], cb);
    console.log("...clean finished...");
});

//##############################################################################################################Aufgaben
//Kopieren der Datei index.html in das Verzeichnis “copy”
gulp.task("copyIndex", function(){
    //Copy index
    return gulp.src("./index.html")
        .pipe(gulp.dest("./playzone/copy"))
        .pipe(notify({ message: 'copyIndex done' }));
});
//Kompression aller Bilder und Vektoren mit gulp-imagemin
gulp.task("comprImage", function(){
    return gulp.src("./playzone/image/raw/*")
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('./playzone/image/compressed'))
        .pipe(notify({ message: 'comprImage done' }));
});
//Minifizierung von HTML-Dateien mit gulp-minify-html
gulp.task("minifyHTML", function(){
    return gulp.src("./index.html")
        .pipe(minifyHTML())
        .pipe(gulp.dest("./playzone/mini"))
        .pipe(notify({ message: 'minifyHTML done' }));
});
//Überprüfung von Javascript-Dateien mit gulp-jshint
gulp.task("jsHint", function(){
    //Copy index
    return gulp.src("./gulpfile.js")
        .pipe(jshint())
        //.pipe(jshint.reporter('default')) //print on console
        //quelle: https://www.npmjs.com/package/gulp-jshint-file-reporter
        .pipe(jshint.reporter('gulp-jshint-file-reporter', {
            filename: __dirname + '/playzone/jshint/out.log'
        }))
        .pipe(notify({ message: 'jsHint done' }));
});
//Minifizierung von Javascript-Dateien mit gulp-uglify und Zusammenfassen von Javascript-Dateien mit gulp-concat
gulp.task("minCat", function(){
    //Copy index
    return gulp.src(["./gulpfile.js", "concatFile.js"])
        .pipe(concat("./all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./playzone/uglyConcat"))
        .pipe(notify({ message: 'minCat done' }));
});
//Transpilierung von ES6-Dateien mit gulp-babel
gulp.task("ecmaToJS", function(){
    //Copy index
    return gulp.src("./ecma.es6")
        .pipe(babel())
        .pipe(gulp.dest("./playzone/ecma"))
        .pipe(notify({ message: 'ecmaToJS done' }));
});
//Konvertierung der Sass-Dateien in CSS-Dateien mit gulp-css
gulp.task("sassToCss", function(){
    //quelle: http://sass-lang.com/guide
    return gulp.src("./style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./playzone/css"))
        .pipe(notify({ message: 'sassToCss done' }));
});
//Anpassen der Prefixes in CSS-Dateien mit gulp-autoprefixer
gulp.task("cssPrefix", function(){
    return gulp.src('./prefix.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./playzone/css'))
        .pipe(notify({ message: 'cssPrefix done' }));
});
//Minifizierung der CSS-Dateien mit gulp-minify-css
gulp.task("mssMini", function(){
    return gulp.src(["./prefix.css", "./style.scss"])
        .pipe(concat("./mini.css"))
        .pipe(minifycss())
        .pipe(gulp.dest('./playzone/css'))
        .pipe(notify({ message: 'mssMini done' }));
});
//Hinzufügen eines Copyright-Texts mit gulp-header
gulp.task("copyright", function(){
    return gulp.src("./index.html")
        .pipe(header('Hello ${name}\n', { name : 'Copyright Text'} ))
        .pipe(gulp.dest('./playzone/copy/header'))
        .pipe(notify({ message: 'copyright done' }));
});
//Kopieren aller Dateien in einen Ordner „dist“ für den Upload
gulp.task("distCopy", function(){
    return gulp.src("./**/*")
        .pipe(gulp.dest('./dist'));
        //.pipe(notify({ message: 'distCopy done' }));
});
//Überwachung von [*es6|*.js|*.scss]-Dateien auf mögliche Änderungen
gulp.task("watchFiles", function(){
    gulp.watch('./**/*.es6', ['watchEs6']);
    gulp.watch('./**/*.js', ['watchJs']);
    gulp.watch('./**/*.scss', ['watchScss']);
});
gulp.task("watchEs6", function(){
    console.log("es6 changed");
});
gulp.task("watchJs", function(){
    console.log("js changed");
});
gulp.task("watchScss", function(){
    console.log("scss changed");
});