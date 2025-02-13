---
title: 웹 템플릿 엔진(Template Engine) 이란?
tags:
  - Web
date: 2017-03-06
aliases: 
  - ../articles/2017-03/web-template
---

![[Assets/logo/web.jpg]]

> Spring의 JSP나 Springboot의 Thymeleaf등등 Template에 대해 역할 궁금하여 찾아본 결과 Web Template System의 Engine이란 걸 알았다. Web Template System에 대해 정리하고 또 기억하기 위해 포스팅을 한다.

## 템플릿 시스템(Template System)

- 템플릿 프로세서(Template Processor)를 사용하여 웹 템플릿(Web Template)를 결합하여 완성된 웹 페이지를 만들어내는 시스템이다.
- 자료(Data)를 결합하여 페이지를 만들어 내기도 하고 많은 양의 Content를 표현하는 것을 도와준다.

## 템플릿 시스템(Template System)의 구성요소

![[Assets/posts/20170306/1.PNG]]

- 템플릿 엔진(Template Engine)
- 템플릿 자료(Template Resource) : 템플릿 언어로 작성된 웹 템플릿
- Content Resource : XML, 다양한 종류의 데이터 스트림

## 템플릿 시스템(Template System)의 종류

> 템플릿(Template)와 결합되는 위치에 따라 종류를 나눌 수 있다.

- 서버 쪽(Server Side) : 웹 서버(Web Server)
- 클라이언트 쪽(Client Side) : 웹 브라우저(Web Browser)
- Edge-Side : 프록시 서버(Proxy Server)
- 분산(Distributed) : 다수의 서버(Multiple Server)
- 서버 밖(OutSider Server) : 정적 웹 페이지(Static Web Page)는 Offline에서 제작되고 웹 서버에 업로드 된다.

## 정적 사이트 생성기(Static site generators)

- Static Web Page만을 생성한다.
- OutSider Server의 대표적인 예시이다.

![[Assets/posts/20170306/2.PNG]]

## Server-side Systems

- Server-side dynamic pages가 미리 존재한 템플릿에 맞게 생성된다.
- 대표적인 예시로 Thymeleaf, Django등등이 있다.

## Client-side systems

- Browser에서 XSLT 스타일시트를 적용하여 XML의 데이터를 XHTML로 바꿀 수 있다.
- Javascript를 이용하여 템플릿을 구성하기도 한다.

![[Assets/posts/20170306/3.PNG]]

## 참조

- <https://en.wikipedia.org/wiki/Web_template_system>
