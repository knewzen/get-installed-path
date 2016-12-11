/*!
 * get-installed-path <https://github.com/tunnckoCore/get-installed-path>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const fs = require('fs')
const test = require('mukla')
const mkdirp = require('mkdirp')
const getDir = require('pkg-dir')
const rimraf = require('rimraf')
const getInstalledPath = require('./index')

test('sync: should throw if exists but not a directory', (done) => {
  function fixture () {
    fs.writeFileSync('./node_modules/aaaaa-xxx-x-sasas', 'abc')
    getInstalledPath.sync('aaaaa-xxx-x-sasas', { local: true })
  }

  test.throws(fixture, Error)
  test.throws(fixture, /Possibly "aaaaa-xxx-x-sasas" is not a directory/)
  test.throws(fixture, /some error occured/)
  rimraf.sync('./node_modules/aaaaa-xxx-x-sasas')
  done()
})

test('async: should get TypeError when invalid `name` is passed', () => {
  return getInstalledPath(1234).catch((err) => {
    test.strictEqual(err.name, 'TypeError')
    test.strictEqual(/expect `name` to be string/.test(err.message), true)
  })
})

test('async: should return absolute path if exists globally', () => {
  return getInstalledPath('npm').then((fp) => {
    test.strictEqual(/node_modules/.test(fp), true)
    test.strictEqual(/npm/.test(fp), true)
  })
})

test('async: should return Error if not exists glboally', () => {
  return getInstalledPath('foo-bar-bqwewrwevdfg-sa').catch((err) => {
    test.strictEqual(/module not found/.test(err.message), true)
    test.strictEqual(/"foo-bar-bqwewrwevdfg-sa" in path/.test(err.message), true)
  })
})

test('async: should return absolute path if exists locally', () => {
  return getInstalledPath('global-modules', {
    local: true
  }).then((fp) => {
    test.strictEqual(/get-installed-path/.test(fp), true)
    test.strictEqual(/node_modules/.test(fp), true)
    test.strictEqual(/global-modules/.test(fp), true)
  })
})

test('async: should return Error if not exists locally', () => {
  return getInstalledPath('sdfjkhskh3-sf9sd78fsdf', {
    local: true
  }).catch((err) => {
    test.strictEqual(/module not found/.test(err.message), true)
    test.strictEqual(/"sdfjkhskh3-sf9sd78fsdf" in path/.test(err.message), true)
    test.strictEqual(/get-installed-path/.test(err.message), true)
    test.strictEqual(/node_modules/.test(err.message), true)
  })
})

/**
 * testing synchronous mode
 */

test('synchronous: should throw TypeError when invalid `name` is passed', (done) => {
  function fixture () {
    getInstalledPath.sync(1234)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `name` to be string/)
  done()
})

test('synchronous: should return absolute path if exists globally', () => {
  return new Promise((resolve) => {
    const fp = getInstalledPath.sync('npm')
    test.strictEqual(/node_modules/.test(fp), true)
    test.strictEqual(/npm/.test(fp), true)
    resolve()
  })
})

test('synchronous: should throw Error if not exists globally', (done) => {
  function fixture () {
    getInstalledPath.sync('foo-bar-bqwewrwevdfg-sa')
  }

  test.throws(fixture, Error)
  test.throws(fixture, /module not found/)
  test.throws(fixture, /"foo-bar-bqwewrwevdfg-sa" in path/)
  test.throws(fixture, /node_modules/)
  done()
})

test('synchronous: should return absolute path if exists locally', () => {
  return new Promise((resolve) => {
    const filepath = getInstalledPath.sync('global-modules', {
      local: true
    })
    test.strictEqual(/get-installed-path/.test(filepath), true)
    test.strictEqual(/node_modules/.test(filepath), true)
    test.strictEqual(/global-modules/.test(filepath), true)
    resolve()
  })
})

test('synchronous: should throw Error if not exists locally', (done) => {
  function fixture () {
    getInstalledPath.sync('sdfjkhskh3-sf9sd78fsdf', {
      local: true
    })
  }

  test.throws(fixture, Error)
  test.throws(fixture, /module not found "sdfjkhskh3-sf9sd78fsdf"/)
  test.throws(fixture, /in path.*node_modules/)
  done()
})

test('synchronous: should work for subdirs (issue #5), exists locally', (done) => {
  const dirname = __dirname
  mkdirp.sync('barrr')
  process.chdir('barrr')

  const filepath = getInstalledPath.sync('global-modules', {
    cwd: getDir.sync(),
    local: true
  })
  test.strictEqual(/node_modules/.test(filepath), true)
  test.strictEqual(/global-modules/.test(filepath), true)
  process.chdir(dirname)
  rimraf.sync('barrr')
  done()
})

test('async: should work for #5, not exists locally', () => {
  const dirname = __dirname
  mkdirp.sync('subdir')
  process.chdir('subdir')

  return getInstalledPath('npm', {
    cwd: getDir.sync(),
    local: true
  }).catch((err) => {
    test.strictEqual(/module not found "npm" in path/.test(err.message), true)
    process.chdir(dirname)
    rimraf.sync('subdir')
  })
})
