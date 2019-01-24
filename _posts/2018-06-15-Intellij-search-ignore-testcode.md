---
layout: post
title: Intellij 검색에서 Test Code 제외하기
categories: [Intellij]
excerpt: " "
comments: true
share: true
tags: [Intellij]
date: 2018-06-15
---


![No Image](/assets/logo/Intellij.png)

## 문제 정의

![No Image](/assets/posts/20180615/1.PNG)

- 늘 Source 검색을 하게 되면 Test Code가 섞여 결과를 보기 힘든 문제점이 있습니다.

## 문제 해결 하기
#### 1. Options을 선택합니다.

![No Image](/assets/posts/20180615/2.PNG)

#### 2. Custom을 선택 후 Production Files을 선택합니다.
![No Image](/assets/posts/20180615/3.PNG)


## 결과 화면

![No Image](/assets/posts/20180615/4.PNG)

- 원하는 File Scope에서 검색하여 결과를 확인할 수 있습니다.
- Test Code만 설정하여 검색할 수도 있습니다.



## Reference
- <https://stackoverflow.com/questions/16671706/how-can-i-tell-intellijs-find-in-files-to-ignore-generated-files>