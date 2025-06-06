---
aliases: [/articles/2017-02/REST]
comments: false
date: 2017-02-06
description: 
tags: [REST, Web]
title: REST API
---
# REST API
> Web에 관련된 자료를 보게 되거나 혹은 API를 보게 되었을 때 가장 많이 보이는 단어가 REST란 단어였다. 하지만 REST란 단어만 알고만 있을 뿐 자세한 의미는 알지 못했다. 그래서 이번 기회에 RESTful API에 대해 정리를 시작해보려고 한다.


![[assets/posts/20170206/1.PNG]]

## RESTful이란?

- REST는 Representational State Transfer라는 용어의 약자로서 **웹의 장점을 최대한 활용할 수 있는 아키텍처**
- 최근의 서버 프로그램은 다양한 브라우저와 안드로이폰, 아이폰과 같은 모바일 디바이스에서도 통신을 할 수 있어야 한다.
- REST 아키텍처는 Hypermedia API의 기본을 충실히 지키면서 범용성을 보장한다.


## REST의 특징

### 1. Uniform (유니폼 인터페이스)
- Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일

### 2. Stateless (무상태성)
- 상태가 있다 없다는 의미는 사용자나 클라이언트의 컨택스트를 서버쪽에 유지 하지 않는다는 의미한다.
- 세션이나 쿠키등을 별도로 관리하지 않기 때문에 API서버는 요청만을 들어오는 메시지로만 처리하기 때문에 구현이 단순하다.

### 3. Cacheable (캐시 처리 가능)
- REST의 가장 큰 특징 중 하나는 HTTP라는 기존 웹표준을 그대로 사용한다.
- HTTP가 가진 캐싱 기능이 적용 가능하다. HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.

### 4. Self-descriptiveness (자체 표현 구조)
- REST의 또 다른 큰 특징 중 하나는 REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다는 것

### 5. Client - Server Architecture (클라이언트 - 서버 구조)
- REST 서버는 API를 제공하고, 제공된 API를 이용해서 비즈니스 로직 처리 및 저장을 책임진다.
- 클라이언트의 경우 사용자 인증이나 컨택스트(세션,로그인 정보)등을 직접 관리하고 책임진다.
- 서로간의 의존성이 줄어들게 된다.

### 6. 계층형 구조
- 클라이언트 입장에서는 REST ApI 서버만 호출한다.
- REST 서버는 다중 계층으로 구성될 수 있다. 예를 들어 보안, 로드 밸런싱, 암호화, 사용자 인증등등 추가하여 구조상의 유연성을 줄 수 있다.

## REST 구성
- 자원(Resource) - URI
- 행위(Verb) - HTTP Method (GET, PUT, POST, DELETE등등)
- 표현(Representations)

## REST API 디자인 가이드
- URI는 Resource를 표현해야 한다.
- Resource에 대한 행위는 HTTP Method (GET, PUT, POST, DELETE등등)로 표현한다.

### 1. REST API 중심 규칙

#### 1.1 URI는 정보의 자원을 표현해야 한다.

```
GET /course/insert/inform -- X
GET /course/inform -- O
```

- HTTP Method (GET, PUT, POST, DELETE등등)의 행위가 URI 표현으로 들어가서는 안된다.

#### 1.2 자원에 대한 행위는 HTTP Method (GET, PUT, POST, DELETE등등)로 표현

 ```
 DELETE /members/1
 ```

 - HTTP Method(GET, PUT, POST, DELETE등등)로 행위로 CRUD를 할 수 있다.

## 참고내용

### CRUD : 소프트웨어(Software)가 가지는 기본적인 데이터 처리 기능을 묶어서 일컫는 말
 - 생성(Create)
 - 읽기(Read)
 - 갱신(Update)
 - 삭제(Delete)

 이름 | 조작 | SQL
 --------------- | ----------------
 Create	| 생성 | INSERT
 Read(또는 Retrieve) | 읽기(또는 인출) | SELECT
 Update | 갱신 | UPDATE
 Delete(또는 Destroy) | 삭제(또는 파괴) | DELETE

### 2. URI 설계 시 주의할 점

#### 2.1 소문자를 되도록이면 사용하자

- 예를 들어 test.com의 자원(Resource) Test와 test가 있지만 대소문자에 따라 구분하기 때문에 다른 자원(Resource)으로 인식하게 된다.

- RFC 3986(URI 문법 형식)은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정하고 있다.

```
http://test.com/Test -- 서로 다른 Resource : Test
http://test.com/test -- 서로 다른 Resource : test
```

#### 2.2 하이픈(-)은 URI 가독성을 높이는데 사용하자

- 경로(Path)에 띄어쓰기가 들어가는 경우 %20이 들어가 가독성이 매우 떨어진다.

- 하이픈(-)을 사용하여 띄어쓰기를 대체하고 가독성을 높일 수 있다.

#### 2.3 확장자를 사용하지 말자

- REST API에서는 확장자를 사용하지 않으면서 자원(Resource)을 다루는 데  더 유연해 진다.
- 확장자 대신에 Accept Header를 사용하여 문제를 해결한다.

```
http://test.com/test.jpg -- X
http://test.com/test -- O
GET /test HTTP/1.1
Host: test.com
Accept: image/jpg
```

### 3. 자원을 표현하는 Collection과 Document

- 도큐먼트(Document)는 단순한 문서와 같은 존재
- 컬렉션(Collection) 문서들의 집합, 객체들의 집합같은 존재

```
http://test.com/citys/seoul/gangnam
```

- 위에 예제 중 citys가 컬렉션(Collection)에 해당되며 복수로 표현을 하고 있는 점이 중요하다.

### 4. HTTP 응답 코드

#### 4.1 성공(Success)

상태코드 | 내용
--------------- | ----------------
200	| 정상적으로 수행
201 | 자원(Resource) 생성 요청. 성공적으로 수행됨

#### 4.2 클라이언트 에러(Client Error)

상태코드 | 내용
--------------- | ----------------
400	| 클라이언트 요청이 부적절할 경우 응답 코드
401 | 클라이언트가 권한이 없는 자원(Resource)를 요청하였을 때 응답 코드
403 | 보호되는 자원(Resource)를 요청하였을 때 응답 코드
405 | 클라이언트가 요청한 리소스에서는 사용 불가능한 Method를 이용했을 때 응답 코드

#### 4.3 기타

상태코드 | 내용
--------------- | ----------------
301	| 클라이언트가 요청한 리소스에 대한 URI가 변경 되었을 때 응답 코드
500 | 서버에 뭔가 문제가 있을때 사용하는 응답 코드


## [그런 REST API로 괜찮은가? - EungJun Yi님](https://slides.com/eungjun/rest#/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/RP_f5dMoHFc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Reference
- <http://meetup.toast.com/posts/92>
- <https://ko.wikipedia.org/wiki/REST>
- <http://blog.remotty.com/blog/2014/01/28/lets-study-rest/#prologue>
- <http://www.slideshare.net/SangBaekLee3/restful-api-67239776?qid=e125f342-ebf9-4472-8ade-1c5041cdc0b1&v=&b=&from_search=2>
- <https://spoqa.github.io/2012/02/27/rest-introduction.html>
- <https://ko.wikipedia.org/wiki/CRUD>
