# rc-anim-if-change
---

React AnimIfChange Component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-anim-if-change)](https://saucelabs.com/u/rc-anim-if-change)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-anim-if-change.svg)](https://saucelabs.com/u/rc-anim-if-change)

[npm-image]: http://img.shields.io/npm/v/rc-anim-if-change.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-anim-if-change
[travis-image]: https://img.shields.io/travis/react-component/anim-if-change.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/anim-if-change
[coveralls-image]: https://img.shields.io/coveralls/react-component/anim-if-change.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/anim-if-change?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/anim-if-change.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/anim-if-change
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-anim-if-change.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-anim-if-change

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/anim-if-change/examples/


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard



## install

[![rc-anim-if-change](https://nodei.co/npm/rc-anim-if-change.png)](https://npmjs.org/package/rc-anim-if-change)

## Usage

```js
var AnimIfChange = require('rc-anim-if-change');
var React = require('react');
React.render(<AnimIfChange><div>anim</div></AnimIfChange>, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>changeProp</td>
          <td>String</td>
          <td></td>
          <td>prop name which is used to cause anim when it changed</td>
        </tr>
        <tr>
          <td>remove</td>
          <td>boolean</td>
          <td></td>
          <td>whether remove if anim is completed</td>
        </tr>
        <tr>
          <td>transitionName</td>
          <td>String</td>
          <td></td>
          <td>anim transitionName.</td>
        </tr>
    </tbody>
</table>


## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-anim-if-change is released under the MIT license.
