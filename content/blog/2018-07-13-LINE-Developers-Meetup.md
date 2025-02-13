---
title: LINE Developers Meetup - Server tech 후기
tags:
  - Review
date: 2018-07-13
aliases: 
  - ../articles/2018-07/LINE-Developers-Meetup
---

![[Assets/posts/20180713/1.png]]

# Central Dogma - 송민우님
> LINE's Git-based highly-available service configuration repository

- Central Dogma는 Git, ZooKeeper 와 HTTP/2에 기반하는 멀티-마스터로 동작하는 고가용성 버전관리 서비스 설정 저장소로서, LINE의 오픈소스 프로젝트 입니다.
- Central Dogma의 기능 소개와 더불어 설정 관리 워크플로우 관점에서 어떻게 변화를 가져왔는지 소개합니다.

## [Central Dogma](https://line.github.io/centraldogma/)
- Github : <https://github.com/line/centraldogma>

### 배경
- 설정파일은 어느 위치에 안전하게 저장해야할까?
    - HardCoding
- HardCoding의 문제점?
    - 서버 중지
    - 변경
    - 서버 재시작
- Central Dogma
    - 이런 문제를 해결하기 위해 등장
    - 주로 JSON
    - HA(High Available)
    - JSON 일부분만 수정 가능
    - 특정 부분이 변경되었을 경우 notification
    - Mirroring from an external Git repository
- Stores anything textual
    - Start Time
        - Bean Properties
    - Run time에도 변경 가능
        - User Ip 블랙리스트
        - A/B Test를 위한 변수
        - scheduled maintenance notice
        - Bussiness rule 스크립트들
- 고가용성(Highly-available)
    - Multi-master
    - Eventually consistent
        - Retry
        - [Client Side load-balancing](http://blog.leekyoungil.com/?p=259)
    - Fast read/ Slow write
    - [ZooKeeper](https://zookeeper.apache.org/) as a replication log queue
        - ZooKeeper는 Ram을 사용
        - ZooKeeper는 Write가 느리기 때문에 유의할 것.
- Version-controlled
    - jGit as a back-end storage
    - History - diffs and authors
    - Bigger than Ram
- Focus on simplicity
    - Integer revision numbers : Integer만으로 최신인지 아닌지 판단 가능
    - Linear history : no branches
- Advanced query mechanism
    - first-class JSON support
    - JSON을 Query 형태로 조회할 수 있다.
- Fine-grained access control
    - Apache Shiro as the authentication layer
    - Four roles
        - Administrator, Owner, Member and Guest
### 가치
- Queryable
- Watchable
- Highly-available
- Accessible from same network

### 앞으로 해야 할 것.
- Go client improvements
- Web UI improvements
- Independence from Apache Shiro
- Replace Zookeeper With Raft

### Slide

<script async class="speakerdeck-embed" data-id="a7b66c82136e494595cc06507adef5a4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# Armeria - 이희승님
> Armeria를 이용한 비동기 마이크로서비스 개발

- Armeria는 Java, Netty, HTTP/2, gRPC 와 Thrift 에 기반한 LINE의 오픈소스 리액티브 비동기 마이크로서비스 프레임워크 입니다.
- 분산 tracing과 서비스 discovory와 같은 강력한 기능을 지원하면서도 배우기 쉬운 Armeria에 대해서 알아보고, 왜 비동기로 동작하는 리액티브 마이크로서비스 프레임워크가 모든 규모의 서비스에서 꼭 필요한지 알아봅니다.

## [Armeria](https://line.github.io/armeria/)
- 비동기를 지향
- 1000개의 요청이 오면 1000개의 Thread가 일을 시작해야 한다.
- 실제로는 just waiting for the backend.
- Java Thread Default Stack size : 2MB
- Shard 1개가 오류가 난 경우?
    - 점점 응답을 기다리는 Thread개수가 증가하면서..
    - 서버가 전면 장애 발생.
- Reactive Streams
    - 응답 결과가 큰 경우
        - 순간적으로 메모리 사용 증가.
        - Out of Memory 발생.
        - Pagenation?
            - 추가적인 Resource 소요.
        - 무제한일수도 있는 Response?
            - Stock quotes
    - HTTP 문제 인가?
        - 그건 아니다.
        - 동기 문제로 인한 문제 발생.
    - 응답이 작은 경우 

- Armeria 지원 Protocol
    - HTTP2 지원
    - Reactive Streams API
    - gRPC, Thrift, REST services
    - Tomcat or Jetty
    - RPC 지원
        - 1st Class citizen in web framework
        - binary Protocol

- [Vert.x](https://d2.naver.com/helloworld/163784)
    - OpenSSL-based faster TLS connection

- Thrift
- 왜 사용할까?
    - gRPC
        - HTTP/1.2, TLS on off
        - gRPC-Web support, i.e. 
    - Thrift
        - HTTP/2
        - TTEXT a.k.a human-readable JSON

- Decorate
    - AOP
    - Request throttling
    - Metric collection
    - Distributed tracing Zipkin
    - HTTP content encoding
    - CORS
    - Automatic retries
    - Circuit breakers

- 비동기 Stack Trace 어려움
    - Heap Dump

### Slide

<script async class="speakerdeck-embed" data-id="aa6b9f1dc9b34401997e8d737ebb2e52" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# Redis - 최종열님
> LINE, 25 billion messages per day

- LINE에서는 메시징 서비스를 위한 Storage system으로 Redis와 HBase, Kafka를 사용하고 있습니다. 
- 매일 250억건 이상의 메시지를 배달하기 위해서, 1,000대 이상의 고성능 물리 서버에서 14,000개 이상의 Redis 노드를, 60여개 클러스터에 나눠서 이용하고 있습니다.
- 여기에서는 많은 I/O와 응답속도가 중요한 메시징을 위해서, 어떻게 Redis 관련 facility를 개발 및 운영하여 높은 트래픽을 짧은 응답속도로 유지할 수 있는지에 대해서 설명합니다. 
- 내용에는, 클라이언트 샤딩을 어떻게 하고 있는지, 공식 Redis 클러스터 도입 경험, 내부 모니터링 시스템, 비동기 Redis 클라이언트 도입 경험 등을 다룹니다.

- Redis 3.0 Clustering 지원
- LINE
    - 25 billion messages per day
    - 420000 messages in Happy New Year
    - Messaging server
    - Asynchronous Task Processor
        - Kafka
    - Redis
        - Cache or Database
        - 종류별로 사용
        - 1000개 이상 머신 
        - 192 - 256 Gb Memory
    - Hbase
        - Back up 
        - Cold data
    - ZooKeeper
        - Master, Slave 관계 정보 관리
    - Client sharding
        - pros
            - shrot response
            - 서버 비용 절감
        - cons
            - fat client
- Switch Packet Drop
- Redis Upgrade 하기 힘들다.


### Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/uMHmdJqxfL5PNA" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>


## 내가 얻은 것.
- 현재 내가 경험하고 있는 비슷한 Architecture에서 Scale이 커질 경우에 발생하는 문제들을 해결하는 방법들인것 같다.
    - 설정 파일 또한 서버 수가 많으면 많을수록 관리 어려움을 Line은 저렇게 문제 해결하고 오픈소스화 하였다.
    - Monitoring의 중요성. 기록하고 관찰해야 문제해결이 쉽고 빠르게 진행된다.
    - 다양한 상황 고려하기. 이런 Case, 저런 Case 상황은 여러개로 발생할 수 있다.
- 모르는 용어가 아직 많기 때문에 정리하기.

## Reference
