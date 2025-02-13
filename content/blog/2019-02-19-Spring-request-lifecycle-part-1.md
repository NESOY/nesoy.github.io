---
title: SpringMVC Request Life Cycle에 대해 - PART 1
tags:
  - Spring
date: 2019-02-19
aliases: 
  - ../articles/2019-02/Spring-request-lifecycle-part-1
---

![[Assets/logo/spring.png]]


## 들어가며
> SpringMVC에서 Request가 들어오면 어떠한 과정을 거치는지 정리하기 위해 작성합니다.

- 아래는 이 글을 작성하는데 많은 도움을 얻은 글입니다.
    - [SpringMVC 시작 - woniper님](https://blog.woniper.net/366)

![[Assets/posts/img/2019-02-18-20-20-08.png]]

## DispatcherServlet 구조

![[Assets/posts/img/2019-02-19-13-41-06.png]]


## [Servlet#service](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/Servlet.java#L153)

![[Assets/posts/img/2019-02-19-13-44-53.png]]

- WAS(Tomcat)은 Servlet의 service를 실행하게 됩니다.

## [GenericServlet#service](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/GenericServlet.java#L277)

![[Assets/posts/img/2019-02-18-21-58-48.png]]

- Servlet Interface를 가진 Abstract Class
- 실제 구현체인 HttpServlet을 봐야 이해가 가능합니다.

## [HttpServlet#service](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/http/HttpServlet.java#L635)

![[Assets/posts/img/2019-02-18-22-01-15.png]]

- HTTP Method에 맞는 do{HttpMethod} 함수를 호출하게 됩니다.

#### [HttpServlet은 abstract Method가 없는데 왜 Abstract Class일까?](https://stackoverflow.com/questions/18909206/why-httpservlet-is-an-abstract-class-any-functional-reason)
- HttpServlet class 자체를 생성하지 못하기 위해서 Abstract Class로 정의해 놓은거 같습니다.
- 왜 생성하지 못하게 막아놨을까?
    - API/Interface는 정의되어있지만, 기능적으로는 완벽하지 않기에 Abstract Class로 정의되었다.라고 찾아 볼 수 있습니다.

#### [Default HttpServlet#doGet은 어떻게 동작할까?](https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/http/HttpServlet.java#L167)

![[Assets/posts/img/2019-02-19-22-54-11.png]]

- Error Message만 반환하는 것을 볼 수 있습니다.

## [FrameworkServlet#service](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L874)

![[Assets/posts/img/2019-02-19-14-01-53.png]]

- HttpMethod가 Patch와 null인 경우 `FrameworkServlet#processRequest`
- 그 외에는 super.service 즉 `HttpServlet#service`를 호출합니다.

#### HttpMethod GET으로 호출하면 어떻게 진행될까?
- `HttpServlet#service`에서 `HttpServlet#doGet`을 거쳐
- @Override된 `FrameworkServlet#doGet`을 최종적으로 호출하게 됩니다.

#### 테스트 케이스 : NesoyServlet#doGet이 호출이 될까?

![[Assets/posts/img/2019-02-19-23-26-46.png]]

#### Test 결과값

![[Assets/posts/img/2019-02-19-23-27-40.png]]


## [FrameworkServlet#doGet](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L874)

![[Assets/posts/img/2019-02-18-22-01-46.png]]

- `FrameworkServlet#processRequest`로 전달하는 것을 확인할 수 있습니다.

## [FrameworkServlet#processRequest](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L987)

![[Assets/posts/img/2019-02-19-23-34-48.png]]

- final로 선언되어 있어 변경이 불가능합니다.
- Javadoc에 `doService`는 Template Method라는 정보가 있습니다.



### processRequest에서 무슨일을 진행할까?


#### 1. 초기화 & Context 저장
- Locale
    - 이전 LocalContext 정보를 저장합니다.
    - 현재 HTTP request의 Locale 정보를 얻습니다.
- RequestAttributes
    - 이전 RequestAttributes 정보를 저장합니다.
    - HttpServletRequest, HttpServletResponse, HttpSession을 담고 있는 `ServletRequestAttributes` 클래스를 생성합니다.

- LocaleContextHolder, RequestContextHandler에 저장
    - LocaleContextHolder에는 LocalContext를 저장합니다.
    - RequestContextHandler에는 RequestAttributes를 저장합니다.

#### [2. FrameworkServlet#doService](https://github.com/spring-projects/spring-framework/blob/master/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L1177)

![[Assets/posts/img/2019-02-18-22-02-39.png]]

- 실제 구현은 `DispatcherServlet#doService`를 봐야합니다.

#### 3. Context 복구 & 후처리
- 이전에 저장해놨던 Context로 다시 돌려놓습니다.
- log 결과값을 로깅합니다.
- RequestHandleEvent를 진행합니다.


## Reference
- <https://justforchangesake.wordpress.com/2014/05/07/spring-mvc-request-life-cycle/>
- <https://blog.woniper.net/369>
