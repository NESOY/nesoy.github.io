---
layout: post
title: Spring의 MVC & Front Controller Pattern
categories: [Design Pattern]
excerpt: ' '
comments: true
share: true
tags: [MVC,Pattern,Spring,Web,Design Pattern]
date: 2017-02-17
---

> SPring을 기반한 MVC Project를 활용하여 하던 중에 Pattern에 대해 궁금증을 가지고 찾아보았다. Front Controller Pattern에 대해 자세히 알게 되어 이번 포스팅에 적어 좀 더 자세히 기억하려고 한다. 또한 이번 포스팅에는 요새 포스팅을 많이 못한 점에 대해 반성하는 의미도 있다. 1 Day : 1 Commit을 지켜보자.

## 1. MVC(Model-View-Controller) Pattern 이란?
- MVC(Model-View-Controller) Pattern의 목표는 사용자 인터페이스로부터 *비즈니스 로직* 과 *프레젠테이션 로직* 의 분리이다.
- 분리를 통해 비즈니스 로직은 재사용이 가능하도록 존재하며 뷰(View)또한 쉽게 고칠 수 있는 장점이 있다.

## 2. MVC(Model-View-Controller) Pattern 구성요소

![NO Image](/assets/posts/20170217/1.PNG)

#### 컨트롤러(Controller)
  1. 모델(Model)에 명령을 보냄으로써 모델의 상태를 변경할 수 있다.
  2. 컨트롤러(Controller)가 관련된 뷰에 명령을 보냄으로써 모델의 표시 방법을 바꿀 수 있다.

#### 모델(Model)
  1. 모델(Model)의 상태에 변화가 있을 때 컨트롤러와 뷰에 이를 통보한다.
  2. 뷰(View)는 모델의 통보를 통해 최신결과를 보여준다.
  3. 컨트롤러(Controller)는 모델(Model)의 변화에 따른 적용 가능한 명령을 추가,제거,수정할 수 있다.

#### 뷰(View)
  1. 사용자가 볼 결과물을 생성하기 위해 모델(Model)로부터 정보를 얻어 온다.

## 3. Front-Controller Pattern 이란?

![NO Image](/assets/posts/20170217/2.PNG)

- 웹 어플리케이션(Web application)과 관련된 패턴(Pattern)이다.
- 모든 리소스(Resource) 요청을 처리해주는 하나의 컨트롤러(Controller)를 두는 패턴이다.
- MVC(Model-View-Controller) Pattern과 함께 사용하는 패턴이다.


## 4.Front-Controller Pattern 장점은 무엇일까?
- 모든 요청(Request)를 하나의 컨트롤러(Controller)를 통해 작업을 한 곳에서 수행할 수 있다.
- 추적(Tracking)이나 보안(Security)를 적용할 때 하나의 컨트롤러(Controller)에 하기 때문에 편하다.
- 파일 구조가 바뀌어도 URL을 유지할 수 있다.


## 정리

> Spring을 통해서 결론을 짓는다면 DispatchServlet(Front-Controller)이 Bean으로 등록되어 Controller Package를 Scan하여 @Controller를 등록하는 것은 Controller(Page-Controller)이라는 것을 확인 할 수 있었다.

## 참조

- <https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC>
- <https://en.wikipedia.org/wiki/Front_controller>

-  <https://medium.com/@smartbosslee/php-%EC%98%88%EC%A0%9C%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%ED%94%84%EB%9F%B0%ED%8A%B8-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC-front-controller-%ED%8C%A8%ED%84%B4-c00e9d222963#.3866pqoxj>
