---
title: NodeJs의 Basic Module(기본 모듈)
tags:
  - NodeJs
date: 2017-04-13
aliases: 
  - ../articles/2017-04/Nodejs-BasicModule
---

![[Assets/posts/20170413/1.PNG]]

## Basic Module(기본 모듈)

### 프로세스 환경
- `os, process, cluster`

### 파일과 경로, URL
- `fs, path, URL, querystring, stream`

### 네트워크 모듈
- `http, https, net, dgram, dns`

### 전역객체(Global)
- 별도의 모듈 로딩없이 사용 가능
- `global.console.log()`
- global 생략 가능

### 주요 전역객체
- `process` : 현재 동작중인 프로세스의 정보
- `console` : 콘솔 출력
- `Buffer` : 이진 데이터를 다루는 버퍼 클래스
- `require` : 모듈 로딩
- `__filename`,`__dirname` : 언더 스코어가 2개. 현재 폴더 경로와 파일 경로
- `module`,`exports` : 로딩된 모듈 정보와 모듈로 타입, 객체 노출시키기
- `Timeout` :  타이머와 반복 용 함수

### process

#### 정보
- `process.env` : 애플리케이션 실행 환경
- `process.version` : Node.js 버전
- `process.arch, process.platform` : CPU와 플랫폼 정보
- `process.argv` : 실행 명령 파라미터

#### 이벤트
- `exit` : 애플리케이션 종료 이벤트
- `beforeExit` : 종료 되기 전에 발생하는 이벤트
- `uncaughtException` : 예외 처리되지 않은 예외 이벤트

#### 함수
- `process.exit(code)` : 애플리케이션 종료
- `process.nextTick(callback)` : 이벤트 루프 내 동작을 모두 실행 후 콜백 실행

#### 결과
- `process.env`

![[Assets/posts/20170413/2.PNG]]

- `process.arch, process.platform`

![[Assets/posts/20170413/3.PNG]]

### Timer
- 지연 동작 : `setTimeout`
- 반복 동작 : `setInterval`

#### 일정 시간 뒤 호출
- `setTimeout(callback, delay, arg, ...)`

``` javascript
function sayHello() {
    console.log('Hello World');
}
/* 3초 후에 실행 */
setTimeout(function () {
    sayHello();
}, 3000);
```

#### 타이머 취소
- `clearTimeout()`

``` javascript
var t = setTimeout(sayHello, 10);
/* 타임아웃 제거 */
clearTimeout(t);
```

#### 반복
- `setInterval(callback, delay, arg, ...)`

``` javascript
function sayGoodBye(who) {
    console.log('GoodBye', who)
}

/* 2초마다 수행 */
setInterval(function () {
    sayGoodBye()
}, 2000, 'Friend');
```

#### 반복타이머 삭제
- `clearInterval()`

``` javascript
/* 인터벌 제거 */
clearInterval(sayGoodBye());
```

### Console

#### 값 출력

``` javascript
console.log('log', 'log message');
console.info('info', 'info message');
console.warn('warn', 'warn message');
console.error('error', 'error message');
```

#### 객체형 출력

``` javascript
var obj = {
    name: 'IU',
    job: 'Singer'
}
console.log('obj', obj); // 객체 내용 보기
```

#### Custom Console(커스텀 콘솔)

``` javascript
var fs = require('fs'); // 파일 입출력 모듈
var output = fs.createWriteStream('stdout.log'); // Output 위치 지정
var errorOutput = fs.createWriteStream('error.log'); // Error output 위치 지정
var Console = require('console').Console; // 콘솔 타입 로딩
var logger = new Console(output,errorOutput); // 콘솔 객체 생성

logger.info('info message');
logger.log('log message');
logger.warn('warning');
logger.error('error message');
```

#### 실행 시간 측정하기

``` javascript
/* 실행시간 측정 */
console.time("START");
var sum = 0;
for (var i = 1; i < 10000; i++) {
    sum += i;
}
console.timeEnd("START")
```

### Utility(유틸리티)

#### 모듈 로딩
- `var util = require('util');`
- placeholder :  `%s : String`, `%d : Number`, `%j : JSON`

``` javascript
var str1 = util.format('%d + %d = %d',1,2,(1+2));
var str2 = util.format('%s %s', 'Hello','World')
```

#### inherits(상속)
- `util.inherits(constructor, superConstructor)`

``` javascript
function Parent() {

}
Parent.prototype.sayHello = function () {
    console.log('Hello. From Parent Class');
}
function Child() {

}
util.inherits(Child,Parent); // inherit Relation

var parent = new Parent();
parent.sayHello();

var child = new Child();
child.sayHello();
```

### Event(이벤트)
``` javascript
process.on('exit', function (code) {  // 이벤트가 발생할 때마다 동작
    console.log('exit event : ', code);
})

process.once('exit',function (code) { // 이벤트가 첫 번째로 발생했을 때에만 동작
    console.log('exit event with once : ', code);
})

process.emit('exit'); //이벤트 발생시키기
process.emit('exit',0);
process.emit('exit',1);

process.on('uncaughtException',function (code) { //예외처리 되지 않는 상황
    console.log('uncaughtException Error');
})
sayTest();
```

#### 이벤트 리스너 함수 삭제
- `emitter.removeListener(event, listener)`
- `emitter.removeAllListener(event)`

#### 최대 이벤트 핸들러 개수(Default Value : 10)
- `emitter.setMaxListener(n)`
- `emitter.getMaxListener()`

#### error Handle

``` javascript
emitter.on('event',function(error,result){
  if(error){
    // Handle Error
  }else{
    // 정상 처리
  }
})
```
