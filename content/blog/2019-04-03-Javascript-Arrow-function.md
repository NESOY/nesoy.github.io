---
title: Javascript Arrow function과 Binding에 대해
tags:
  - Javascript
date: 2019-04-03
aliases: 
  - ../articles/2019-04/Javascript-Arrow-function
---

![[Assets/logo/javascript.png]]
## Arrow function과 Binding에 대해
### Arrow Function이란?
- ES6부터 적용된 문법입니다.
- `() => {}`로 표기
- 짧은 표기 법 / 가독성 향상
- Arrow Function는 생성자로 사용할 수 없습니다.

### Arrow function과 `this`는 Binding이 어떻게 진행될까?
- `dynamic scope`가 아닌 `lexical scope`의 this를 가지고 있습니다.
- `this`뿐만 아니라 `arguments`, `super` or `new.target`도 Binding하지 않습니다.

## `function` vs `Arrow function`

### ES5 function
- 중첩된 구조에서는 각각의 `dynamic scope`가 모두 발생합니다.
- `dynamic scope this`를 가지고 있습니다.

```javascript
function Person() {
  this.age = 0; // `this`를 자신의 인스턴스로 정의.

  setInterval(function growUp() {
    // 비엄격 모드에서, growUp() 함수는 `this`를 전역 객체로 정의
    // 이는 Person() 생성자에 정의된 `this`와 다릅니다.
    // 따라서 외부 age, 내부 age는 다른 Reference를 가지고 있습니다.
    this.age++; // dynamic scope # this
    console.log(this.age); // NaN
  }, 1000);
}

var p = new Person();
```

#### ES5에서 외부/내부 `this`값이 다른 문제점을 해결하기 위해 어떤 노력을 했을까?

```javascript
function Person() {
  var that = this;
  that.age = 0; // 비전역 변수 할당하여 접근

  setInterval(function growUp() {
    // 콜백은  `that` 변수를 참조하고 이것은 값이 기대한 객체이다.
    that.age++;
    console.log(that.age); // 1, 2, 3, 4, ...
  }, 1000);
}

var p = new Person();
```

### ES6 Arrow function
- lexical scope this를 가지고 있습니다.

```javascript
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // lexical scope # this
    console.log(this.age); // 1, 2, 3, 4, ...
  }, 1000);
}

var p = new Person();
```


### Arrow function Case
#### 교체하기 쉬운 경우
- `this`나 `arguments`를 사용하지 않는 경우
- `.bind(this)`를 사용하는 경우

#### 교체하기 힘든 경우
- `new`등을 사용하는 constructable한 함수
- `prototype`에 덧붙여진 함수나 method들(보통 `this`를 사용합니다.)
- `this`, `arguments`, `super`, `new.target`등을 함수의 인자로 사용하는 경우

## Reference
- <http://webframeworks.kr/tutorials/translate/arrow-function/>
- <https://beomi.github.io/2017/07/12/understanding_js_scope_function_vs_arrow/>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98>
