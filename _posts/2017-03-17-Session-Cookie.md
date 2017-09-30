---
layout: post
title: 쿠키(Cookie) 그리고 세션(Session)
categories: [Web]
excerpt: ' '
comments: true
share: true
tags: [Web,Session,Cookie]
date: 2017-03-17
---

## HTTP Protocol Version

#### HTTP/1.0
- 브라우저가 매 요청마다 웹 서버와 TCP Session(Socket Connection 3-Way Handshake)을 생성한다.
- 요청한 작업을 수행하고 TCP Session(Socket Connection Close)을 종료한다.

> *아주 작은 단위나 반복되는 작업마다 TCP Session을 연결하고 닫는 작업을 해야하기 때문에 비효율적이다.*

#### HTTP/1.0+ - Keep-Alive
- 브라우저가 요청을 하면 웹 서버와 TCP Session(Socket 연결)을 생성한다.
- 서버와 클라이언트 모두 헤더(Http Header)에 Connection : Keep-Alive를 포함시켜 연결을 지속적으로 유지한다.
- Keep-Alive가 없는 경우에 연결을 종료시킨다.

> *Keep-Alive가 매번 헤더(Http Header)에 포함되어야 하는 단점이 있다.*

#### HTTP/1.1 - Persistent Connection
- Keep-Alive를 지속적으로 보내는 대신 Connection : Close를 한번만 보내 연결을 종료시키거나 Timeout이 되면 연결을 종료시키는 방식이다.

![No Image](/assets/posts/20170317/1.PNG)

## 쿠키(Cookie)란?
- Connectionless, Stateless의 성격을 가진 HTTP의 단점을 해결하기 위해 도입되었다.
- 웹 서버가 브라우저에게 지시하여 사용자의 로컬 컴퓨터에 저장하는 작은 기록 정보 파일이다.
- 파일에 담긴 정보는 인터넷 사용자가 같은 웹사이트를 방문할 때마다 읽히고 수시로 새로운 정보로 바뀐다

#### 쿠키(Cookie) 종류

쿠키이름 | 특징
--------------- | ---------------
Session Cookie | 보통 만료시간(Expire date) 설정하고 메모리에만 저장되며 브라우저 종료시 쿠키를 삭제한다.
Persistent Cookie | 장기간 유지되는 쿠키(예를 들어 Max-Age 1년), 파일로 저장되어 브라우저 종료와 관계없이 사용
Secure Cookie | HTTPS에서만 사용, 쿠키 정보가 암호화 되어 전송
Third-Party Cookie | 방문한 도메인과 다른 도메인의 쿠키 보통 광고 베너 등을 관리할 때 유입 경로를 추적하기 위해 사용

#### 쿠키(Cookie) 구성요소
- 쿠키의 이름 : name
- 쿠키의 값 : value
- 쿠기의 유호시간 : Expires
- 쿠키를 전송할 도메인 : Domain
- 쿠키를 전송할 경로 : Path
- 보안 연결 여부 : Secure
- Http외에 다른 통신 사용 가능 여부 : HttpOnly

#### 쿠키(Cookie) 살펴보기
- Cookie를 이용한 Server-Client 흐름

![No Image](/assets/posts/20170317/2.PNG)

- www.google.com에 대한 Cookie Header 모습

![No Image](/assets/posts/20170317/3.PNG)

![No Image](/assets/posts/20170317/4.PNG)

#### 쿠키(Cookie) 단점
- 쿠키에 대한 정보를 매 헤더(Http Header)에 추가하여 보내기 때문에 상당한 트랙픽을 발생시킨다.
- 결제정보등을 쿠키에 저장하였을때 쿠키가 유출되면 보안에 대한 문제점도 발생할 수 있다.

## 세션(HTTP Session)이란?
- SID(session ID)를 식별자로 구별하여 데이터를 쿠키가 아닌 서버 내에 파일이나 DB에 저장 한다.
- 클라이언트는 Session id를 쿠키로 저장하여 가지고 있다. 메모리에 저장하기 때문에 브라우저가 종료되면 사라진다.

![No Image](/assets/posts/20170317/5.PNG)

## 세션(HTTP Session)을 통한 State 유지
- HTTP Request를 통해 Session id 확인을 한후에 없으면 Set-Cookie를 통해 Session id를 보낸다.
- Session id를 받은 클라이언트는 HTTP Request 헤더에 session id를 넣어서 요청을 한다.
- Session id를 통해 객체를 찾아 이전 정보를 유지하며 응답을 할 수 있다.

## 참조
- <http://tomining.tistory.com/172>
- <https://www.karelgeenen.nl/23/de-complete-gids-voor-een-snelle-website-3-waarom-http-requests-verminderen>
