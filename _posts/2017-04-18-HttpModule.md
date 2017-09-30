---
layout: post
title: NodeJs의 HttpServer
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-18
---

![No Image](/assets/posts/20170413/1.PNG)

## HTTP Module
- `var http = require('http');`

### HTTP 서버용 클래스
- `http.Server` : HTTP 서버
- `http.IncomingMessage` : HTTP 서버의 요청 메시지, Readable Stream
- `http.ServerResponse` : HTTP 서버의 응답 클래스

### HTTP 클라이언트 클래스
- `http.Client` : HTTP 클라이언트
- `http.ClientRequest` : HTTP 클라이언트 요청 메시지
- `http.IncomingMessage` : HTTP 서버의 응답 메시지

## HTTP Server
- `var server = http.createServer(requestListener)`

### Event
- `request` : 클라이언트의 요청 도착
- `connection` : 소켓 연결
- `close` : 서버 종료

### Method
- `server.listen()`
- `server.close()`
- `server.setTimeout()`

### HTTP Server 동작하기

``` javascript
var http = require('http');
var server = http.createServer(function(req, res) {
	res.write('Hello World');
	res.end();
});

server.listen(3000);
```

### Port
- 0 ~ 1023 : well-known port. 관리자 권한 필요
- 1024 ~ 49151 : registered port
- 49152 ~ 65535 : dynamic port

## HTTP Client
- `http.request(options, callback)`
- `http.get(options, callback)`

### 클라이언트 요청 분석

``` javascript
var http = require('http');
var server = http.createServer(function(req, res) {

	console.log('Method : ', req.method);
	console.log('url : ', req.url);
	console.log('headers : ', req.headers['user-agent']);

	res.write('Hello World');
	res.end();
}).listen(3000);
```

### 응답 메시지
- `res.writeHead()`
- `res.setHeader()`

``` javascript
var http = require('http');
var server = http.createServer(function(req, res) {
	res.statusCode = 200;
	res.statusMessage = 'OK';
	res.setHeader('content-type','text/plain');

	res.write('<html><body><h1>Hello World</h1></body></html>');
	res.end(); // 작성 종료 호출 해야한다. 아니면 Timeout
}).listen(3000);
```

### static Resource 메시지

``` javascript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.access('./ca11.jpg', function(err) {
		if ( err ) {
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.readFile('./cat.jpg', function(err, data) {			
			res.end(data);
		});

	});
}).listen(3000);
```

### 스트림 파이프
- 입력 스트림 : `fs.createReadStream()`
- 출력 스트림 : `res`, `fs.createReadStream(path).pipe(res)`
