---
title: Javascript의 Arrow function, async
tags:
  - Javascript
date: 2017-05-16
aliases: 
  - ../articles/2017-05/javascript-async
---

## Arrow function expression (=>)
- function 표현에 짧게 표현할 수 있는 장점과 자신의 this, arguments, super 또는 new.target을 바인딩 하지 않습니다.
- Arrow function는 항상 익명입니다.
- ECMAScript6부터 지원합니다.

### 표기법

``` javascript
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 다음과 동일함:  => { return expression; }

// 매개변수가 하나뿐인 경우 괄호는 선택사항:
(singleParam) => { statements }
singleParam => { statements }

// 매개변수가 없는 함수는 괄호가 필요:
() => { statements }

// 객체 리터럴 식을 반환하는 본문(body)을 괄호 속에 넣음:
params => ({foo: bar})

// 나머지 매개변수 및 기본 매개변수가 지원됨
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// 매개변수 목록 내 비구조화도 지원됨
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```

### 예제 코드

``` javascript
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length );
```

## async
- `AsyncFunction object`을 Return하는 function 앞에 명시하는 것이다.
- `async function`은 `await`라는 표현을 가지고 있다.
- `await`를 통해 `async`는 대기하고 `promise`를 받은 이후에 실행된다.

### 표기법

``` javascript
async function name([param[, param[, ... param]]]) {
   statements
}
```

### 예제 코드

``` javascript
function Task1() {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Task 1');
                resolve('TASK1 RESULT');
            }, 1000);
    });
}


function Task2(arg1, arg2) {
    return new Promise( (resolve, reject) => {
        const result = arg1 + arg2;
        setTimeout(()=>{
            resolve(result);
        }, 1000);
    });
}

async function doIt() {
    try {
        let r1 = await Task1();
        let r2 = await Task1();
        let sum = await addTask(r1, r2);
        console.log('Random Numbers : ', r1, r2);
        console.log('Sum =', sum);
    } catch (error) {
        console.log('Task Failure', error);
    }
}

doIt();
```


## Reference
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98>
