---
aliases:
  - /articles/2018-11/KOSSCON-2018
comments: false
date: 2018-11-30
description: 
tags:
  - Review
  - KOSSCON
title: KOSSCON - 2018 후기
---
# KOSSCON - 2018 후기
![[assets/posts/20181130/1.png]]

## Streaming 101 - 임정택님
### 스트리밍 데이터의 정의
- Static Data : 유한한 데이터 (1~9)
- Streaming Data : 끝이 없는 데이터 흐름 (~ 5,6,7,8 ~)
    - 연산이 끝나지 않고 계속 해서 진행되는 특징
    - 정렬 연산은 진행할 수 없다. 끊임없이 데이터가 들어오기 때문에.

### 스트리밍 처리의 특성 - 배치 처리와의 차이점
- 많은 경우 데이터를 `처음부터 다시 처리하는 것`이 어렵다.
    - 일부 데이터 삭제 혹은 유실로 모든 데이터를 보관하고 있지 않거나..
    - 시스템의 처리 용량을 실시간 데이터 유입 양에 맞추기 때문에 다시 처리하는 것은 어렵습니다.

### 시스템 / 프레임워크 오류가 발생한다면?
- 전체 데이터를 다시 처리할 수가 없습니다.
    - Batch 쿼리는 최악의 경우에도 중간 결과를 버리고 다시 실행할 수 있지만..
    - 스트리밍 처리는 오류 발생 시 처리 중이던 데이터를 재처리해야 한다.
    - 결과 정확도가 `Fault-tolerance guaratee`에 따라 달라짐.
- Fault-tolerance guarantee란?
    - At most once(0~1)
        - 개별 데이터는 `최대`한 번만 처리된다(0, 1회)
    - At least once(1~N)
        - 개별 데이터는 `최소`한 번은 처리된다(1회 이상)
        - 데이터 원본 저장소가 특정 시점의 데이터를 다시 제공해줄 수 있어야 한다.
        - 많은 스트리밍 프레임워크들이 기본적으로 보증
    - Exactly once(1)
        - 개별 데이터는 딱 한 번만 처리된다.
        - 오류 발생을 포함한 모든 경우에 대한 데이터 처리 보증
