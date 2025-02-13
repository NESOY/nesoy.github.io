---
title: NodeJs의 callback hell, Async, Promise
tags:
  - NodeJs
date: 2017-04-18
aliases: 
  - ../articles/2017-04/Nodejs-callback
---

![[Assets/posts/20170413/1.PNG]]

## Call-Back, Call-Back hell
- 비동기 함수 : 콜백 함수 사용

### 비동기 동작의 연속
- task1 실행 이후에 task2 실행
- task1 실행 결과를 이용해서 task2 실행
- 콜백의 연속된 호출
- ex) 이미지 업로드 후 데이터 베이스에 저장, 다수의 이미지에서 썸네일 생성 후 업로드

- 예제 코드

``` javascript
function task1(args,function(result){
  var arg2 = result.value;
  task2(arg2,function(result){

  });
});
```

### Call-Back 탈출하기

``` javascript
function task1(callback) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		callback();
	}, 300);
}


function task2(callback) {
	console.log('Task2 시작');
	setTimeout(function() {
		console.log('Task2 끝');
		callback();
	}, 200);
}

task1(function() {
	task2(function() {

	});
});
```

- 결과 화면

![[Assets/posts/20170418/1.PNG]]

## Async
- 비동기 동작의 흐름 제어 모듈
- 설치방법 : `npm install async`

### Async 대표적인 기능
- 순서 제어 : `series, seriesEach, parallels, waterfall`
- 콜렉션(배열, 객체) : `each, forEachOf, map, filter`

### series(tasks,callback)
- 순차적으로 진행
- call-back호출 : 다음 Task로 진행
- Task 실행 중 에러 : 다음 Task로 실행 X -> 마무리 콜백으로 에러 전달

``` javascript
async.series(
  [task1, task2, task3], function(err, results) { // 완료 Call-Back
	if ( err ) {
		console.error('Error : ', err);
		return;
	}
	console.log('비동기 동작 모두 종료 ', results)
  // result에는 각 Task의 결과가 Array 형태로 전달
});
```

### waterfall
- 이전 Task의 결과값을 다음 Task Parameter로 전달

``` javascript
async.waterfall([
  function task1(callback) {
    callback(null,'value');
  },
  function task2(args, callback) {
    callback(null,'value1','value2');
  },
  function task3(arg1, args2, callback) {
    callback(null,'value1','value2','value3');
  }
],
function(err, result){
}
);
```

### parallel
- 여러 Task를 동시에 실행
- 모든 Task를 마치면 완료 콜백

``` javascript
async.parallel([
  function (callback) {
    callback(null,'value1');
  },
  function (callback) {
    callback(null,'value2');
  },
  function (callback) {
    callback(null,'value2');
  }
  ]
  function(err, result){
  }
);
```
### 비동기 순회 동작 each
- `each(arr,iterator,callback)`

``` javascript
async.each(arrary, function(item,callback){
  // 배열 내 항목 item을 사용하는 비동기 동작
  callback(null);
}, function(err){
  // async.each 완료
})
```

## Promise
- 비동기 동작의 흐름제어
- JavaScript ES6에 추가

``` javascript
new Promise(function(){
  // 비동기 동작
});
```

### Promise의 상태
- `pending` : 동작 완료 전
- `fullfilled` : 비동기 동작 성공
- `rejected` : 동작 실패
- 성공적으로 완료 : `fullfilled` 호출
- 에러상황 : `rejected` 호출

### Promise 이후의 동작 : then

``` javascript
function task1(fullfill, reject) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		//fullfill('Task1 결과');
		reject('Error msg');
	}, 300);
}

function fullfilled(result) {
	console.log('fullfilled : ', result);
}

function rejected(err) {
	console.log('rejected : ', err);
}

new Promise(task1).then(fullfilled, rejected);
```

### Promise를 사용하는 Task

``` javascript
function task(){
  return new Promise(function(fullfill,reject){
      if(success)
        fullfill('Success');
      else
        reject('Error');
  });
}
```
