---
title: 쿠키(Cookie) 그리고 세션(Session)
tags:
  - Web
  - Session
  - Cookie
date: 2017-03-17
aliases: 
  - ../articles/2017-03/Session-Cookie
---

![[Assets/logo/web.jpg]]

# 쿠키(Cookie)
## 배경
- 로그인을 통해 볼 수 있는 서비스. 장바구니 서비스. 등등 클라이언트가 정보를 유지하는 Stateful한 성격의 서비스가 점점 많아졌습니다.
- 정보를 유지할 수 없는 Connectionless, Stateless의 성격을 가진 HTTP의 단점을 해결하기 위해 쿠키라는 개념이 도입되었습니다.

## 쿠키(Cookie)란?
- 웹 서버가 브라우저에게 지시하여 사용자의 로컬 컴퓨터에 파일 또는 메모리에 저장하는 작은 기록 정보 파일입니다.
- 파일에 담긴 정보는 인터넷 사용자가 같은 웹사이트를 방문할 때마다 읽히고 수시로 새로운 정보로 바뀔 수 있습니다.

## 쿠키(Cookie) 구성요소

### Name
- 쿠키의 이름

### Value
- 쿠키의 저장된 값

### Expires
- 쿠키가 언제 삭제되는지 결정합니다.
- ex) `expires="Wdy, DD−Mon−YYYY HH:MM:SS GMT"`
    - 쿠키에 만료일이 포함되어 있으면 영구적 쿠키로 간주.
    - `Max-Age`를 통해 지정된 만료일이 되면 디스크에서 쿠키가 제거.

### Domain
- 쿠키가 사용되는 도메인을 지정.
- ex) `domain=nesoy.github.io`
    - 이 값이 현재 탐색 중인 도메인과 일치하지 않을 경우, "타사 쿠키"로 간주되며 브라우저에서 거부.
    - 이렇게 하여 한 도메인에서 다른 도메인에 대한 쿠키를 사용하지 못하게 설정.

### Path
- 쿠키를 반환할 경로를 결정
- ex) `path=/`
    - 도메인의 루트 경로로 이동할 경우 쿠키가 전송

### Secure
- 보안 연결 설정

### HttpOnly
- Http외에 다른 통신 사용 가능 설정.


## 쿠키(Cookie) 종류

쿠키이름 | 특징
--------------- | ---------------
Session Cookie | 보통 만료시간(Expire date) 설정하고 메모리에만 저장되며 브라우저 종료시 쿠키를 삭제.
Persistent Cookie | 장기간 유지되는 쿠키(예를 들어 Max-Age 1년), 파일로 저장되어 브라우저 종료와 관계없이 사용.
Secure Cookie | HTTPS에서만 사용, 쿠키 정보가 암호화 되어 전송.
Third-Party Cookie | 방문한 도메인과 다른 도메인의 쿠키 보통 광고 베너 등을 관리할 때 유입 경로를 추적하기 위해 사용.

## 쿠키(Cookie) 살펴보기

- Cookie를 이용한 Server-Client 흐름
![[Assets/posts/20170317/2.PNG]]

- `www.google.com`에 대한 Cookie Header 모습
![[Assets/posts/20170317/3.PNG]]
![[Assets/posts/20170317/4.PNG]]

#### 쿠키(Cookie) 단점

- 쿠키에 대한 정보를 매 헤더(Http Header)에 추가하여 보내기 때문에 `상당한 트랙픽`을 발생시킵니다.
- 결제정보등을 쿠키에 저장하였을때 쿠키가 유출되면 `보안에 대한 문제점`도 발생할 수 있습니다.

# 세션(HTTP Session)

![[Assets/posts/20170317/5.PNG]]

## 배경

- 쿠키의 트래픽 문제와 쿠키를 변경하는 보안적 이슈를 해결하기 위해 등장하였습니다.

## 세션(HTTP Session)이란?

- HTTP Session id를 식별자로 구별하여 데이터를 사용자의 브라우저에 쿠키형태가 아닌 접속한 서버 DB에 정보를 저장 합니다.
- 클라이언트는 HTTP Session id를 쿠키로 메모리 저장된 형태로 가지고 있습니다.
- 메모리에 저장하기 때문에 브라우저가 종료되면 사라지게 됩니다.

## 세션(HTTP Session) 절차

1. 클라이언트가 서버에 Resource를 요청합니다.
2. 서버에서는 HTTP Request를 통해 쿠키에서 Session id를 확인을 한 후에 없으면 Set-Cookie를 통해 새로 발행한 `Session-id` 보냅니다.
3. 클라이언트는 HTTP Request 헤더에 Session id를 포함하여 원하는 Resource를 요청을 합니다.
4. 서버는 Session id를 통해 해당 세션을 찾아 클라이언트 상태 정보를 유지하며 적절한 응답을 합니다.

## Server-Side 관점의 세션

### 장점

- 서버에 저장하기 때문에 매우 관리하기 편하고 효율적입니다.

### 단점

- load-balancing/시스템 효율성에서 handling하기 어렵습니다.
- 세션 저장 장치가 부족한 시스템에는 적합하지 않습니다.

### 해결방법

#### load-balancing 문제

- 세션 정보를 하나의 저장장치에 공유하는 것
- 각각의 클라이언트를 다른 서버에 binding하는 방법
- 비록 load-balancing 관점과 시스템 효율성이 떨어지더라도 어느 정도 Trade Off

#### 저장 장치

- 엄청난 용량의 저장장치를 사용하는 대신 Memory기반의 저장장치를 사용 :: ex) Redis
- 대신 client의 최대인원을 제한하는 단점.


## Client-side 관점의 세션

- 서버에 많은 양의 정보를 저장하지 않고 상태를 유지하기 위해 암호화가 적용된 쿠키를 사용.
- 클라이언트에 저장된 쿠키가 데이터가 소프트웨어나 다른 사용자에 의해 손상될 경우도 있습니다.
- 클라이언트 세션은 기밀성과 무결성이 보장되어야 합니다.

### 보장되어야 할 것

- `Confidentiality`: 서버이외에는 어느 누구도 세션데이터를 해석할 수 없어야 합니다.
- `Data integrity`: 서버와 별개로 세션 데이터를 조작해서는 안 됩니다(실수로 또는 악의적으로).
- `Authenticity`: 서버를 제외하고는 올바른 세션을 시작할 수 없습니다.

### 정책

- 서버는 세션 데이터를 클라이언트에게 보내기 전에 `암호화`해야 합니다.
- 웹 브라우저들은 쿠키의 크기와 개수의 제한을 두고 있습니다.
- 더 많은 세션 데이터를 허용하고 효율적으로 관리하기 위해서는 `쿠키를 만들기전에 데이터를 압축하는 과정`이 필요하고 클라이언트에게 `쿠키를 받기 전 압축해제하는 과정`이 필요할 것입니다.

### 비용
- 클라이언트 상태를 모든 요청에 보내는건 `쿠키가 작을때 실용적`입니다.
- 클라이언트 세션 요청은 `서버 저장공간`과 `요청당 웹 request 대역폭`과 Trade되게 됩니다.

## Reference
- <http://tomining.tistory.com/172>
- <https://www.cisco.com/c/en/us/products/collateral/security/web-security-appliance/kr/117925-technote-csc-00.html>
