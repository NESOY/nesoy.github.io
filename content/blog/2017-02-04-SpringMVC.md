---
title: Intellij에서 Spring MVC 시작하기
tags:
  - Spring
  - Intellij
date: 2017-02-05
aliases: 
  - ../articles/2017-02/SpringMVC
---

![[Assets/logo/spring.png]]

> Intellij에서 Spring MVC를 이용하여 Hello World를 띄우기 까지 매우 많은 삽질을 통해 해결했다. 많은 이들이 포스팅을 통해서 삽질을 그나마 줄일 수 있다면 좋겠다.

## Intellij Maven Project 만들기

- New Project - Maven - Create from archetype(해제하기)

![[Assets/posts/20170204/1.PNG]]

## Project SpringMVC Framework 추가하기

- Add Framework Support

![[Assets/posts/20170204/2.PNG]]

- Spring - Spring MVC 체크하기

![[Assets/posts/20170204/3.PNG]]

## Spring MVC Library 다운로드 완료 후 Project 모습
![[Assets/posts/20170204/4.PNG]]

## web.xml 변경하기
- servlet-mapping의 url-pattern변경하기 : ``` *.form -> / ```
- 변경 전 web.xml

![[Assets/posts/20170204/5.PNG]]

- 변경 후 web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/applicationContext.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern> <!-- *.form -> / 바꾸기-->
    </servlet-mapping>
</web-app>
```

## 라이브러리 추가해주기

- Project Structure - Artifacts에 들어간다.

![[Assets/posts/20170204/18.PNG]]

### Available Elements 아래에 있는 Library를 더블 클릭한다.
- Spring-4.3.6-RELEASE to artifact
- Spring MVC-4.3.6-RELEASE to artifact

### 옮겨진 모습

![[Assets/posts/20170204/19.PNG]]


## dispatcher-servlet.xml에 추가하기

- Annotation 활성화 & component-scan 파일 지정하기

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.0.xsd">

    <mvc:annotation-driven></mvc:annotation-driven> <!-- Annotation 활성화 -->
    <context:component-scan base-package="Controller"></context:component-scan> <!-- Component 패키지 지정 -->

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>

</beans>
```
- Annotation 활성화를 안해주면 bean을 하나하나 다 등록 해야 하는 어려움이 있다.
- component-scan 패키지를 지정해주지 않으면 spring-framework가 scan을 못하여 작동하지 않게 된다.

## views 디렉토리 파일 만들기 & index.jsp 이동시키기

- New - Directory

![[Assets/posts/20170204/6.PNG]]

- index.jsp

```html
<%--
  Created by IntelliJ IDEA.
  User: NESOY
  Date: 2017-02-04
  Time: 오후 11:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  Hello Spring World
  </body>
</html>
```



## Controller 디렉토리 만들기 & 간단한 Controller code

- New - Directory

![[Assets/posts/20170204/7.PNG]]

```java
package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by NESOY on 2017-02-04.
 */
@Controller
public class controller {

    @RequestMapping(value = "/")
    public String test(){
        return "index";
    }
}
```

## Run Edit Configuration으로 Tomcat Server 추가하기

- Run - Edit Configuration

![[Assets/posts/20170204/8.PNG]]

- Tomcat Server 추가하기

![[Assets/posts/20170204/9.PNG]]

- Warning 나오면 Fix 버튼누르기

![[Assets/posts/20170204/10.PNG]]

- war exploded로 추가하여 설정한 모습

![[Assets/posts/20170204/11.PNG]]

## Error 1 : web.xml의 ApplicationContext.xml 빨간 글씨가 발생하여 tomcat 실행 X
### 원인
- tomcat의 context root 기본 파일 이름명이 `webapps` 때문에 에러가 발생하였다.
### 해결방법
- 경로 재설정 / 파일 이름 바꾸기 두 가지 해결방법이 있다.
- 아래는 경로 재설정을 설명한 것이다.
- 만약 이 에러가 보인다면 아래와 같이 따라하자.

![[Assets/posts/20170204/12.PNG]]

### WEB-INF 경로 잡아주기

- Open Module Settings에 들어간다.

![[Assets/posts/20170204/13.PNG]]

- Modules - web - Web Resource Directory가 빨간 글씨가 된 걸 확인할 수 있다.

![[Assets/posts/20170204/14.PNG]]

- 경로 다시 잡아 주기

![[Assets/posts/20170204/15.PNG]]

- 해결 된 모습

![[Assets/posts/20170204/16.PNG]]

## Error 2 : Tomcat 오류 - RMI TCP Connection

- 만약 이 에러가 보인다면 아래와 같이 따라하자.

![[Assets/posts/20170204/17.PNG]]

### 해결 방법 : Library 집어넣기.

- Project Structure - Artifacts에 들어간다.

![[Assets/posts/20170204/18.PNG]]

- **Available Elements 아래에 있는 Library를 더블 클릭한다.**

- 옮겨진 모습

![[Assets/posts/20170204/19.PNG]]

## 모든 에러를 통과한 후 실행하기

> 깔끔하게 성공된 모습을 볼 수 있다.

![[Assets/posts/20170204/20.PNG]]

