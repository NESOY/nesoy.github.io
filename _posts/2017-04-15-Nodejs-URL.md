---
layout: post
title: NodeJs의 Stream, URL, QueryString, Cluster
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-15
---
![No Image](/assets/20170413/1.PNG)

## 스트림(Stream)
### 스트림 : 데이터의 전송 흐름
- 콘솔 입력/출력
- 파일 읽기/쓰기
- 서버/클라이언트 - 데이터 전송

### 스트림 모듈
- 스트림을 다루기 위한 추상 인터페이스
- 다양한 스트림을 같은 인터페이스로 다룰 수 있다.

### 스트림 종류
- 읽기 스트림 : `Readable Stream`
- 쓰기 스트림 : `Writable Stream`
- 읽기 / 쓰기 : `Duplex`
- 변환 : `Transform`

### Readable Stream
- 모드 : `flowing, paused`
- `flowing mode` : 데이터를 자동으로 읽는 모드, 전달되는 데이터를 다루지 않으면 데이터 유실
- `paused mode` : 데이터가 도착하면 대기, read()함수로 데이터 읽기
- `readable.read(size)` : 읽기
- `readable.pause()` : 중지
- `readable.resume()` : 재개
- `readable.pipe(destination, option)` : 파이프
- `readable.unpipe(destination)` : 파이프 제거

#### Readable Event
- `readable` : 읽기 가능한 상태
- `data` : 읽을 수 있는 데이터 도착
- `end` : 더 이상 읽을 데이터가 없는 상태
- `close` : 스트림이 닫힌 상태
- `error` : 에러

#### flowing Mode
- data 이벤트 구현
- pipe 연결
- resume() 호출

``` javascript
var is = fs.createReadStream(file);
is.on('readable',function(){
  console.log('==READABLE EVENT');
});

is.on('data',function (chunk) {
  console.log('==DATA EVENT');
  console.log(chunk.toString());
});
```

### Writable Stream
- 데이터 출력
- http 클라이언트의 요청
- http서버의 응답
- 파일 쓰기 스트림
- tcp 소켓

#### 데이터 쓰기, 인코딩
- `Writable.setDefaultEncoding(encoding)`
- `Writable.write(chunk,encoding,callback)`

#### 스트림 닫기
- `Writable.end(chunk,encoding,callback)`

#### 버퍼
- `Writable.cork()`
- `Writable.uncork()`

#### Writable Event
- `drain` : 출력 스트림에 남은 데이터를 모두 보낸 이벤트
- `error` : 에러
- `finish` : 모든 데이터를 쓴 이벤트
- `pipe` : 읽기 스트림과 연결(pipe)된 이벤트
- `unpipe` : 읽기(pipe) 해제 이벤트

``` javascript
var os = fs.createWriteStream(file);
os.on('finish',function(){
  console.log('==finish EVENT');
});

os.write('1234');
os.write('5678');
os.end('9'); //Finish Event
```

### 표준 입출력 스트림
- `process.stdin` : 콘솔 입력
- `process.stdout` : 콘솔 출력

#### 스트림 연결

``` javascript
var is = process.stdin;
var os = fs.createWriteStream('output.txt');
os.on('pipe',function(src){
  console.log('pipe event');
})
// exit 입력이 오면 파이프 연결 해제
is.on('data',function(data){
  if(data.trim() == 'exit'){
    is.unpipe(os);
  }
});
is.pipe(os);
```

## URL 다루기
- URL : Uniform Resource Locator
- Protocol : `http, https`
- Host : `www.google.com`
- Port : `/80`
- Path : `/test.txt`
- Query : `?q=testQuery`
- Fragment

#### URL 모듈
- `var url = require('url')`
- `url.parse(urlStr,parseQueryString,slashesDenoteHost)`
- `urlStr` : URL 문자열
- `parseQueryString` : 쿼리 문자열 파싱, 기본값 false
- `slashesDenoteHost` : // 시작하는 주소의 경우, 호스트 인식 여부, 기본값 false

#### 쿼리 문자열(query String)
- 이름=값&이름=값 형태로 정보 전달
- `url.parse(urlStr,true)`

#### URL 만들기, 변환
- `url.format(urlObj)`
- `url.resolve(from,to)`

#### URL에 허용되는 문자
- 한글은 인코딩을 해주어야한다.
- 모듈 : `urlencode`

## 쿼리 스트링

#### 쿼리스트링 모듈
- `var queryString = require('querystring')`

#### 쿼리 문자열 분석하기
- `querystring.parse(str,sep,eq,option)`
- `sep,eq` : 구분자

#### 쿼리 스트링의 배열
- `group=걸스데이&member=유라&member=혜리`
- 같은 값을 준다.

## 클러스터(Cluster)
- 여러 시스템을 하나로 묶어서 사용하는 기술
- 멀티 프로세스, 멀티 코어

### Nodejs 클러스터
- 1개의 싱글 쓰레드
- 멀티 코어 시스템의 장점을 살리기 - 클러스터
- 클러스터 사용시 포트 공유 - 서버 작성 편리
- 코어(프로세서)의 개수 만큼 사용

- 클러스터링 : 마스터와 워커 프로세스
- 마스터 : 메인프로세스, 워커 생성
- 워커 : 보조프로세스, 마스터가 생성

#### 클러스터(Cluster) 모듈
- `var cluster = require('cluster')`

#### 클러스터(Cluster) 생성(마스터)
- `cluster.fork()`

#### 구분하기
- `cluster.isMaster`
- `cluster.isWorker`

``` javascript
if(cluster.isMaster){
  // Master Code
  cluster.fork();
}else{
  // Worker Code
}
```

### 클러스터(Cluster) 이벤트(Event)
- `fork` : Worker 생성 이벤트
- `online` : Worker 생성 후 동작하는 이벤트
- `listening` : Worker에 작성한 서버의 listen 이벤트
- `disconnect` : Worker 연결 종료
- `exit` : Worker Process 종료

- `message` : 메시지 이벤트
- `disconnect` : Worker 연결 종료

#### Worker 접근
- `cluster.worker`
- `worker.id`

#### Worker 종료
- `worker.kill`

#### 마스터가 워커에게 데이터 전달
- `worker.send(data)`
- `worker.on('message',function(data){});`

#### 워커가 마스터에게 데이터 전달
- `process.send(data)`
- `var worker = cluster.fork(); worker.on('message',function(data){})`

### 마스터와 워커 분리
- `cluster.setupMaster(setting)`
- `cluster.setupMaster({exec:'worker.js'})`

## Reference
- <https://nodejs.org/api/cluster.html>
