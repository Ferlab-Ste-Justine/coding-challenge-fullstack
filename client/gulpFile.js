/* eslint-disable no-console, no-use-before-define */
const browserify       = require("browserify")
const watchify         = require("watchify")
const gulp             = require("gulp")
const uglify           = require("gulp-uglify-es").default
const source           = require("vinyl-source-stream")
const buffer           = require("vinyl-buffer")
const htmlReplace      = require("gulp-html-replace")
const envify           = require('envify/custom')
const notifier         = require('node-notifier')
const sass             = require('gulp-sass')
const clean            = require('gulp-clean')
const uuidv4           = require('uuid/v4')
const strip            = require('gulp-strip-comments')
const concat           = require('gulp-concat')

require("dotenv").config()

/**
 *    Development tasks
 */

gulp.task("clean", _cb => {
    return gulp.src('tmp/', {read: false})
        .pipe(clean())
})

gulp.task("sass", cb => {
    gulp.src(['sass/index.scss', 'node_modules/react-toastify/dist/ReactToastify.css'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', err => {
        notifier.notify({
            title: "Sass Error",
            message: err.message
        })
        cb(err)
    }))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('tmp/static/css'))
    .on("finish", () => {
        cb()
    })
})

gulp.task("fonts", cb => {
    gulp.src("static/fonts/**")
    .pipe(gulp.dest("tmp/static/fonts"))
    .on("finish", () => {
        cb()
    })
})

gulp.task("js", cb => {
    let bundler = browserify({
        entries      : "js/index.jsx",
        debug        : true,
        cache        : {},
        poll         : true,
        packageCache : {},
        extensions   : [ '.js', '.jsx' ]
    })
    .transform('babelify', {
        presets : ["es2015", "react"],
        plugins: ["transform-es2015-destructuring", "transform-object-rest-spread", "transform-class-properties"]
    })
    .transform(envify({
        _                     : 'purge',
        NODE_ENV              : process.env.NODE_ENV,
        REACT_ENV             : process.env.NODE_ENV,
        REACT_SOCKET_URL      : process.env.REACT_SOCKET_URL,
        BASE_URL              : process.env.BASE_URL
    }))

    // if (global.fast_watch) {
        bundler = watchify(bundler)

        bundler.on('update', () => {
            return bundle()
        })
    // }

    function bundle() {
        console.log('Starting JS...')

        return bundler.bundle()
            .on('error', err => {
                notifier.notify({
                    title: "JS Error",
                    message: err.message
                })
                cb(err)
            })
            .pipe(source("index.js"))
            .pipe(gulp.dest("tmp/static/js/"))
            .on("finish", () => {
                notifier.notify({
                    title   : "Gulp Reloaded",
                    message : "Successfully Reloaded"
                })

                console.log('JS reloaded.')
            })
    }

    return bundle()
})

gulp.task("img", cb => {
    gulp.src("static/img/**/*")
    .pipe(gulp.dest("tmp/static/img"))
    .on("finish", () => {
        cb()
    })
})

gulp.task("sitemap", cb => {
    gulp.src("root/sitemap.xml")
    .pipe(strip())
    .pipe(gulp.dest("tmp/"))
    .on("finish", () => {
        cb()
    })
})

gulp.task("html", cb => {
    const cacheUUID = uuidv4()
    gulp.src("root/index.html")
    .pipe(htmlReplace({
        css : `/static/css/index.css?v=${cacheUUID}`,
        js  : `/static/js/index.js?v=${cacheUUID}`
    }))
    .pipe(strip())
    .pipe(gulp.dest("tmp/"))
    .on("finish", () => {
        cb()
    })
})

gulp.task("watch", () => {
    gulp.start("default")
    gulp.watch(["sass/**/*.scss"], ["sass"])
    gulp.watch(["static/fonts/**"], ["fonts"])
    gulp.watch(["js/**/*.js", "js/**/*.jsx"], ["html"])
    gulp.watch(["static/img/**"], ["img"])
    gulp.watch(["root/index.html"], ["html"])
})

gulp.task("default", ["sass", "fonts", "js", "img", "sitemap", "html"])