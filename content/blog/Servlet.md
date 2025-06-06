---
aliases: [/articles/2019-02/Servlet]
comments: false
date: 2019-02-06
description: 
tags: [Java]
title: Java Servlet에 대해
---
# Java Servlet에 대해
## [Servlet이란?](https://tomcat.apache.org/tomcat-9.0-doc/servletapi/index.html)
- tomcat 9.0에 정의된 Servlet 내용입니다.

```
Servlet은 웹서버 내부에서 동작하는 작은 자바 프로그램입니다.
A servlet is a small Java program that runs within a Web server.

Servlet은 일반적으로 HTTP를 통해 웹 Client들로부터 요청을 수신하고 응답합니다.
Servlets receive and respond to requests from Web clients, usually across HTTP, the HyperText Transfer Protocol.

Servlet 인터페이스를 구현하기 위해선 GenericServlet을 상속받거나 HTTP Servlet을 상속받아 구현합니다.
To implement this interface, you can write a generic servlet that extends javax.servlet.GenericServlet or an HTTP servlet that extends javax.servlet.http.HttpServlet.

Servlet 인터페이스는 Servlet을 초기화하고, 요청을 처리하고, Servlet을 서버에서 제거하는 방법에 대해 정의합니다. 이러한 방법을 Life Cycle이라고 하며 다음과 같은 순서로 호출됩니다.
This interface defines methods to initialize a servlet, to service requests, and to remove a servlet from the server. These are known as life-cycle methods and are called in the following sequence:

1. Servlet은 생성될 수 있으며 init()을 호출합니다.
1. The servlet is constructed, then initialized with the init method.

2. Client로부터 발생한 모든 요청은 service()를 통해 다루게 됩니다.
2. Any calls from clients to the service method are handled.

3. Servlet이 서비스를 마치게 되면, destroy()를 통해 종료되며 GC에 의해 메모리 정리가 됩니다.
3. The servlet is taken out of service, then destroyed with the destroy method, then garbage collected and finalized.

Life Cycle외에도 시작 정보를 얻는 데 사용할 수 있는 getServletConfig()와 작성자, 버전 및 저작권과 같은 Servlet에 대한 기본 정보를 반환할 수 있는 getServletInfo()를 제공합니다.
In addition to the life-cycle methods, this interface provides the getServletConfig method, which the servlet can use to get any startup information, and the getServletInfo method, which allows the servlet to return basic information about itself, such as author, version, and copyright.
```

### Servlet Interface는 어떻게 되어있을까?

![[assets/posts/20190206/1.png]]

- void init(ServletConfig config)
    - servlet container에 의해 생성 됩니다.
- ServletConfig	getServletConfig()
    - Servlet이 시작할 때 필요한 정보가 담긴 ServletConfig를 반환합니다.
- void service(ServletRequest req, ServletResponse res)
    - servlet container에 의해 servlet 요청과 응답을 다룹니다.
- String getServletInfo()
    - 작성자, 버젼, 저작권과 같은 정보를 반환합니다.
- void destroy()
    - servlet container에 의해 제거 됩니다.


## Servlet Config란?

```
하나의 Servlet 초기화에 필요한 정보를 전달하기 위한 Config 객체입니다.
A servlet configuration object used by a servlet container to pass information to a servlet during initialization.
```

### Servlet Config Interface는 어떻게 되어있을까?

![[assets/posts/20190206/2.png]]

- getServletName()
    - Servlet 이름을 반환합니다.
- getServletContext()
    - ServletContext를 반환합니다.
- getInitParameter(String name)
    - name에 해당하는 초기 Parameter 정보를 얻습니다.
    - Parameter가 존재하지 않는다면 null를 반환합니다.
- getInitParameterNames()
    - Servlet이 가지고 있는 초기 Parameter Enumeration을 반환합니다.
    - 존재 Parameter가 없다면 Empty Enumeration을 반환합니다.


## Servlet Context란?
```
Servlet Container, Servlet 커뮤니케이션를 위한 Method 집합을 의미합니다. MIME Type 정보를 얻거나, 요청을 제공받거나, Log파일을 기록하는 것을 예로 들 수 있습니다.
Defines a set of methods that a servlet uses to communicate with its servlet container, for example, to get the MIME type of a file, dispatch requests, or write to a log file.

하나의 Java Virtual Machine당 "웹 애플리케이션"마다 하나의 Servlet Context가 존재합니다. ("웹 어플리케이션"은 .war 파일을 통해 설치될 수 있는 servlet, content들의 집합입니다.)
There is one context per "web application" per Java Virtual Machine. (A "web application" is a collection of servlets and content installed under a specific subset of the server's URL namespace such as /catalog and possibly installed via a .war file.)

Deploy Descriptor의 "distributed"로 표시된 웹 애플리케이션의 경우 각 가상 머신당 하나의 Context가 존재합니다.
In the case of a web application marked "distributed" in its deployment descriptor, there will be one context instance for each virtual machine.

이러한 경우 정보가 실제로 Context가 Global하지 않기 때문에 정보를 Global하게 사용할 수 없습니다. 대신 데이터베이스 같은 외부 리소스를 통해 공유하게 됩니다.
In this situation, the context cannot be used as a location to share global information (because the information won't be truly global). Use an external resource like a database instead.

ServletContext는 Servlet이 초기화될 때 웹 서버가 제공하는 ServletConfig 객체를 포함하고 있습니다.
The ServletContext object is contained within the ServletConfig object, which the Web server provides the servlet when the servlet is initialized.
```


### ServletConfig, ServletContext는 무엇이 다른가?

![[assets/posts/20190206/4.png]]

- ServletConfig
    - Servlet당 하나만 생성
    - READ ONLY
- ServletContext
    - 모든 Servlet에서 하나의 객체를 공유할 때 사용.
    - JVM당 하나만 생성
        - 분산 환경인 경우 ServletContext가 다를 수 있습니다.
    - READ-WRITE 가능
    - 모든 Servlet들의 ServletConfig를 포함


## ServletContextListener란?
> 웹 어플리케이션의 생명주기를 감시하는 Listener

- XML형태의 Deploy Descriptor에서는 `param-value`가 String으로만 가능한 단점.
    - `param-value`에 Object를 넣기 위해 등장.
- 웹 어플리케이션의 시작과 종료시 호출
    - contextInitialized()
    - contextDestroyed()
- [이 외에도 많은 Listener가 존재합니다.](https://medium.com/@kwangsoo/servlet-listener-37f4d5cfe9e4)


## Generic Servlet이란?

![[assets/posts/20190206/3.png]]

- Protocol에 독립적인 Servlet을 위해서 Abstract Class로 존재.
- 실제 구현체는 아직 HttpServlet밖에 존재하지 않았습니다.

## HttpServlet이란?

![[assets/posts/20190206/5.png]]

- GenericServlet을 상속받은 Servlet
- HTTP Protocol 지원하는 Servlet

## Reference
- <https://github.com/apache/tomcat>
- <https://stackoverflow.com/questions/4223564/servletconfig-vs-servletcontext>
