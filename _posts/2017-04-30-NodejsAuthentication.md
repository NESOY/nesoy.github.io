---
layout: post
title: Nodejs의 인증(Authentication), Passport
categories: [Nodejs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-30
---

![No Image](/assets/posts/20170413/1.PNG)

## 쿠키
- 쿠키에 대한 BLOG : <https://nesoy.github.io/articles/2017-03/Session-Cookie>

### Server -> Client
- Message-Head : Set-Cookie Field

```
HTTP/1.0 200 OK
content-type:text/html
Set-Cookie:name=value;
```

### Client -> Server

```
GET /spec.html HTTP/1.1
host:www.nelp.kr
Cookie:name=value;
```

### HTTP Module
- `res.setHeader('Set-Cookie','name=value');` : write
- `req.headers.cookie // 'name=value'` : read

### Express Module
- `npm install cookie-parser`
- `res.cookie(name,value,option)` : write
- `req.cookies` : read
- `res.clearCookie(name,option)`
- Option
- `domain` : 쿠키가 적용되는 서버
- `path` : 쿠키가 적용되는 경로
- `expire` : 쿠키 유효 날짜와 시간
- `maxAge` : 쿠키 유효기간(ms)
- `httpOnly` : HTTP 프로토콜에서만 사용
- `secure` : HTTPS에서만 사용 여부, Boolean
- `signed` : 서명 여부. Boolean

### cookieParser 설정

``` javascript
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
```

- 쿠키 기록하기
- `res.cookie('last','2015.8.5');`
- `res.cookie('visit','2');`

- 쿠키 읽기
- `var visit = req.cookies.visit;`
- `var last = req.cookies.last`

### 서명 쿠키(signed Cookie)
- `app.use(cookieParser('SECRET_KEY'))`
- `res.cookie('signed','OriginalValue',(signed:true))` : write
- `req.signedCookies.signed` : read

## 세션(Session)
- `npm install express-session`

### express-session
- `var express = require('express');`
- `var session = require('express-session');`
- Option
- `name` : 세션 ID 키리음
- `resave` : 변경이 없어도 저장
- `secret` : 세션 ID 서명
- `saveUninitialized` : 세션 초기화 전에도 저장
- `store` : 세션 저장소
- `cookie` : 쿠키 파서 옵션. 쿠키 파서 없이 사용 가능

### session read/write
- `req.session`
- `var sessionID = req.sessionID;`
- `req.session.visit='123';` : 쓰기
- `var visit = req.session.visit` : 읽기

### connect-mongo
- `npm install connect-mongo`

``` javascript
var sessionStoreOptions = {
  url:'mongodb//localhost:27017/session'
};
app.use(session({
  store: new MongoStore(sessionStoreOptions);
}));
```

## 인증
- LocalAuth : 서비스 내 직접 인증 기능 작성
- OAuth : 3자 인증 기능 사용
- OpenID

### Local Authentication
- 회원가입 기능
- 로그인 기능
- 정보 관리 기능
- 서버에 ID/PW 저장
- 사용자 정보 암호화
- HTTPS

### OAuth
- 다른 서비스에 등록된 사용자의 인증 정보 사용
- 가입/로그인 절차가 없음
- Token을 얻어 진행하는 방식

## Passport
- `npm install Passport`

### Passport Process
- Module Loading과 초기화
- Strategy 설정
- 인증
- 세션 기록과 읽기
- 사용자 정보

### Passport

``` javascript
var passport = require('passport');
app.use(passport.initialize());
```

- Strategy 인증 방법
- facebook, twitter, google, kakaotalk

```
var Strategy = require('passport-strategy').Strategy;
passport.use(new Strategy(function username, password, done){});
```

- 인증 요청
- `passport.authenticate('local');`

- 세션 기록

``` javascript
passport.serializeUser(function(user, done) {
    console.log('세션에 기록하기');
   done(null, user);
});
```

- 세션 읽기

``` javascript
passport.deserializeUser(function(user, done) {
    console.log('세션에서 사용자 정보 읽기');
    done(null, user);
});
```

### Local Authentication
- `npm install passport-local`
- `var LocalStrategy = require('passport-local').Strategy`
- `var Strategy = new LocalStrategy(Option, function(username,password,done){});`
- `done(null, userinfo);` : 성공
- `done(null, false, '로그인 실패');` : 실패

### Ex
- Web-Browser : `app.post('/login',passport.authenticate('local',{successRedirect:'SuccessAddress',failureRedirect:'failureAddress'}))`
- Mobile : `app.post('/login',passport.authenticate('local'),function(req,res){res.end('login Success');})`


## Facebook OAuth
- `npm install passport-facebook`
- 페이스북에 서비스(앱) 등록
- Redirect 주소 필요

``` javascript
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

### Login 요청
- `<a href="/auth/facebook">FB 로그인 </a>`
- `app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));`
