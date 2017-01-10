---
layout: post
title: Intellij War 추출하기
categories: [Intellij]
excerpt: " "
comments: true
share: true
tags: [Intellij]
date: 2017-01-10
---

# **Intellij War 추출하기**

Intellij에서 Deploy를 하기 위해 War를 추출하는 방법에 대해 알아보자.

### 1. 해당 Project Structure 열기

![No Image](/assets/20170110/War1.PNG)

### 2. Project Settings 아래에 있는 Artifacts 클릭

> Artifacts : 1. (천연물과 대비하여) 인공물, 공예품   2. 인공 유물   3. 인위(人爲) 구조[결과], 인공 산물

![No Image](/assets/20170110/War2.PNG)

### 3. +를 누른 후 Web Application Archive 클릭 하여 Project 선택

> Archive : 1. 기록 보관소   2. 기록 보관소에 보관하다   3. 파일을 보관하다

![No Image](/assets/20170110/War3.PNG)

### 4. Build Artifacts를 누른다.

![No Image](/assets/20170110/War4.PNG)

### 5. HelloMVC.war Build를 시작한다.

![No Image](/assets/20170110/War5.PNG)

### 6. HelloMVC_war.war 확인하기.

![No Image](/assets/20170110/War6.PNG)

### 7. Appache로 HelloMVC_war.war 배포하기

![No Image](/assets/20170110/War7.PNG)

### 8. Appache Start 누르기

![No Image](/assets/20170110/War8.PNG)

### 9. War 파일이 해체된 모습을 볼 수 있다.

![No Image](/assets/20170110/War9.PNG)

### 10. 접속해보기

> http://localhost:8080/war파일이름/

![No Image](/assets/20170110/War10.PNG)
