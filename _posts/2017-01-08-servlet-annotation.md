---
layout: post
title: Servlet Annotation
categories: [Servlet]
excerpt: " "
comments: true
share: true
tags: [Servlet,Annotation]
date: 2017-01-08
---

# **Servlet Annotation**

Servlet을 공부하던 중에 index.html에서 action의 DoLogin을 호출하는 경우가 있었다.

``` html
<form action="DoLogin" method="post">
    Username : <input type="text" name="username"> <br>
    Password : <input type="password" name="password"> <br>
    <input type="submit" value="Press">
</form>
```

404 에러가 발생 하였다.

![No Image](/assets/20170108/404error.PNG)

에러의 이유를 찾다보니까 Servlet Annotation의 문제가 확인 되었다.

> #### Servlet Annotation은 기존의 web.xml에 추가하던 방식을 대체하는 방식이다.

#### 기존 web.xml 방식
``` xml
<Servlet>
  <Servlet-name>HelloWorld</Servlet-name>
  <Servlet-class>HelloWorld</Servlet-class>
</Servlet>
<Servlet-mapping>
  <Servlet-name>HelloWorld</Servlet-name>
  <url-pattern>/Hello</url-pattern>
</Servlet-mapping>
```

#### Servlet Annotation
``` java
@WebServlet("/Hello") // http://hostName/appName/Hello
```

현재 진행중인 Servlet Annotation 모습

``` javascript
@WebServlet(name = "DoLogin")
```

이렇게 작성하였는데 name은 Servlet 이름을 알려주는 것이고 정작 Servlet urlPatterns이 없어서 Server가 URL 위치를 몰라 404 Error를 낸거 같다.


Servlet urlPatterns을 넣어줘야 Server가 위치를 알고 resource를 찾아 잘 넘겨준다.

``` javascript
@WebServlet(name = "DoLogin", urlPatterns="/DoLogin")
```

## WebServlet Attributes

![No Image](/assets/20170108/attributes.PNG)


## 참조

<https://tomcat.apache.org/tomcat-7.0-doc/servletapi/javax/servlet/annotation/WebServlet.html>


<http://www.codejava.net/java-ee/servlet/webservlet-annotation-examples>
