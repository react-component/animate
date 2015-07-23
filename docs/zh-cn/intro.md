## 使用 rc-animate 快速对 react element 动画

原文： https://github.com/react-component/animate/blob/master/docs/zh-cn/intro.md

[近期很多组件](http://ant.design/) 侧重于动画效果，而 react 一开始仅仅是有 [简单](http://facebook.github.io/react/docs/animation.html) 的支持，现在则是比较难理解的 [react-motion](https://github.com/chenglou/react-motion)，
在我看下还是 [angular-animate](https://github.com/angular/bower-angular-animate) 的 api 好用些. 这次刚好统一下组件动画，
抽取出 [rc-animate](https://github.com/react-component/animate) 模块，通过该模块可以很方便得进行动画.

以下示例可见： http://react-component.github.io/animate/examples/

### 使用场景

#### css animation for single element

http://react-component.github.io/animate/examples/simple.html
 
对单个元素根据状态进行动画显示隐藏，只需
 
 ```html
 <Animate
           component=""
           showProp='data-show'
           transitionName="fade">
           <div data-show={this.state.enter} key="1" style={{
           display:this.state.enter?'block':'none',
           marginTop: '20px',
           width: '200px',
           height: '200px',
           backgroundColor: 'red'
           }}></div>
         </Animate>
 ```
 
 那么当改变 enter 状态时，会自动根据 enter 的 true false 值，在 div 节点上加 fade-enter fade-enter-active 或 fade-leave fade-leave-active 样式名
 
 #### remove element after css animation
 
 也可以不设置 showProp 属性，那么就会根据 <Animate> 元素有没有 children 进行 enter leave 的动画了
 
 http://react-component.github.io/animate/examples/simple-remove.html
 
 ```html
 <Animate
           component=""
           transitionName="fade">
           {this.state.enter?<div key="1" style={{
           display:this.state.enter?'block':'none',
           marginTop: '20px',
           width: '200px',
           height: '200px',
           backgroundColor: 'red'
           }}></div>:null}
         </Animate>
 ```
 
 #### js animation for single element
 
 http://react-component.github.io/animate/examples/simple-animation.html
 
 可以设置 animation 对象为 js 函数来实现 js 动画
 
 ```html
 <Animate
           component=""
           showProp='data-show'
           animation={{
             enter:this.animateEnter,
             leave:this.animateLeave
           }}>
           <div data-show={this.state.enter} key="1" style={{
           marginTop: '20px',
           width: '200px',
           height: '200px',
           backgroundColor: 'red'
           }}></div>
         </Animate>
 ```
 
 js 函数定义如下
 
 ```js
  animateEnter(node, done){
     $(node).css('display', 'none');
     $(node).slideDown(1000, done);
     return {
       stop: function () {
         $(node).stop(true, true);
       }
     };
   },
 
   animateLeave(node, done){
     $(node).css('display', '');
     $(node).slideUp(1000, done);
     return {
       stop: function () {
         $(node).stop(true, true);
       }
     };
   },
 ```
 
#### children animation
 
 这时候 component 就不能留空了，可以不填，默认为 span 包裹 children，代码就不举例了，基本就是参考单个元素线性扩展到多元素
 
##### remove child after animation
 
可以根据 children 的内容来动态进行动画: http://react-component.github.io/animate/examples/todo.html

##### keep child after animation

动画后也可以保留 children: http://react-component.github.io/animate/examples/hide-todo.html

#### js animation for children

同样可以利用 js 来进行动画 ： http://react-component.github.io/animate/examples/todo-animation.html

### react-component animation demo using rc-animate

一些组件使用该模块进行的动画:

dialog: http://react-component.github.io/dialog/examples/ant-design.html

tabs: http://react-component.github.io/tabs/examples/ant-design.html

### 感想

终于折腾出一个比较满意的新组件了，现在写个组件竞争太激烈了....