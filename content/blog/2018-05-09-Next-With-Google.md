---
title: Next With Google 후기.
tags:
  - Review
date: 2018-05-09
aliases: 
  - ../articles/2018-05/Next-With-Google
---
![[Assets/posts/20180509/1.png]]
## MSA 진실 혹은 거짓 - 이정운님
### What is MSA?
![[Assets/posts/20180509/2.png]]
- [Monolithic Architecture](https://en.wikipedia.org/wiki/Monolithic_application)
    - 단일 프로세스
    - 변경주기가 하나로 묶여있음
        - 원하는 것만 Update 불가능
- [Microservices](https://martinfowler.com/articles/microservices.html)
    - 서비스는 독립적으로 배포 및 확장 가능
    - 분리된 팀에 의해서 관리
        - [Conway's Law](http://www.melconway.com/Home/Conways_Law.html) : 시스템 구조는 설계하는 조직의 커뮤니케이션 구조를 닮게 된다.
        - [피자 두 판을 먹을 팀크기](http://blog.idonethis.com/two-pizza-team/)
    - [폴리그랏(polyglot)](https://en.wikipedia.org/wiki/Polyglot_(computing)) : 여러개의 언어를 사용하는 것
        - 다른 프로그래밍으로 작성 가능
            - Gateway는 Nodejs로 작성할 수 있다.
            - Backend는 Java로 작성할 수 있다.

    - 함께 동작하는 작고 자율적인 서비스
    - 서비스 당 하나의 코드베이스
    - 특성
        - 비즈니스 역량을 중심으로 조직화
        - **[스마트 엔드포인트와 덤프(dumb) 파이프](https://medium.com/@nathankpeck/microservice-principles-smart-endpoints-and-dumb-pipes-5691d410700f)**
        - 분산된 거버넌스
        - 분산 데이터 관리
        - 장애를 고려한 설계(Design for failure)
            - Component가 Health하지 않다면?
            - failover
            - 장애를 고려하여 설계 할 것.
        - 인프라 자동화
        - 진화하는 형태의 디자인

    - 그러나?
        - 쪼개고 쪼개고 쪼개다 보면. 파편화
        - Dead Star
        - 어떻게 이 MSA를 **효율적**으로 관리할 것인가?

    ![[Assets/posts/20180509/3.png]]

- Service Framework
    - [Spring Cloud Netflix](https://cloud.spring.io/spring-cloud-netflix/)
    - 분산된 서비스들을 어떻게 연결할거야?
        - [Zuul](https://github.com/Netflix/zuul) & [Ribbon](https://github.com/Netflix/ribbon)
        - [Zuul 관련 글](http://woowabros.github.io/r&d/2017/06/13/apigateway.html)
        - [API Gateway Pattern](http://bcho.tistory.com/1005)
            - [hop](https://ko.wikipedia.org/wiki/%ED%99%89_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)) 수를 줄이는 방법
            - Security
            - Auditing
            - Routing
            - Protocol Transaction
        - 내부 통신을 위해 API 게이트 없이 통신?
            - [Ribbon](https://github.com/Netflix/ribbon)
    - 서비스 등록 및 건강상태 확인?
        - [Eureka](https://github.com/Netflix/eureka)
        - 서비스는 엄청나게 많다.
            - 동적으로 서비스 라우팅을 위한 Self-등록 및 검색
        - [Service Registry Discovery Pattern](https://kihoonkim.github.io/2017/01/27/Microservices%20Architecture/Chris%20Richardson-NGINX%20Blog%20Summary/4.%20Service%20Discovery%20in%20a%20MSA/)
        - Spring Annotation 지원
        - Health Check
    - 장애를 어떻게 고려할거야?
        - [Circuit breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html) - [해석](http://egloos.zum.com/pulgrims/v/3047353)
            - [Hystrix](https://github.com/Netflix/Hystrix) - [관련 글](http://woowabros.github.io/experience/2017/08/21/hystrix-tunning.html)
        - Fallback Pattern
        - Timeout날 때까지 있으면 안된다.
            - Timeout이 날 때까지 Thread는 계속적으로 생성되고
            - 그러다 보면 서버는 느려지거나 죽거나..
        - I'm Dead라는 사실을 API Gateway에게 빠르게 알려야 한다.
    - Monitoring and Tracing
        - 분산 서비스 소요되는 시간 Tracking

- 아키텍처란 문제 해결을 위한 것
    - 좋은 아키텍처란?
        - 시스템이 특정 목적에 부합하는지 확인
        - 현실의 문제를 어떻게 잘 해결할 수 있는가를 평가
        - 품질 및 Trade Off 포인트 - 장점/단점
- MSA가 정답일까요?
    - 정답은 아니다.
    - [마틴 파울러의 MSA Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html)
    ![[Assets/posts/20180509/4.png]]
        - 성능이 좋지않다.
        - 정확성이 좋지않다.
        - 관리하기 어려움.
- 스타트업의 일반적인 현실
    - 서비스의 복잡성이 낮음.
    - 개발에 집중해야 함.
        - 정말 개발에만 집중하고 있는가?
    - 서비스의 급격한 팽창을 기대
    - 안죽는 서비스
        - 고가용성
        - 버젼관리 및 무중단 배포
    - 짱짱한 서비스
        - 자동 확장(Auto Scaling)
        - A/B 테스트
        - 손쉬운 비동기 서비스 연결
    - 손이 적게드는 서비스
        - 통합 모니터링 및 로깅 알람
        - 자동화된 배포 관리
        - No-ops or serverless

## Microservice Architecture in Action - 조병욱님
- [Conway's Law](http://www.melconway.com/Home/Conways_Law.html)
    - 구현하는 팀을 따라간다.
    - 팀 구성을 잘해야한다.
- Netflix
    - 아키텍쳐 공개를 많이함.
    - [Netflix 배포 관련 글](https://medium.com/netflix-techblog/how-we-build-code-at-netflix-c5d9bd727f15)
- Circuit Breaker
    - Circuit Open
    - 장애 전파 방지하기
    - Fallback Pattern
    - Hystrix
- Spring - Netflix
    - Annotation 지원
- Distributed Transaction trace
    - APM - [제니퍼](https://jennifersoft.com/ko/product/apm/)
    - [Zipkin](https://github.com/openzipkin/zipkin)
        - 구간 사용하는 시간 확인 가능
        - Trace id, Span id 확인 가능
        - [Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/)
        - Custum
            - Start : Servlet Filter
            - End : RESTtemplate
- [Envoy Proxy](https://github.com/envoyproxy)
    - HTTP, HTTP2, gRPC 지원
    - Lua engine
        - Redis
    - 서버 1000대가 넘으면 어떻게 할까?
        - istio Auth
        - Mixer - 정책확인
        - Pilot
        - [Link](https://istio.io/docs/concepts/what-is-istio/overview.html)

- [Phoenix Server Pattern](http://bcho.tistory.com/1224)
    - Bakering new Image
    - Ansible
    - Packer - Platform에 맞게 image를 Bakering
    - [Spinnaker](https://www.spinnaker.io/)
        - Phoenix Server Pattern을 제공하는 프레임워크
        - Server Group 변경
        - Multi Cloud 지원
        - Execution window : 특정 시간대에 특정 Task만 할 수 있게 지정가능
        - Manual Judgements
        - Manual Rollbacks
    - Red/black
        - 순식간에 전체를 이동시킨다.
        - 비용이 많이 든다.
    - Rolling red/black
        - 한개씩 이동시킨다.
        - 문제생기면 Rollback
    - Canary
        - 일부 트래픽만 이동시켜 문제 감지하기
    - Authentication
        - LDAP

- Kubernetes
    - VM is heavy
    - Docker is light
    - Kubernetes : Docker Manager
    - sidecar with kubernetes
        - Application은 변경
        - envoy / zipkin collector / log collector는 유지
        - [Sidecar Pattern](https://docs.microsoft.com/ko-kr/azure/architecture/patterns/sidecar)
            - Logging
            - Proxy
            - Configuration
        - 최소 배포 단위 : Pod
            - ip, disk 공유
        - Labels
            - instance 쉽게 구별하는 기능
- How to make Good Team?
    - 아래 순서대로 진행하는게 좋다.
    - Clean Code
    - Good Design
    - Developer Written Automated Tests
    - MSA
    - Domain Driven Design

- Book
    - [Site Reliability Engineering](http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=129407308)
    - Google Cloud Korea


## 딥러닝에 사용할 로그 기깔나게 잘 디자인하기 - 백정상님
- Little Big Data 발표자료와와 비슷하여 링크를 따로 남깁니다.
- [Link](https://nesoy.github.io/articles/2018-04/Little-Big-Data)

## Google ML API로 Chatbot 간지나게 만들기 - Jerry Jeong님
- 인터페이스의 변화 SNS -> 메신저
- 많은 비즈니스를 메신저
    - 대화 및 음성의 편리함
    - 쉬워야 한다.

## 나는 무엇을 얻었는가?
- Microservice에 대해 조금 더 이해할 수 있었던 자리였습니다.
- 무엇보다 내가 경험했던 문제와 비슷한 문제를 겪고 그들은 어떻게 해결하였는지 알 수 있었던 계기였습니다.
- 대량의 많은 서버를 관리해야하고 배포하는 문제는 경험해보지 못했지만 간접적으로 경험하는 좋은 자리였던 것 같습니다.
- 관련 Framework와 Pattern들이 너무 많아 앞으로 천천히 찾아봐야겠다..
- 무엇보다 [Martin Fowler](https://martinfowler.com/).. 이 분은 하늘에서 내려오셨나보다.


## Reference
- <https://medium.com/startlovingyourself/microservices-vs-monolithic-architecture-c8df91f16bb4>
