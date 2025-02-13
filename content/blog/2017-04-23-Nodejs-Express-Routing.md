---
title: NodeJs의 Express Routing, Thrid Party Middleware
tags:
  - NodeJs
  - Express
date: 2017-04-23
aliases: 
  - ../articles/2017-04/Nodejs-Express-Routing
---

![[Assets/posts/20170413/1.PNG]]

## Routing
- 클라이언트의 요청을 미들웨어로 분배

``` javascript
app.all(path,callback)
app.get(path,callback)
app.post(path,callback)
app.put(path,callback)
app.delete(path,callback)
```

- 동적 Parameter : `app.get('/user/:item',callback)`
- Parameter 얻기 : `req.params.item`

``` javascript
app.get('/user:id',function(req,res){
  var userId = req.params.id;
})
app.get('/movies/:movieid/:actor',function(req,res){
  var movieid = req.params.movieid;
  var actor = req.params.actor;
})
```
- 동적 Parameter의 순서가 중요 ( item때문에 sample을 처리 불가 )
- `/user/:item`
- `/user/sample`

### 정규식 사용하기
- `?` : 문자 존재하거나 생략
- `+` : 1번 이상 반복
- `*` : 임의의 문자

``` javascript
// /abcd, /acd
app.get('ab?cd',function(req,res){});

// /abcd, /abbcd, /abbbcd
app.get('ab+cd',function(req,res){});

// /abcd, /abxcd, /abRABODMDOFMDFcd, /ab123cd
app.get('ab*cd',function(req,res){});

// /abe, /abcde
app.get('ab(cd)?e',function(req,res){});
```

### Route 함수

``` javascript
app.route('/book')
.get(function(req,res){

})
.post(function(req,res){

})
```

### Router 수준의 Middleware
- `express.Router`
- Routing Logic을 별도로 분리 가능
- 상대 경로 요청 처리 가능
- 수정이 쉽다.

## Error Middleware

### Middleware 내부에서 처리
- 각각 미들웨어에서 에러 처리
- 에러 처리 로직이 제각각
- 에러 처리 코드 중복

### Error Handler Middleware에게 위임
- 일관된 에러 처리 가능
- Error Handler Middleware는 Middleware 중 후순위

### Error Parameter

``` javascript
app.use(function(err,req,res,next){
  var error = new Error("ERROR MESSAGE");
  error.code = 100;
  return next(error);
})
```

### 환경 별 에러 처리

``` bash
// Window
set NODE_ENV=product
node myapp.js
// Linux
$ NODE_ENV=product node myapp.js
$ NODE_ENV=development node myapp.js
```

- `app.get('env')`

``` javascript
if(app.get('env') === 'development'){ //개발 설정

}
else{ // product

}
```

## Third Party Middleware

### Favicon Middleware
- `serve-favicon`
- `npm install serve-favicon`
- `favicon(path, options)`
- 앞 순위에 배치하여 처리한다.

``` javascript
var express = require('express');
var favicon = require('serve-favicon');

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
```

### Log Middleware
- `morgan`
- `npm install morgan`

``` javascript
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev')); // dev 로그 포맷

app.get('/hello', function (req, res) {
   res.send('GET request, /');
});

app.get('/movies', function(req, res) {
   res.send('GET request, /movies');
});

app.listen(3000);
```

- `winston` : 다양한 로그 포맷, email, sms, 파일, db에 저장
- `npm install winston`
- Transport를 활용하여 Output 설정

- 별도 설치 transports
- `DailyRotateFile`
- `CouchDB,Redis,MongoDB`
- `Mail transport`
- `Notification Service`

``` javascript
var winston = require('winston');
winston.info('INFO message');
winston.warn('warn message');
winston.add(winston.transports.File,filename);
winston.remove(winston.transports.Console);
winston.add(require('winston-daily-rotate-file'),{datePattern:'yyyyMMdd'},filename);
```

### BodyParser Middleware
- `npm install body-parser`
- JSON, RAW, TEXT, URL-Encoded
- Multipart 지원 X

#### JSON
- options
- `inflate` : 압축된 메시지 바디 다루기
- `limit` : 바디 메시지 크기.
- `strict` : JSON 구조의 배열이나 객체만 접수
- `app.use(BodyParser.json())`

#### URL-Encoded
- options
- `extended` : queryString으로 파싱
- `parameterLimit` : parameter 개수 제한
- `inflate, limit` : JSON과 동일
- `app.use(bodyParser.urlencoded({extended:false}));`

#### Parser Result

``` javascript
var title = req.body.title;
var message = req.body.message;   
```

## Method Override
- `npm install method-override`
- HTML에서 GET/POST만 가능
- Get/Post말고 Put/Delete등 다른 Method를 사용하기 위한 기능
- `POST /?resource_method=DELETE`

### 사용법
- `app.use(methodOverride('_method'));`
