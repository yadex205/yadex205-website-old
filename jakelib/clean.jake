/* global desc, task, complete, fail */

const rimraf = require('rimraf')

desc('Clean up generated files')
task('clean', { async: true }, () => {
  rimraf('./htdocs/**/*', (error) => {
    error ? fail(error) : complete()
  })
})
