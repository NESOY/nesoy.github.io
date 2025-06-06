---
aliases: [/articles/2020-11/Jib]
comments: false
date: 2020-11-23
description: 
tags: [Docker, Java]
title: Jib
---
# Jib
![[assets/posts/img/2020-11-23-23-27-40.png]]

## 왜 Jib는 등장하게 되었는가?
- 우리가 그동안 도커 이미지를 만들기 위해 무슨 일들을 했을까?
    - 구글에 Java Docker Image 생성하는 법을 찾아본다.
        - 열심히 DockerFile을 작성한다.
        - 우분투를 받고 -> 자바를 다운받고 -> 어플리케이션을 빌드하고 -> 실행한다.
    - 조금 더 빠르게 작성해볼까?
        - 설치하지 않고 `openjdk`이미지를 가져와서 빌드된 jar를 복사하게 작성한다.
        - 복잡한 과정이 단순하게 만들었다.
    - 하지만 `openjdk` 이미지 용량이 큰게 문제가 된다.
        - alpine이라는 이미지를 활용해보자. -> 용량이 줄었다.
        - DockerFile을 최적화하기 위해 문서를 읽는다. - [문서](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
    - `.dockerignore`를 열심히 작성한다.
        - `!target/something-*.jar`
    - 조금 더 개선하여 빌드된 dependencies들을 따로 분리해서 저장한다.
        - 분리된 의존성을 하나의 Layer로 관리한다.
        - 최대한 Cache를 활용하여 Dockerfile을 작성한다.
    - Maven Plugin을 활용한다.

- 이 모든 과정이 복잡하고.. 학습난이도도 높고.. 난 그저 단순히 Containerizing하고 싶다.
> 그래서 이 복잡한 과정을 단순하게 만들기 위해 만든게 Jib이다.

## Jib란?
- Containerize your Java application.
- 플러그인 적용하고. jib를 실행하면 된다.
- 마치 Container의 `compiler`와 같은 역할이라고 볼 수 있다.

### Goals
- Fast
    - 어플리케이션을 Multiple Layer로 분리하여 이미지를 빌드한다.
    - 변경된 사항만 이미지 빌드에 반영되기 때문에 아주 빠르다.
- Reproducible
    - 동일한 컨텐츠로 이미지를 빌드하면 항상 같은 이미지를 만들게 된다.
    - 불필요한 업데이트는 발생하지 않는다.
- Daemonless
    - Docker Image를 Maven, Gradle와 같은 빌드 툴을 통해 만들 수 있다.
    - 더이상 Dockerfile이나 Docker build/push와 같은 액션이 필요없게 된다.

### Jib Base Image는?
- 실행환경에 필요한 부분만 들고 있다.
    - 표준 Linux distribution에 포함된 shell과 같은 프로그램은 없다.
- <https://github.com/GoogleContainerTools/distroless>

## Getting Started
- [Gradle Quick Start](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#quickstart)

```gradle
plugins {
  id 'com.google.cloud.tools.jib' version '2.6.0'
}
```

```
gradle jib - build image
gradle jibDockerBuild - Docker daemon를 활용한 빌드
```

- 다양한 옵션들이 있다.
    - <https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#extended-usage>

### Multi Module Example
- <https://github.com/GoogleContainerTools/jib/tree/master/examples/multi-module>

### Jib를 사용하면서 겪었던 문제들
- jib에서 만드는 컨테이너 이미지에 *를 사용함으로써 classpath ordering이 바뀌게될 수 있는 상황 -> 최신 버젼을 사용하면 해결된다.(java version 11 up)
    - https://github.com/GoogleContainerTools/jib/issues/2733

## Reference
- <https://github.com/GoogleContainerTools/jib>
- <https://cloudplatform.googleblog.com/2018/07/introducing-jib-build-java-docker-images-better.html>
- <https://www.youtube.com/watch?v=H6gR_Cv4yWI>
- <https://github.com/opencontainers/image-spec>
