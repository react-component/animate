# rc-animate
---

Animate React Component easily.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies][david-image]][david-url]
[![DevDependencies][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/rc-animate.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-animate
[travis-image]: https://img.shields.io/travis/react-component/animate.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/animate
[coveralls-image]: https://img.shields.io/coveralls/react-component/animate.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/animate?branch=master
[david-url]: https://david-dm.org/react-component/animate
[david-image]: https://david-dm.org/react-component/animate/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/animate?type=dev
[david-dev-image]: https://david-dm.org/react-component/animate/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-animate.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-animate
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-animate
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-animate

## Install

[![rc-animate](https://nodei.co/npm/rc-animate.png)](https://npmjs.org/package/rc-animate)

## Usage

```js
import Animate from 'rc-animate';

export default () => (
  <Animate animation={{ ... }}>
    <p key="1">1</p>
    <p key="2">2</p>
  </Animate>
);
```

## Compatibility

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

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
          <td>component</td>
          <td>React.Element/String</td>
          <td>'span'</td>
          <td>wrap dom node or component for children. set to '' if you do not wrap for only one child</td>
        </tr>
        <tr>
          <td>componentProps</td>
          <td>Object</td>
          <td>{}</td>
          <td>extra props that will be passed to component</td>
        </tr>
        <tr>
          <td>showProp</td>
          <td>String</td>
          <td></td>
          <td>using prop for show and hide. [demo](http://react-component.github.io/animate/examples/hide-todo.html) </td>
        </tr>
        <tr>
          <td>exclusive</td>
          <td>Boolean</td>
          <td></td>
          <td>whether allow only one set of animations(enter and leave) at the same time. </td>
        </tr>
        <tr>
          <td>transitionName</td>
          <td>String|Object</td>
          <td></td>
          <td>specify corresponding css, see ReactCSSTransitionGroup</td>
        </tr>
       <tr>
         <td>transitionAppear</td>
         <td>Boolean</td>
         <td>false</td>
         <td>whether support transition appear anim</td>
       </tr>
        <tr>
          <td>transitionEnter</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether support transition enter anim</td>
        </tr>
       <tr>
         <td>transitionLeave</td>
         <td>Boolean</td>
         <td>true</td>
         <td>whether support transition leave anim</td>
       </tr>
       <tr>
         <td>onEnd</td>
         <td>function(key:String, exists:Boolean)</td>
         <td>true</td>
         <td>animation end callback</td>
       </tr>
        <tr>
          <td>animation</td>
          <td>Object</td>
          <td>{}</td>
          <td>
            to animate with js. see animation format below.
          </td>
        </tr>
    </tbody>
</table>

### animation format

with appear, enter and leave as keys. for example:

```js
  {
    appear: function(node, done){
      node.style.display='none';
      $(node).slideUp(done);
      return {
        stop:function(){
          // jq will call done on finish
          $(node).stop(true);
        }
      };
    },
    enter: function(){
      this.appear.apply(this,arguments);
    },
    leave: function(node, done){
      node.style.display='';
      $(node).slideDown(done);
      return {
        stop:function(){
          // jq will call done on finish
          $(node).stop(true);
        }
      };              
    }
  }
```

## Development

```
npm install
npm start
```

## Example

http://localhost:8200/examples/index.md

online example: http://react-component.github.io/animate/examples/

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-animate is released under the MIT license.