- [Data Guarantees and Fault Tolerance in Streaming Systems](https://www.slideshare.net/Hadoop_Summit/data-guarantees-and-fault-tolerance-in-streaming-systems)

### 아키텍쳐
#### [Lambda Architecture](http://lambda-architecture.net/)

![[assets/posts/20181130/2.png]]

- Batch Layer
    - Master Dataset을 관리하고
    - Batch view를 미리 생성하는 역할
    - 데이터 정확도는 Batch Layer에서 담당
- Serving Layer
    - Batch view를 Indexing하고 빠른 속도로 응답하는 역할
    - low-latency, ad-hoc way
- Speed Layer
    - 실시간 데이터 처리 역할

#### [Kappa Architecture](https://www.oreilly.com/ideas/questioning-the-lambda-architecture)

![[assets/posts/20181130/3.png]]

- 스트리밍 처리 및 재처리 모두 스트리밍 처리 시스템에서 수행
    - Kafka에는 재처리에 필요한 모든 데이터를 보관
    - 스트리밍 처리 시스템이 충분히 빨라서 실시간 데이터가 아닌 보존 데이터들도 처리하는 데 문제가 없음.

- Kafka Cluster
- Stream Processing System
- Serving DB


### 스트리밍 데이터에서 최대한 처리 결과를 빨리 얻으려면..?
#### Low Latency의 중요성.
- `Low Latency` : 스트리밍 처리과 Batch 처리와 가장 큰 차이점.
- 스트리밍 처리의 목표
    - 결과를 최대한 빠르게 제공하는 것
- Low Latency(1초 이하)가 필요한 use case
    - 모바일 어플리케이션 광고, 이상거래 탐지, 택시 예약
- Record 단위의 처리가 보편화
    - 오류 발생 시 재처리도 record 단위를 지원

#### 그럼 무조건 Low Latency가 좋을까?
- Trade-off
    - `처리량(Throughput)` vs `Latency`
- `데이터 바로 전송` vs `Batch 전송`
    - Throughput은 Batch가 좋지만..
    - Low Latency를 포기해야 하는 문제.


### 스트리밍 데이터에서 집계(Aggregation)은 할 수 없을까?
- Aggregation은 데이터를 그룹화할 수 있어야 가능
    - 레코드 단위로 적용할 수 없음
#### Micro batch
- 스트리밍 데이터를 처리 시점의 시간 혹은 데이터 수 단위로 그룹화
    - Low Latency에 별로 좋지 않다.
    - batch 크기에 따라 Latency에 영향이 발생.

### 집계(Aggregation)를 계속 누적시켜서 볼 수는 없을까?

![[assets/posts/20181130/4.png]]

- 상태를 보존(Stateful)하는 처리
    - 집계 결과값을 상태(state) 값으로 저장, 매 처리 시에 읽어서 누적 처리
    - 상태값은 일반적으로 빠른 로컬 저장소(in-memory)에 저장하여 계산에 활용
    - 복원을 위해 안정적인 저장소에 2차로 저장


### 굳이.. Mircro batch일 필요가 있을까?
- 배치 단위로 집계하지 않는다면?
    - 연산 자체는 배치일 필요가 없음.
    - 상태값은 여전히 `주기적으로 저장`되어야 한다.
        - 안정적인 저장소 스트리밍 처리 시스템 외부, 로컬/인메모리 X
- 분산 시스템의 이론
    - Distributed Snapshots([Chandy-Lamport Algorithm](https://en.wikipedia.org/wiki/Chandy-Lamport_algorithm))


### 전체 누적말고.. 시간대별 누적을 볼 수 있을까?

![[assets/posts/20181130/5.png]]

- Windowing : 데이터를 시간 기준으로 논리적으로 그룹화
    - Fixed
    - Sliding
    - Session

### 이벤트가 순서가 맞지 않게 들어오지 않는 경우는?
- Event Time Processing
- 이벤트 타임을 쓰더라도 데이터 유입 순서는 여전히 바뀔 수 있다.
    - 늦게 유입된 데이터도 처리하고 싶다
- 그렇다고 무작정 기다릴 수는 없다.
    - 윈도우가 끝나지 않는다
    - 상태(state)의 크기도 관리해야 한다.

### 얼마나 늦은 데이터까지 허용할 것인가?
- [WaterMark](http://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#handling-late-data-and-watermarking)를 사용하자.
    - 데이터의 Event Time을 이용해서 유효한지 확인하고 불필요한 경우 Drop

### 스트리밍 데이터도 다른 데이터랑 조합해서 처리할 수 있을까?
- Streaming - JOIN이 가능하다.
- Streaming - Static
    - 처리 흐름은 스트리밍 처리에 맞추게 된다.
- Streaming - Streaming
    - Record 단위 비교 join은 불가능
    - 상태(State)에 의존

### SQL이 더 친숙한대 스트리밍 처리 하려면 꼭 코딩해야 하는걸까?
- 많은 스트리밍 처리 프레임워크들이 지원
- SQL semantic 내의 기능만 지원하므로 flexibility는 부족함

### 더 공부하고 싶다면..?
- Queryable State
- Custom window
- Side input / side output


## 넷플릭스의 플랫폼 엔지니어링 - 정윤진님

![[assets/posts/20181130/6.png]]

- Netflix
    - 기능이 실제 Real까지 배포나가는 과정을 빠르게 하는 목표.
        - Faster Update
        - 분리된 확장성
        - 장애 확산 방지.

### Monolith Architecture의 한계점
- D Module이 바뀌게 되면 A, B, C 테스트가 필요합니다.
- D Module이 작은 변화를 가져와도 rebuild해야하는 단점.
- A 모듈이 실패할 경우 전체 App에 영향을 받는다.

### Mircoservice의 장점은?
- Faster Updates
    - 각각의 팀별로 Release를 진행하고 빠르게 Feedback을 받습니다.
- Independent Scalability
    - Module 단위로 확장(Scale Out / Scale In)
- Prevent Failure Cascading
    - Fault isolations
- Performance UX
    - Monolith보다 빠른 반응성.

### 넷플릭스 문화
> You Build It, You Run It, You Support It.

![[assets/posts/20181130/7.png]]

- [Full Cycle Developers](https://medium.com/netflix-techblog/full-cycle-developers-at-netflix-a08c31f83249)
    - Cloud Based System인 경우 해당 Concept이랑 잘 맞는다.
    - 하지만 개발자의 업무가 늘어나는 게 단점입니다.

### 넷플릭스 Opensource
- [Netflix Externalize Configuration – Archaius](https://medium.com/netflix-techblog/announcing-archaius-dynamic-properties-in-the-cloud-bc8c51faf675)
- [Netflix Service Discovery - Eureka](https://medium.com/netflix-techblog/netflix-shares-cloud-load-balancing-and-failover-tool-eureka-c10647ef95e5)
- [Netflix Circuit Breaker - Hystrix](https://medium.com/netflix-techblog/introducing-hystrix-for-resilience-engineering-13531c1ab362)
- [Netflix API Gateway – Zuul](https://medium.com/netflix-techblog/announcing-zuul-edge-service-in-the-cloud-ab3af5be08ee)
- [Netflix Load Balancing with IPC – Ribbon](https://medium.com/netflix-techblog/announcing-ribbon-tying-the-netflix-mid-tier-services-together-a89346910a62)
- [Netflix Realtime Monitoring – Atlas / Servo / Spectator](https://www.slideshare.net/brendangregg/how-netflix-tunes-ec2-instances-for-performance)
- [Netflix CI/CD – Spinnaker](https://medium.com/netflix-techblog/global-continuous-delivery-with-spinnaker-2a6896c23ba7)
- [Netflix Zero Downtime Delivery – Kayenta](https://medium.com/netflix-techblog/automated-canary-analysis-at-netflix-with-kayenta-3260bc7acc69)
- [Netflix Fault Injection Test – FIT And Automate it](https://medium.com/netflix-techblog/fit-failure-injection-testing-35d8e2a9bb2)
- [Netflix Chaos Engineering – Simain Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

## 대용량 서비스 설계 방법 - 강대명님
### SPOF(Single Point Of Failure) 제거
- API Server 이중화
- Database 이중화
- 물리 서버 이중화

### Object Storage
- NAS나 서버 한대에서 자체관리할 경우 Content가 어디있는지 어떻게 찾아야 할까?
    - 디스크 등의 증설 시기를 맞추기 어려움
    - 데이터 유실 확률이 높다.
    - Object Store 형태로 갈려면, 구현하기가 어려움.
- Data를 잃어버리지 않을 확률은?
    - 2 Replication : 99.99%
    - 3 Replication : 99.999%
- Object Storage의 역할
    - 이미지 등의 파일을 저장함.
    - 내부적으로 복제본이 생겨 유실의 가능성이 적음.
    - Storage의 Sizing, 장애등에 대한 고민이 적어짐

### 데이터샤딩
- [샤딩이란?](https://nesoy.github.io/articles/2018-05/Database-Shard)

![[assets/posts/20181130/8.png]]

- 모듈러는 2^N 으로 증가하는게 좋습니다.
- 2^N으로 증가하면 이동하는 서버가 고정됩니다.
    - 항상 2^N으로 증가하게 되면 비용 문제가 발생.
- 확장에 데이터가 적게 움직이는 방법을 연구해야 합니다.
    - 비용, 시간 더 많은 요소들을 같이 고려해야 할 것.
    - 적절한 Trade-off를 하자.

### 코디네이터
- 추가되고 삭제되는 서버 목록을 어떻게 관리할 것인가?
    - 서버의 추가 삭제시, 이를 이용하는 서비스에 알려준다.

![[assets/posts/20181130/9.png]]

- [Zookeeper](https://zookeeper.apache.org/)
- Etcd
- consul

### Circuit Breaker
> 차라리 빨리 실패하고, 미리 정의된 값을 내려주자.

- 서비스가 다수의 많은 외부서비스의 API를 사용하게 되는 경우가 있습니다.
- 장애를 대비하여 Timeout을 설정하게 되지만
    - 해당 스레드/프로세스가 Timeout 동안 다른 작업을 못하게 되고
    - 전체적인 서비스가 계속 느려지게 되는 문제가 발생합니다.
- Timeout이 3초면..?
    - 해당 스레드는 중요하지 않은 API를 기다린다고 3초를 사용하게되고,
    - 요청이 쌓이면 해당 서비스도 응답이 느려지기 시작함.

### 블루/그린 배포, 카나리 배포
#### 기존의 배포가 힘든 이유
- 버그의 존재
    - 문제가 발생했을 때, 해당 범위가 클수있다.
- 배포에 시간이 너무 많이 걸린다.
    - 하나씩 배포를 진행하게 된다면..
    - 롤백도 그만큼 오랜 시간이 필요합니다.
- Cloud 환경이면 쉽게 가능하지만..?
    - IDC인 경우 물리 서버를 따로 구축해야하는 단점이 있습니다.
    - IDC는 비용문제가 발생..

### Feature Flag(Switch)
- 특정 기능에 문제가 생겼을때,해당 기능을 꺼버리면 된다.
    - 롤백 배포도 필요 없는 장점.
    - 별도의 시스템 구축이 필요한 단점이 있습니다.
- 다만 특정 기능이 동작하지 않는다면?
    - API를 사용하는 쪽에서 어떻게 할지 커뮤니케이션이 필요합니다.


## Reference
- <https://kosscon.kr/program>

