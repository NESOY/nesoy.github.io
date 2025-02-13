---
title: Redirect와 Forward의 차이에 대해
tags:
  - Web
date: 2018-04-09
aliases: 
  - ../articles/2018-04/Redirect-Forward
---
![[Assets/posts/20180409/0.png]]

## 들어가며
> 예전에 Spring Project를 진행하면서 redirect와 forward차이점에 대해 궁금하였지만 지금에 와서야 차이점을 알게 되었고 정리하기 위해 작성합니다.

## Redirect란?
![[Assets/posts/20180409/1.png]]
- Client가 Server에 Resource를 요청합니다.
- Server는 상태값 3XX와 함께 Redirect 주소[Location]를 같이 보내게 됩니다.
- Client는 새로운 주소값으로 다시 Resource를 요청합니다.
- Server는 새로운 Resource를 응답합니다.

```
HTTP/1.1 302 Found
Location: nesoy.github.io
```

> Client에서 새로운 Location에 대해 요청을 하기 때문에 Web Container 내부에서 자원을 공유할 수 없습니다. 자원을 공유하기 위해선 QueryString를 생성해야합니다.

### 추가 자료
- 다양한 Redirect 종류 : <https://developer.mozilla.org/ko/docs/Web/HTTP/Redirections>

## Forward란?
![[Assets/posts/20180409/2.png]]
- Client가 Server에 Resource를 요청합니다.
- Server는 Web Container(Tomcat, Jboss등)에 의해 LoginServlet에서 HelloServlet로 forward하게 됩니다.
    - 이때 객체 정보는 Request Scope, Session Scope, Page Scope를 통해 전달되게 됩니다.
- Server는 최종적으로 HelloServlet의 결과를 응답하게 됩니다.
- Client입장에서는 한번의 요청으로 결과물을 받아볼 수 있습니다.

> Forward는 Web Container의 내부에서 이동하기 때문에 request와 response 객체를 공유할 수 있습니다.

## 결론
- URL의 변화여부가 필요하다면 Redirect를 사용하는 것이 좋습니다.
- 객체를 재사용하거나 공유해야한다면 Forward를 사용하는 것이 좋습니다.

## Reference
- <https://developer.mozilla.org/ko/docs/Web/HTTP/Redirections>
- <https://okky.kr/article/32206>

