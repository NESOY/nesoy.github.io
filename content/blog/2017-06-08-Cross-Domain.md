---
title: 크로스 도메인(Cross Domain) 이슈
tags:
  - Web
date: 2017-06-08
aliases: 
  - ../articles/2017-06/Cross-Domain
---

![[Assets/logo/javascript.png]]

> API서버에서 받은 데이터를 Angular를 통해 데이터를 보여주려고 했지만 실패했다. 원인은 XMLHttpRequest cannot load http//localhost.com. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http//localhost.com is therefore not allowed access. 이였다. 크로스 도메인(Cross Domain)이란 이슈에 대해 정리하고 해결방안을 적기 위해 포스팅한다.

## Problem

- Client에서 API서버에 비동기 통신을 하여 데이터를 가져오려고 하는데 문제가 발생했다.

![[Assets/posts/20170608/1.PNG]]


## 크로스 도메인(Cross Domain)
- 자바스크립트(Javascript)의 보안 정책의 하나인 Same-Origin Policy는 스크립트 실행되는 페이지와 비동기 호출시 주소의 프로토콜,호스트,포트가 같아야 한다.

### EX
- 웹페이지 서버 : http://localhost.com:3000
- API 서버 : http://localhost.com:3001

> 웹 페이지의 포트 번호와 API 서버의 포트가 다르므로 XMLHttpRequest cannot load라는 에러가 console에 출력된다.

## Solution
![[Assets/posts/20170608/2.PNG]]

- 비동기 호출을 하는 서버에서 Header에 `Access-Control`관련 내용을 보내주면 해결이 된다.

### NodeJS
- `cors`라는 Module을 통해 쉽게 해결할 수 있다. : <https://www.npmjs.com/package/cors>

``` javascript
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

## Reference
- <https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS>
