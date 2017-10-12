# get-installed-path [![npm version][npmv-img]][npmv-url] [![github release][github-release-img]][github-release-url] [![mit License][license-img]][license-url] [![NPM Downloads Total][downloads-total-img]][npmv-url] 

<!--
[![NPM Downloads Weekly][downloads-weekly-img]][npmv-url]
[![NPM Downloads Total][downloads-total-img]][npmv-url] -->

> Get installation path where the given package is installed. Works for globally and locally installed packages

<div id="thetop"></div>

You might also be interested in [detect-installed](https://github.com/tunnckocore/detect-installed#readme).

## Quality Assurance :100:

[![Code Climate][codeclimate-img]][codeclimate-url] 
[![Code Style Standard][standard-img]][standard-url] 
[![Linux Build][travis-img]][travis-url] 
[![Code Coverage][codecov-img]][codecov-url] 
[![Dependencies Status][dependencies-img]][dependencies-url] 
[![Renovate App Status][renovate-img]][renovate-url] 
[![Node Version Required][nodeversion-img]][nodeversion-url] 

If you have any _how-to_ kind of questions, please read [Code of Conduct](./CODE_OF_CONDUCT.md) and **join the chat** room or [open an issue][open-issue-url].  
You may also read the [Contributing Guide](./CONTRIBUTING.md). There, beside _"How to contribute?"_, we describe everything **_stated_** by  the badges.

[![tunnckoCore support][chat-img]][chat-url] 
[![Code Format Prettier][prettier-img]][prettier-url] 
[![Node Security Status][nodesecurity-img]][nodesecurity-url] 
[![Conventional Commits][ccommits-img]][ccommits-url] 
[![Semantic Release][semantic-release-img]][semantic-release-url] 
[![First Timers Only][first-timers-only-img]][first-timers-only-url] 

<a target="_blank" rel="nofollow" href="https://app.codesponsor.io/link/K7yYzzA5nb2ZDR4GTKmgUdfe/tunnckoCore/get-installed-path">
  <img alt="Sponsor" width="888" height="68" src="https://app.codesponsor.io/embed/K7yYzzA5nb2ZDR4GTKmgUdfe/tunnckoCore/get-installed-path.svg" />
</a>
<br>
<br>

[![All Contributors Spec][all-contributors-img]](#contributors) 
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url] 
[![Newsletter Subscribe][tinyletter-img]][tinyletter-url] 
[![PayPal Author Support][paypal-donate-img]][paypal-donate-url] 
[![Share Love][share-love-img]][share-love-url] 
[![BitHound Code][bithound-code-img]][bithound-code-url] 

## Table of Contents
- [Install](#install)
- [API](#api)
  * [getInstalledPath](#getinstalledpath)
  * [getInstalledPathSync](#getinstalledpathsync)
- [Related](#related)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

This project requires [**Node.js**][nodeversion-url] **v6** and above. Use [**yarn**](https://yarnpkg.com) **v1** / [**npm**](https://www.npmjs.com) **v5** or above to install it.

```
$ yarn add get-installed-path
```

## API
Review carefully the provided examples and the working [tests](./test/index.js).

### [getInstalledPath](src/index.js#L71)

> Get installed path of globally or locally `name` package.
By default it checks if `name` exists as directory in [global-modules][]
directory of the system. Pass `opts.local` to get path of `name`
package from local directory or from `opts.cwd`. Returns rejected
promise if module not found in global/local `node_modules` folder or
if it exist but is not a directory.

**Params**

* `name` **{string}**: package name    
* `opts` **{Object}**: pass `opts.local` to check locally    
* `returns` **{Promise}**: rejected promise if `name` not a string or is empty string  

**Example**

```jsx
const { getInstalledPath } = require('get-installed-path')

getInstalledPath('npm').then((path) => {
  console.log(path)
  // => '/home/charlike/.nvm/path/to/lib/node_modules/npm'
})

getInstalledPath('foo-bar-barwerwlekrjw').catch((err) => {
  console.log(err.message)
  // => 'module not found "foo-bar-barwerwlekrjw" in path ...'
})

getInstalledPath('npm', {
  local: true
}).catch((err) => {
  console.log(err.message)
  // => 'module not found "foo-bar-barwerwlekrjw" in path ...'
})

getInstalledPath('global-modules', {
  local: true
}).then((path) => {
  console.log(path)
  // => '~/code/get-installed-path/node_modules/global-modules'
})

// If you are using it for some sub-directory
// pass `opts.cwd` to be where the `node_modules`
// folder is.
process.chidr('foo-bar-baz')
getInstalledPath('global-modules', {
  local: true,
  cwd: '../'
}).then((path) => {
  console.log(path)
  // => '~/code/get-installed-path/node_modules/global-modules'
})

// When searching for the path of a package that is required
// by several other packages, its path may not be in the
// closest node_modules. In this case, to search recursively,
// you can use the following:
getInstalledPath('npm', {
 paths: process.mainModule.paths
}).then((path) => {
 // ...
})
// `process.mainModule` refers to the location of the current
// entry script.
```

### [getInstalledPathSync](src/index.js#L124)

> Get installed path of a `name` package synchronous.
Returns `boolean` when `paths` option is used and filepath is directory,
otherwise returns a full filepath OR throws error.

**Params**

* `name` **{string}**: package name    
* `opts` **{Object}**: pass `opts.local` to check locally    
* `returns` **{string}**: The full filepath or throw `TypeError` if `name` not a string or is empty string  

**Example**

```jsx
const { getInstalledPathSync } = require('get-installed-path')

const npmPath = getInstalledPathSync('npm')
console.log(npmPath)
// => '/home/charlike/.nvm/path/to/lib/node_modules/npm'

const gmPath = getInstalledPathSync('global-modules', { local: true })
console.log(gmPath)
// => '~/code/get-installed-path/node_modules/global-modules'
```

**[back to top](#thetop)**

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [detect-installed](https://www.npmjs.com/package/detect-installed): Checks that given package is installed globally or locally. | [homepage](https://github.com/tunnckocore/detect-installed#readme "Checks that given package is installed globally or locally.")
- [global-modules](https://www.npmjs.com/package/global-modules): The directory used by npm for globally installed npm modules. | [homepage](https://github.com/jonschlinkert/global-modules "The directory used by npm for globally installed npm modules.")
- [global-paths](https://www.npmjs.com/package/global-paths): Returns an array of unique "global" directories based on the user's platform… [more](https://github.com/jonschlinkert/global-paths) | [homepage](https://github.com/jonschlinkert/global-paths "Returns an array of unique "global" directories based on the user's platform and environment. The resulting paths can be used for doing lookups for generators or other globally installed npm packages. Node.js / JavaScript.")
- [global-prefix](https://www.npmjs.com/package/global-prefix): Get the npm global path prefix. | [homepage](https://github.com/jonschlinkert/global-prefix "Get the npm global path prefix.")
- [is-installed](https://www.npmjs.com/package/is-installed): Checks that given package is installed locally or globally. Useful for robust… [more](https://github.com/tunnckocore/is-installed#readme) | [homepage](https://github.com/tunnckocore/is-installed#readme "Checks that given package is installed locally or globally. Useful for robust resolving when you want some package - it will check first if it exists locally, then if it exists globally")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

**[back to top](#thetop)**

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue][open-issue-url].  
Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) documents for advices.  

## Author
- [github/tunnckoCore](https://github.com/tunnckoCore)
- [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
- [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2016-2017, [Charlike Mike Reagent](https://i.am.charlike.online). Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on October 12, 2017._  
Project scaffolded and managed with [hela][].

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[charlike-cli]: https://github.com/tunnckoCore/charlike-cli
[dezalgo]: https://github.com/npm/dezalgo
[global-modules]: https://github.com/jonschlinkert/global-modules
[hela]: https://github.com/tunnckoCore/hela
[once]: https://github.com/isaacs/once

<!-- Heading badges -->
[npmv-url]: https://www.npmjs.com/package/get-installed-path
[npmv-img]: https://img.shields.io/npm/v/get-installed-path.svg?label=npm%20version

[open-issue-url]: https://github.com/tunnckoCore/get-installed-path/issues/new
[github-release-url]: https://github.com/tunnckoCore/get-installed-path/releases/latest
[github-release-img]: https://img.shields.io/github/release/tunnckoCore/get-installed-path.svg?label=github%20release

[license-url]: https://github.com/tunnckoCore/get-installed-path/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/get-installed-path.svg

[downloads-weekly-img]: https://img.shields.io/npm/dw/get-installed-path.svg
[downloads-monthly-img]: https://img.shields.io/npm/dm/get-installed-path.svg
[downloads-total-img]: https://img.shields.io/npm/dt/get-installed-path.svg

<!-- Front line badges -->
[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/get-installed-path
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/get-installed-path.svg

[standard-url]: https://github.com/standard/standard
[standard-img]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

[travis-url]: https://travis-ci.org/tunnckoCore/get-installed-path
[travis-img]: https://img.shields.io/travis/tunnckoCore/get-installed-path/master.svg?label=linux

[codecov-url]: https://codecov.io/gh/tunnckoCore/get-installed-path
[codecov-img]: https://img.shields.io/codecov/c/github/tunnckoCore/get-installed-path/master.svg

[dependencies-url]: https://david-dm.org/tunnckoCore/get-installed-path
[dependencies-img]: https://img.shields.io/david/tunnckoCore/get-installed-path.svg

[renovate-url]: https://renovateapp.com
[renovate-img]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg

<!-- Second front of badges -->

[chat-url]: https://tunnckocore.flock.com/?i=cx2xoeofjtj6eo6c
[chat-img]: https://img.shields.io/badge/chat-on_flock-brightgreen.svg

[prettier-url]: https://github.com/prettier/prettier
[prettier-img]: https://img.shields.io/badge/styled_with-prettier-f952a5.svg

[nodesecurity-url]: https://nodesecurity.io/orgs/tunnckocore-dev/projects/fd91a3c7-498b-4ff8-8f29-5d93a9d97626
[nodesecurity-img]: https://nodesecurity.io/orgs/tunnckocore-dev/projects/fd91a3c7-498b-4ff8-8f29-5d93a9d97626/badge
<!-- the original color of nsp: 
[nodesec-img]: https://img.shields.io/badge/nsp-no_known_vulns-35a9e0.svg -->

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://img.shields.io/badge/conventional_commits-1.0.0-yellow.svg

[nodeversion-url]: https://nodejs.org/en/download
[nodeversion-img]: https://img.shields.io/node/v/get-installed-path.svg

[first-timers-only-img]: https://img.shields.io/badge/first--timers--only-friendly-blue.svg
[first-timers-only-url]: http://www.firsttimersonly.com

[prs-welcome-img]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-welcome-url]: http://makeapullrequest.com

[all-contributors-img]: https://img.shields.io/github/contributors/tunnckoCore/get-installed-path.svg?label=all%20contributors&colorB=ffa500

[bithound-deps-url]: https://www.bithound.io/github/tunnckoCore/get-installed-path/master/dependencies/npm
[bithound-deps-img]: https://www.bithound.io/github/tunnckoCore/get-installed-path/badges/dependencies.svg

[bithound-code-url]: https://www.bithound.io/github/tunnckoCore/get-installed-path/master
[bithound-code-img]: https://www.bithound.io/github/tunnckoCore/get-installed-path/badges/code.svg

[paypal-donate-url]: https://paypal.me/tunnckoCore/10
[paypal-donate-img]: https://img.shields.io/badge/paypal-donate-009cde.svg

[tinyletter-url]: https://tinyletter.com/tunnckoCore
[tinyletter-img]: https://img.shields.io/badge/newsletter-subscribe-9caaf8.svg

[share-love-url]: https://twitter.com/intent/tweet?text=https://github.com/tunnckoCore/get-installed-path&via=tunnckoCore
[share-love-img]: https://img.shields.io/badge/share-♥-ed1c24.svg

