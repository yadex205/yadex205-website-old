/* global desc, task, namespace, complete, fail */

const path       = require('path')
const async      = require('async')
const glob       = require('glob')
const replaceExt = require('replace-ext')
const writeFile  = require('write')
const ejs        = require('ejs')
const sass       = require('node-sass')
const browserify = require('browserify')

desc('Build website')
task('build', ['clean', 'build:html', 'build:css', 'build:js'])

namespace('build', () => {
  desc('Compile EJS files into HTML')
  task('html', { async: true }, () => {
    async.waterfall([
      (done) => { glob('./src/html/**/!(_)*.ejs', done) },
      (files, done) => {
        async.each(files, (file, ejs_done) => {
          let dest = path.join('./htdocs', path.relative('./src/html', replaceExt(file, '.html')))
          async.waterfall([
            (done) => { ejs.renderFile(file, {}, {}, done) },
            (generated, done) => { writeFile(dest, generated, done) }
          ], ejs_done)
        }, done)
      }
    ], (error) => { error ? fail(error) : complete() })
  })

  desc('Compile SASS/SCSS files into CSS')
  task('css', { async: true }, () => {
    async.waterfall([
      (done) => { glob('./src/css/**/*.{sass,scss}', done) },
      (files, done) => {
        async.each(files, (file, sass_done) => {
          let dest = path.join('./htdocs/css', path.relative('./src/css', replaceExt(file, '.css')))
          async.waterfall([
            (done) => { sass.render({ file: file }, done) },
            (result, done) => { writeFile(dest, result.css, done) }
          ], sass_done)
        }, done)
      }
    ], (error) => { error ? fail(error) : complete() })
  })

  desc('Browserify JS files into single JS file')
  task('js', { async: true }, () => {
    let b = browserify({ entries: './src/js/main.js',
                         debug: process.env['NODE_ENV'] === 'production' })
    async.waterfall([
      (done) => { b.bundle(done) },
      (result, done) => { writeFile('./htdocs/js/main.js', result, done) }
    ], (error) => { error ? fail(error) : complete() })
  })
})
