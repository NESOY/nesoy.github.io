---
aliases: [/articles/2017-01/Maven]
comments: false
date: 2017-01-11
description: 
tags: [IntelliJ, Java, Maven]
title: Maven
---
# Maven
> **자바 프로젝트의 빌드를 자동화 해주는 Build Tool**

## 메이븐 활용 패턴

### Build
- 소스 코드를 컴파일 한다.
- 테스트 코드를 컴파일 한다.
- 기타 패키지 생성을 위한 바이너리를 생성한다.

### Package
- 배포 가능한 jar, war, exe 파일 등을 생성한다.

### Test
- 단위 테스트(Unit Test) 등을 실행한다.
- 빌드 결과가 정상적인지 점검한다.

### Report
- 빌드/패키지/테스트 결과를 정리하고, 빌드 수행 리포트를 생성한다.

### Release
- 빌드 후 생성된 아티팩트(artifact)를 로컬 혹은 원격 저장소에 저장(배포)한다.

## Key Concept
### Plugin
- 플러그인 실행 프레임워크
- 플러그인 메커니즘에 의해 기능이 확장(모든 작업은 플러그인이 수행된다)
- 모든 작업은 플러그인이 수행된다
- 플러그인은 다른 산출물(artifacts)와 같이 저장소에서 관리된다.
- 플러그인은 골(goal)의 집합이다.

### Lifecycle
- 일련의 단계를 골(goal)
- 논리적인 작업 흐름인 단계의 집합이 라이프사이클(Lifecycle)

### Dependency
- 라이브러리 다운로드 자동화
- 메이븐은 선언적
- 메이븐이 관리

### Profile
- 서로 다른 대상 환경(target environment)를 위한 다른 빌드 설정
- 다른 운영체제
- 다른 배포 환경

### POM
- Project Object Model
- Project 당 하나의 pom.xml 파일을 하나씩 가진다.
- 자원 식별 기준(group id, artifact id, version)


## 설정 파일
### Setting 파일
- Maven 툴과 관련된 설정을 담당
- `MAVEN_HOME/settings.xml` : 모든 사용자에 적용되는 `전역적인` 메이븐 설정 정보
- `USER_HOME/.m2/setting.xml` : `특정 사용자`에 적용되는 메이븐 설정 정보

> 주의할 점은 복수의 s의 유무이다.
- 전역적인 `settings.xml` VS 특정 사용자에게 적용되는 `setting.xml`

### pom.xml
- Project Object Model
- 프로젝트 내 빌드설정을 담당.
- 프로젝트 최상위에 존재
- dependency 관리도 한다.

### Example pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0   http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.nesoy</groupId> <!-- 프로젝트를 생성하는 조직의 고유 아이디-->
    <artifactId>demo-maven</artifactId> <!-- 프로젝트를 식별하는 유일한 아이디-->
    <version>1.0-SNAPSHOT</version> <!-- 프로젝트 현재 버젼을 의미-->

    <packaging>war</packaging> <!-- 프로젝트를 어떤 형태로 패키징할지 결정한다. jav, war, ear, pom등이 해당된다.-->

    <!-- 프로젝트와 의존관계에 있는 라이브러리를 관리 -->
    <dependencies>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
    </dependencies>
</project>
```

## 의존 라이브러리 추가하기
- 중앙 원격 저장소에서 라이브러리를 쉽게 받을 수 있다.
- Maven Repository : <https://mvnrepository.com/>

![[assets/posts/20170111/mvnRepository.PNG]]

- pom.xml에 dependencies Tag 안에 쓰고 저장하기

```xml
<!-- 프로젝트와 의존관계에 있는 라이브러리를 관리 -->
<dependencies>
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
  </dependency>
</dependencies>
```

### 확인하기
![[assets/posts/20170111/library.PNG]]


## LifeCycle
> Maven은 미리 정의하고 있는 빌드 순서를 라이프사이클 이라고 한다.

### 기본 라이프 사이클
- compile : 소스 코드를 컴파일
- test : 단위 테스트 실행 (기본설정은 단위 테스트가 실패하면 빌드 실패로 간주함)
- package : 컴파일된 클래스 파일과 리소스 파일들을 war 혹은 jar와 같은 파일로 패키징
- install : 패키징한 파일을 로컬 저장소에 배포 (USER_HOEM/.m2/)
- deploy : 패키징한 파일을 원격 저장소에 배포 (nexus 혹은 maven central 저장소)

### Clean 라이프 사이클
- clean : 메이븐 빌드를 통하여 생성된 모든 산출물을 삭제

### Site 라이프 사이클
- site : 메이븐 설정파일 정보를 활용하여 프로젝트에 대한 문서 사이트를 생성
- site-deploy : 생성한 문서 사이트를 설정되어 있는 서버에 배포

## Intellij Maven Project 만들기
### Maven 선택하기

![[assets/posts/20170111/1.PNG]]

### groupId, ArtifactsID 설정

![[assets/posts/20170111/2.PNG]]

### Project 설정

![[assets/posts/20170111/3.PNG]]

### Project Structure 모습

![[assets/posts/20170111/4.PNG]]

## 기존의 Project에 Maven 추가하기
### Add Framework Support 설정으로 넘어가 Maven 선택하기
![[assets/posts/20170111/5.PNG]]

## Intellij Maven Life Cycle
### 실행하고 싶은 Lifecycle을 더블클릭하면 실행이 된다.
![[assets/posts/20170111/lifecycle.PNG]]


## Issue
### Import가 잘 안되어 있는 경우
- `.m2/repository` 로컬 저장소에서 실제 확인하기 -> 없으면 중앙 원격 저장소에 라이브러리 확인하기

### 경로 설정에 매우 민감하다.
- archtype을 통해 만들면 경로 설정에 방해를 덜 받을 수 있다.
- 기본적으로 web-resource파일은 `webapp`으로 설정하고 있다.

### 원격 배포도 가능하다.

## Reference
- <http://dimdim.tistory.com/entry/Maven-%EC%A0%95%EB%A6%AC>
- <http://www.slideshare.net/ssuser5445b7/ss-56566336>
- <http://www.slideshare.net/sunnykwak90/ss-43767933?qid=d4b7d95c-e1f6-45e6-94e9-3d6b80b1c27b&v=&b=&from_search=1>
- <https://www.jetbrains.com/help/idea/2016.3/getting-started-with-maven.html#create_maven_project>
