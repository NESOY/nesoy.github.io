---
layout: post
title: NodeJs의 npm, nodemon, Module
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript,npm,nodemon]
date: 2017-04-17
---

![No Image](/assets/20170413/1.PNG)

## npm ( Node Package Modules )
- 확장 모듈(패키지) 검색
- 패키지 매니저
- <http://www.npmjs.org>
- 모듈 검색
- 모듈 상세 정보
- 모듈 설치 방법
- API 설명, 예제

### Module
- Module 설치, 삭제(확장 모듈)
- Module 검색
- Module 정보
- 패키지 정보 작성

### 설치하는 방법
- Nodejs를 설치했다면 같이 설치 되어있다.
- 확인 명령어 : `npm help`

### 주요 명령어
- `npm init` : 패키지 준비 package.json 생성
- `npm install` : 패키지에 필요한 모듈 설치
- `npm install package` : 개별 패키지 설치
- `npm list` : 설치된 모듈 목록 보기
- `npm list -g --depth=0` : Global List 확인하기
- `npm info` : 모듈 정보
- `npm search` : 모듈 검색
- `npm update` : 모듈 업데이트
- `npm uninstall` : 모듈 삭제

### 전역설치
- 한번 설치로 모든 프로젝트에서 사용
- 유틸성(mocha,nodemon)은 전역 설치 권장
- lib/node_modules
- 관리자 권한 필요 -g 옵션
- `sudo npm install -g [Module]`
- `sudo npm uninstall -g [Module]`

### 지역설치
- 대부분의 모듈은 지역 모듈 권장
- 프로젝트마다 설치
- node_modules

### 모듈 설치
- `npm install [Module][@Version]`
- 의존성 있는 모듈도 같이 설치한다.

## 패키지 정보
### 패키지 설정 파일
- `npm init`으로 생성
- 패키지에 대한 정보 입력
- `npm install Module --save` : package.json에 의존성 정보 기록하기
- `npm install Module --save-dev` : 실무환경이 아닌 개발할 때만 사용한다고 알리는 옵션
- package.json

``` json
{
  "name": "npm-exercise",
  "version": "1.0.0",
  "description": "npm sample",
  "main": "app.js",
  "dependencies": {
    "async": "^1.5.0",
    "jade": "^1.11.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## 확장 모듈 : nodemon
- 소스코드 수정 후 자동 재시작. 매우 편하다.
- 설치 : 글로벌로 설치 `npm install -g nodemon`

![No Image](/assets/20170417/1.PNG)

- 실행방법 : `nodemon app.js`

![No Image](/assets/20170417/2.PNG)

## 모듈 만들기
- 소스 코드 분리
- 모듈 작성 방법 : `module.exports`
- 모듈 로딩 : `require(경로)`

### 모듈 예제
- greeting.js

``` javascript
module.exports.hello = function() {
	console.log('Hello World');
}
exports.hello = function() {
	//module 생략 가능
}
```

- 호출하기 (exports를 하지 않는 함수는 사용 불가)

``` javascript
var greeting = require('./greeting');
greeting.hello();
```

### 클래스 exports
- 단 하나의 클래스 exports
- class

``` javascript
function Exercise() {
}

Exercise.prototype.run = function() {
	console.log('run!');
}
module.exports = Exercise; //module 생략 불가
```

- run

``` javascript
var Exercise = require('./exercise.js');
var exercise = new Exercise();
exercise.run();
```

### 객체 exports
- 단 하나의 객체 exports
- Object

``` javascript
var student = {
  hour : 0,
  study : function(){
    this.hour++;
    console.log(this.hour+'시간째 공부 중');
  }
};
module.exports = student; //module 생략 불가
```

- run

``` javascript
var student = require('./student.js');
student.study();
```
