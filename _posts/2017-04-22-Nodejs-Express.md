---
layout: post
title: NodeJs의 Express
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript,Express]
date: 2017-04-22
---

![No Image](/assets/20170413/1.PNG)

## Express
- Light HTTP web Framework
- `npm install express`

### 서버 생성, 시작

``` javascript
var express = require('express');
var app = express();
app.listen(3000);
```

- HTTP 모듈 서버와 함께 사용하기

``` javascript
var http = require('http');
var express = require('express');
var app = express();
http.createServer(app).listen(3000);
```

### Express MiddleWare
- 요청 분석, 처리하는 모듈
- 여러 개의 미들웨어로 구성
- 중간에 껴넣는다는 의미로 부가적인 기능이나 처리를 제공하는 목적
- app.use(MiddleWare)

![No Image](/assets/20170422/1.PNG)

### routing
- 요청 처리 미들웨어로 분배

``` javascript
// Method
app.get('/',function(req,res){});
app.post('/',function(req,res){});
app.get('/user',function(req,res){});
app.post('/post',function(req,res){});
```

### 요청 분석
- `req.query` : 쿼리 문자열
- `req.path` : 요청 URL 중 경로
- `req.params` : URL의 파라미터
- `req.cookie` : 요청 메시지 내 Cookie(Cookie Parser 필요)
- `req.body` : 요청 메시지 내 바디 분석(Body Parser 필요)

### 응답
- `res.json()``
- `res.redirect()`
- `res.render()`
- `res.send()`
- `res.sendStatus()`
- `res.status()`
- `res.download()`

## Middleware

### Framework
- `connect`
- `Express`
- 작은 단위 모듈
- 요청과 응답 처리 함수 형태
- 하나의 Middleware에서 요청 분석 응답 마무리
- 여러 Middleware를 겨처서 요청 응답 가능

### Middleware mount
- `app.use(path,function)`
- Default Path value : `/`
- 다른 Middleware로 넘어가기 : `app.use(path,function(req,res,next){ next() })`
- 순서가 중요하다.

### Middleware stack
- `app.use(function1, function2)`
- `next()`를 호출해야 다음 function으로 진행한다.

### 보통 Middleware 순서
- favicon 처리
- Logging
- Static file
- Service Middleware
- Handle Error

## Static file Middleware
- `express.static(root, option)`
- `etag` : etag 사용 여부, 기본 true
- `lastModified` : lastModified 헤더 사용, 기본 true
- `maxAge` : 기본값 0
- `index` : 기본값 index.html

### 다수 가능
- `app.use(express.static('public'));`
- `app.use(express.static('files'));`

### 가상 경로 설정
- `app.use('/static',express.static('files'))`
