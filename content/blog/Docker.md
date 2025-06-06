---
aliases: [/articles/2020-05/Docker]
comments: false
date: 2020-05-25
description: 
tags: [Docker]
title: Docker
---
# Docker
## 들어가며
- 도커를 조금 더 자세하고 정확하게 이해하기 위해 자료를 정리합니다.
- 아래의 모든 내용의 출발점은 `도커는 어떻게 OS위에서 동작할까?`에서 시작합니다.

## 도커는 OS위에서 동작하는거 같은데.. 가상 머신일까? 프로세스(컨테이너)일까?
### [가상 머신이란 무엇일까?](https://www.redhat.com/ko/topics/virtualization/what-is-a-virtual-machine)
- 가상 머신은 하드웨어(CPU, RAM, Network) 스펙들을 소프트웨어로 구현합니다.
- 쉽게 말하자면 소프트웨어 위에 컴퓨터를 다시 만드는 것?
- 하이퍼바이저에 의해 구동되는 VM은 각 VM마다 독립된 가상 하드웨어 자원(CPU, RAM, Network등)을 할당받습니다.
- 논리적으로 분리되어 있어서 한 VM에 오류가 발생해도 다른 VM으로 퍼지지 않는다는 장점이 있습니다.

### [리눅스 컨테이너란?](https://www.redhat.com/ko/topics/containers/whats-a-linux-container)
- `운영체제 수준`의 가상화 기술로 `리눅스 커널을 공유`하면서 `프로세스를 격리된 환경`에서 실행하는 기술입니다.
- 리눅스 컨테이너는 호스트 머신에게는 프로세스로 인식합니다.
- 컨테이너 관점에서는 마치 독립적인 환경을 가진 가상 머신처럼 보입니다.
- 컨테이너에는 다양한 프로세스 격리 기술이 사용됩니다.
    - chroot
        - 호스트의 루트가 아닌 Root 디렉토리를 변경하는 기능
        - [chroot로 인한 파일시스템 분리 - 44bits](https://www.44bits.io/ko/post/change-root-directory-by-using-chroot)
        - [chroot를 사용해 프로세스의 루트 바꾸기](https://steemit.com/kr/@mishana/1-chroot)
    - [cgroups](http://jake.dothome.co.kr/control-groups/)
        - 자원에 대한 제어를 가능하게 해주는 기능
        - CPU, 메모리, I/O, 네트워크
    - namespaces
        - 컨테이너 별로 서로가 충돌하지 않도록 하는 기능
        - 독립적인 프로세스 공간을 할당하거나
        - namespace간 네트워크 충돌방지하는 등등의 기능
    - 프로세스 격리 기술의 표준으로 정의해둔 OCI(Open Container Initative) 스펙을 구현한 컨테이너 기술의 구현체
        - LXC, LibContainer, runC

![[assets/posts/img/2020-05-26-14-07-01.png]]


### [컨테이너와 가상 머신은 무슨 차이가 있을까?](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/containers-vs-vm)
### VM

![[assets/posts/img/2020-05-26-14-10-08.png]]

- 커널이 각각 소유하기 때문에 보안에 더 강하다.
- 더 많은 자원을 사용하게 된다.
- 문제가 생기는 경우 운영체제부터 리부팅을 진행해야 하기 때문에 복구 시간이 오래 걸린다.

### Linux Container

![[assets/posts/img/2020-05-26-14-09-51.png]]

- 커널을 공유하기 때문에 보안에 취약할수도 있다.
- 커널을 공유하기에 더 적은 자원을 사용하게 된다.
- 문제가 생기는 경우 해당 컨테이너만 빠르게 리부팅을 하여 복구 할 수 있다.

### 추가적으로 컨테이너는 커널을 공유한다는데.. 커널옵션은 어떻게 적용되는것인가?
- 예전에는 우회하는 방법을 사용했지만 현재 문서를 확인해보니 공식적으로 지원하는 것처럼 보인다.
    - [docker ulimit](https://docs.docker.com/engine/reference/commandline/run/#set-ulimits-in-container---ulimit)
    - 커널 옵션이 공유가 되는 건 아닌 것처럼 보이는데 정확하게는 더 찾아봐야겠다..


## Reference
- [도커 컨테이너는 가상머신인가요? 프로세스인가요?](https://www.44bits.io/ko/post/is-docker-container-a-virtual-machine-or-a-process)
- [리눅스 컨테이너란?](https://www.44bits.io/ko/keyword/linux-container)
- [만들면서 이해하는 도커(Docker) 이미지의 구조](https://www.44bits.io/ko/post/how-docker-image-work)
- [초보를 위한 도커 안내서 - 도커란 무엇인가?](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)
- [Docker(container)의 작동 원리: namespaces and cgroups](https://tech.ssut.me/what-even-is-a-container/)
- <https://tech.osci.kr/docker/2018/09/10/45749387/>
- <https://tech.osci.kr/2020/03/03/91690167/>
