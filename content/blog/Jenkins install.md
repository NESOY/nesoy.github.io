---
aliases:
  - /articles/2017-02/Jenkins
comments: false
date: 2017-02-20
description: 
tags:
  - Jenkins
title: 젠킨스(Jenkins) 설치하기
---
# Jenkins Install
## 1. 젠킨스(Jenkins)란?
- 지속적인 통합 CI(Continuous Integration) Server이다.
- 자바(Java)를 기반으로 만들어 졌으며 Open source이다.
- 다양한 플러그를 제공한다.
- subversion, git등 소스 툴과 Maven등 빌드 툴을 지원한다.

## 2. 젠킨스(Jenkins)를 설치하기 위해 필요한 준비물
### *아래의 모든 프로그램을 설치하기를 바란다.*
- JDK - Java
- Web Server(Tomcat, JBoss)
- Build Tool(Maven, Ant)
- Git, SVN

## 3. 젠킨스(Jenkins) 다운로드 하기
- Download Link : <https://jenkins.io/>
- LTS Release를 다운 받는다.

![[assets/posts/20170220/1.PNG]]

## 4. 젠킨스(Jenkins) War File을 WebServer로 구동하기

> 위 예제는 WebServer를 Tomcat을 사용할 예정이다.

- Tomcat Home위치에 Webapps에 Jenkins.war를 위치시킨다.

![[assets/posts/20170220/2.PNG]]

- Tomcat을 구동하면 Jenkins 디렉토리가 생성된다.

![[assets/posts/20170220/3.PNG]]

![[assets/posts/20170220/4.PNG]]

## 5. 젠킨스(Jenkins) 접속하기

- 접속하기 : <http://localhost:8080/jenkins>

- 성공화면

![[assets/posts/20170220/5.PNG]]

## Error - 아래와 같은 화면이 처음이라면?
![[assets/posts/20170220/6.png]]

### 초기 비밀번호를 다시 설정해 줘야 합니다.
> 경로 : `C:Users/사용자/.jenkins/secrets/initialAdminPassword`

![[assets/posts/20170220/7.png]]

### Password를 입력한 모습
![[assets/posts/20170220/8.png]]

### 다음 설정화면 입니다.
![[assets/posts/20170220/9.png]]

### Admin 계정을 만들고.
![[assets/posts/20170220/10.png]]

### Jenkins를 즐기시면 됩니다 :)
![[assets/posts/20170220/11.png]]
