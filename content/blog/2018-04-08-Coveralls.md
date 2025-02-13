---
title: Coveralls 시작하기
tags:
  - DevOps
  - Coveralls
date: 2018-04-08
aliases: 
  - ../articles/2018-04/Coveralls
---

# CoverAlls
![[Assets/posts/20180408/coveralls.png]]
- [Code Coverage](https://nesoy.github.io/articles/2018-01/Code-Coverage)를 제공해주는 Web Service
- [Travis-ci](https://nesoy.github.io/articles/2017-01/travis-ci)와 같이 사용하면 좋다.

## 왜 사용하는가?
- 협업하는 과정에서 많은 Pull Request를 자동적으로 빌드, 테스트 및 Code Coverge를 분석해서 결과물을 자동적으로 댓글에 결과물을 남겨줍니다.
![[Assets/posts/20180408/9.png]]

## Tutorial
- Java 대한 플러그인, gradle 위주로 설명하겠습니다.
- <https://coveralls.io/>
- Github : <https://github.com/NESOY/gradle-travisci-coveralls>

### 회원가입 및 로그인
![[Assets/posts/20180408/1.png]]
![[Assets/posts/20180408/2.png]]

### 원하는 Project 연동 추가하기
![[Assets/posts/20180408/3.png]]
![[Assets/posts/20180408/4.png]]

### 원하는 Project가 안보이거나 검색이 안되는 경우 `페이지 맨 아래`에 메뉴에 가서 권한 부여하기
![[Assets/posts/20180408/5.png]]

### Repo_token 부여 및 .coveralls.yml 프로젝트에 추가하기
- `.coveralls.yml`만들기
- `repo_token` 추가하기
![[Assets/posts/20180408/6.png]]
![[Assets/posts/20180408/7.png]]

### Gradle 설정하기
- 테스트 커버리지 측정 도구 : `cobertura`
- 테스트 결과 report : `coveralls`
- <https://github.com/kt3k/coveralls-gradle-plugin>

```gradle
dependencies {
		classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
		classpath 'org.kt3k.gradle.plugin:coveralls-gradle-plugin:2.8.2'
	}

...

plugins {
	id 'net.saliman.cobertura' version '2.3.1'
	id 'com.github.kt3k.coveralls' version '2.8.2'
}

...

cobertura.coverageFormats = ['html', 'xml'] // coveralls plugin depends on xml format report
```

### Travis - ci Script 추가하기
```yml
after_success:
- ./gradlew cobertura coveralls
```

### Markdown 뱃지 추가하기
- [![Coverage Status](https://coveralls.io/repos/github/NESOY/gradle-travisci-coveralls/badge.svg?branch=master)](https://coveralls.io/github/NESOY/gradle-travisci-coveralls?branch=master)

![[Assets/posts/20180408/8.png]]






## Reference
- <http://jojoldu.tistory.com/275>

