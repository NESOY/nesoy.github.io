---
title: Javascript 클로져(Closure)란?
tags:
  - Javascript
date: 2017-05-04
aliases: 
  - ../articles/2017-05/Javascript-Closure
---

![[Assets/logo/javascript.png]]

## 클로저(Closure)
- 클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.

- 예제 코드

``` javascript
function outter(){
    var title = 'coding everybody'; // 외부 함수
    return function(){  // 내부 함수
        alert(title);
    }
}
inner = outter(); // 결과값이 없다.
inner(); // 실행 결과는 alert(title);
```

- 클로저란 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 **소멸되지 않는 특성을 의미한다**.

### 클로저를 이용해서 private Method 흉내내기
- 아래는 프라이빗 함수와 변수에 접근하는 퍼블릭 함수를 정의할 수 있는 클로저를 사용하는 방법을 보여주는 코드가 있다. 이렇게 클로저를 사용하는 것을 모듈 패턴이라 한다.

``` javascript
var counter = (function() { // 익명 함수 안에서 만들어진다
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return { // Return 객체
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

### 클로져 바인딩 시키기

``` javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 익명 클로저를 사용하여 바인딩할 수 있다.
  }
}

setupHelp();
```


### Let 키워드 사용하기
- let 키워드를 사용하면 블록 범위 변수를 바인딩함으로써 추가적인 클로저를 사용하지 않아도 된다.

``` javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```


## Reference
- <https://opentutorials.org/course/743/6544>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures>
