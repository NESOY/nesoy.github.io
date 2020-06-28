---
layout: post
title: Docker Image에 대해
excerpt: ''
categories:
- docker
tags:
- docker
date: 2020-06-05
---

![](/assets/logo/docker.png)

#### Docker의 이미지는 무엇일까?
- `컨테이너 실행에 필요한 파일과 설정값등을 포함하고 있는 것`으로 상태값을 가지지 않고 변하지 않습니다.
- 보통 용량이 수백메가에 이르기 때문에 이미지에 작은 변화가 생기는 경우에는 어떻게 해결하였을까?
    - Layer라는 개념을 사용하여 쉽게 추가하고 제거할 수 있게 구성하였다.
    - http://melonicedlatte.com/computerarchitecture/2020/03/02/204500.html


#### 이미지가 크면 클수록 무엇이 문제가 될까?
- 이미지 빌드 시간(기반 이미지 다운로드 시간 포함)
- 이미지를 도커 레지스트르에 등록하는 시간
- 컨테이너를 실행할 호스트 혹은 노드에서 이미지를 다운로드하는 시간



#### Docker 자주사용하는 옵션
- `-i`
    - 컨테이너를 실행할 때 컨테이너 쪽 표준 입력과의 연결을 그대로 유지한다.
    - 그러므로 컨테이너 쪽 셀에 들어가서 명령을 실행할 수 있다.
- `-t`
    - 유사 터미널 활성화하는 옵션
    - 보통 `-it`를 같이 활용

- `--rm`
    - 컨테이너를 종료할 때 컨테이너를 파기하도록 하는 옵션

#### 도커 상태값
- 도커 컨테이너는 정지된 상태에서도 정지 시점의 상태를 유지한 채 디스크에 남아 있다.
- 컨테이너 실행 및 정지를 반복하다 보면 디스크 용량을 점점 많이 차지하게 된다.


## 컨테이너는 어떻게 나눠야 할까?
- 하나의 관심사
> Each Container Should have only one concern.
- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#decouple-applications

## 커널 및 아키텍처의 차이
- Docker는 호스트 OS와 커널 리소스를 공유한다.
- 이는 도커 컨테이너는 특정 CPU 아키텍처 혹은 운영 체제에 종속적이다.
- 라즈베리 파이의 ARM 계열 armv7I 아키텍처를 채용한 플랫폼에서 인텔의 x86_64 아키텍처에서 빌드한 도커 컨테이너를 실행할 수는 없다.
- 우리는 보통 CentOS, 우분투 현재 공식 이미지의 사실상 표준 역할을 하는 알파인 리눅스 (Alpine Linux)
- 다른 아키텍처에서 동작하는 도커에서는 실행을 보장할 수 없다.
    - 도커의 이식성에 대한 가장 큰 오해중 하나가 이것


#### 그냥 이미지를 만들면 되는 것인가?
- 엄청 뚱뚱
- https://perfectacle.github.io/2019/04/16/spring-boot-docker-image-optimization/
- <https://reimaginer.tistory.com/entry/optimize-spring-boot-dockerfile-on-maven>
- <https://phauer.com/2019/no-fat-jar-in-docker-image/>
- <https://github.com/GoogleContainerTools/jib>
- <https://cloudplatform.googleblog.com/2018/07/introducing-jib-build-java-docker-images-better.html>
- <https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1>