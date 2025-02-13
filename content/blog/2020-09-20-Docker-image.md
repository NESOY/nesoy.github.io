---
title: Docker Image에 대해
tags:
  - docker
date: 2020-09-20
aliases: 
  - ../articles/2020-09/Docker-image
---

![[Assets/logo/docker.png]]

#### Docker의 이미지는 무엇인가?
- subicura님의 표현이 가장 이해하기 쉬웠다.
    > `컨테이너 실행에 필요한 파일과 설정값등을 포함하고 있는 것`
    - <https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html>
    - 이런 이미지들은 읽기 전용으로 변하지 않는 성격(Read Only)을 가지고 있다.
    - 그리고 마지막으로 Container Layer가 존재하며 해당 변경 사항들을 기록하고 관리한다.

#### 도커 이미지를 가지고 어떻게 OS위에 다른 OS, Application들을 동작하게 할 수 있을까?
![[Assets/posts/img/2020-09-20-21-23-47.png]]

- 리눅스 시스템이 시작될 때와 비슷한 이벤트들이 발생한다.
    - <https://nolleh.tistory.com/131>
    - BootLoader(Boot File System)
        - 커널 이미지를 메모리로 로드하고, Ram 정보를 초기화하고 언마운트 한다.
    - Root FileSystem
        - 유닉스 기반의 운영체제의 디렉토리 구조와 파일들을 가지고 운영체제를 실행한다.

#### 이미지가 크면 클수록 무엇이 문제가 될까?
- 이미지 빌드 시간(기반 이미지 다운로드 시간 포함)이 길어진다.
- 이미지를 도커 레지스트리에 등록하는 시간이 길어진다.
- 컨테이너를 실행할 호스트 혹은 노드에서 이미지를 다운로드하는 시간이 길어진다.

#### 그래서 이미지들의 변경점들 잘 나누어 최대한 재활용할 수 있게 바꿔야 한다.
- [Spring Boot Application Image 최적화하기](https://perfectacle.github.io/2019/04/16/spring-boot-docker-image-optimization/)
- [Maven 환경에서 Spring Boot Application의 Dockerfile 최적화](https://reimaginer.tistory.com/entry/optimize-spring-boot-dockerfile-on-maven>)
- <https://phauer.com/2019/no-fat-jar-in-docker-image/>
- <https://github.com/GoogleContainerTools/jib>
- <https://cloudplatform.googleblog.com/2018/07/introducing-jib-build-java-docker-images-better.html>

## Reference
- <https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html>
- <https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1>
- <https://rampart81.github.io/post/docker_image/>
- <https://nolleh.tistory.com/131>
- <https://www.44bits.io/ko/post/how-docker-image-work>
- <https://iximiuz.com/en/posts/from-docker-container-to-bootable-linux-disk-image/>
- <https://collabnix.com/understanding-docker-container-image/>
