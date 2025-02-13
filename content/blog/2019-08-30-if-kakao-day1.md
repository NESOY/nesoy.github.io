---
title: if kakao day 1 후기
tags:
  - Review
date: 2019-08-30
aliases: 
  - ../articles/2019-08/if-kakao-day1
---
![[Assets/posts/img/2019-08-30-23-18-27.png]]

## 오픈소스 데이터베이스, 흐르는 은행 데이터에 빨대를 꽂아보다.
> 성동찬님 - 카카오 뱅크

- 카카오뱅크는?
    - 금융 탈을 쓴 소셜 서비스
    - 폭발적으로 늘어나는 데이터

### 데이터를 분산 재배치를 해보자
- SQL로 데이터 퍼가기
- [CDC](https://en.wikipedia.org/wiki/Change_data_capture) 변경분 퍼가기
- ~~손 타이핑 노가다해서 퍼가기~~

#### SQL로 데이터 퍼가기
- 장점
    - SQL로 데이터를 자유롭게 제어
    - 로직에 포함되며, 상대적으로 구조가 간결
- 단점
    - 소스DB에 부하(Select / Index)
    - 지연된 커밋에 따라 데이터 누락 발생 가능

### What is Uldra?
- Source DB -> Target DB 사이에 존재하여 Sharding 지원가능한 소프트웨어
- Java로 작성
- `Uldraman`은 어떻게 구성되어 있을까?
    - BinaryLog Parser로 변경분을 파악해서
    - Task Worker를 통해 원하는 DB에 저장하는 방식
- Goals
    - 쉽고 정확하고 빨라야 한다.

#### [What is BinaryLog in MySQL](https://dev.mysql.com/doc/internals/en/binary-log-overview.html)?
- [바이너리 로그 - MySQL Korea](http://www.mysqlkorea.com/sub.html?mcode=manual&scode=01_1&m_no=22368&cat1=752&cat2=799&cat3=927&lang=k)

- DB 상에서 업데이트가 되는 모든 쿼리를 저장하는 로그
    - 트랜잭션 커밋 시 기록
    - 데이터 변경 순서를 보장
    - 신뢰할 수 있는 확정된 변경 이력
    - [굉장히 많은 이벤트들이 있다.](https://dev.mysql.com/doc/internals/en/binlog-event.html)

- Uldraman은 Row Event 단위로 파싱
    - Query Event Start
        - Table Map Event
            - 변경을 가한 테이블 정보
            - 데이터베이스 / 테이블 / 테이블 컬럼 타입
        - Row Event (Write, Delete, Update)
            - `Write` - 추가 데이터
            - `Update` - 변경 이전 / 이후 데이터
            - `Delete` - 삭제 이전 데이터
    - Query Event End

#### Uldraman 이전 모습은?
- [Kakao ADT](https://github.com/kakao/adt/blob/master/README_ko.md)는 주로 배치 프로세스에 초점
    - 타겟쪽에 구조 변경으로 인해 장애가 발생하더라도
    - 실제로 서비스에는 노출하지 않는다.

#### 하지만 Uldraman은?
- 실제로 서비스하는 온라인 서비스에 포커싱을 맞춘 프로젝트
- 특급 서비스

#### Uldraman을 사용하기 위해서는?
- Binary Log format은?
    - `Row Format`으로 기록되는 바이너리 로그여야만 한다.
- Binary Log Full Image
    - 바이너리 로그에 변경 전 / 후 이미지가 모두 포함되어야 한다.

#### Kakao ADT & Uldraman의 공통 목표
- 복제가 시스템이 이상이 생기는 경우?
    - 실패한 지점부터 다시 시작을 해야하는데..
    - 이를 어떻게 해결할까?
    - Overwrite
        - 덮어쓰다보면 언젠간 맞춰진다.
        - 누락된건 없는지..
        - 성공했던 포지션부터 다시 복사하자!
        - Update Row Event인 경우 항상 Delete가 발생하는 것은 아니다.
            - 샤드키 혹은 PK 변경 (샤드키는 국적, PK는 집주소)
            - YES
                - Delete
            - No
                - Replace
    - Sequential
        - 데이터를 그룹핑하고
        - 동일한 그룹에 있는 데이터는 순차적으로 처리하자.
    - 병렬 처리
        - 연관없는 데이터를 병렬로 처리하면 빠르지 않을까?
        - 1차 샤딩 룰
            - [CRC32](https://en.wikipedia.org/wiki/Cyclic_redundancy_check)
        - 2차 샤딩 룰
            - 몇번째 Thread에서 진행할지 결정

#### Uldraman의 가진 Feature
- Recover Mode
    - 데이터 버젼 체크를 해보자.
    - 언젠가는 데이터가 최신은 되지만.. 정합성을 요구하는 상황이라면?
        - 이를 해결하기 위해 데이터 내용에 버젼을 넣고
        - 데이터 버젼이 낮거나 같으면 Overwrite하는 모습
        - 매번 발생하는 상황은 아님

- Generate Sharding Key
    - 샤딩키를 만들거나 변형해서, 그 기준으로 데이터를 분산하자.

- Performance는?
    - `스케일 아웃`인 경우
        - 1 Node -> Uldraman -> 8 Shard
        - 30,000 rows/sec
    - `스케일인`인 경우
        - 4 Shard -> Uldraman -> 1 Node
        - 1 Node의 내장 DB는 [tokudb](https://en.wikipedia.org/wiki/TokuDB) 사용하는 상황
            - 높은 압축율 -> I/O 비용 감소
        - `Shard DB` : innodb -> `1 Node` : tokudb로 진행한 경우
            - 속도가 밀리지 않음

- Alerting & Monitoring
    - Percona
        - <https://github.com/percona-lab/pmm-ruled>

#### 다음 목표는?
- 원본 데이터는 MySQL에 저장하지만?
    - Sharding은 다양한 Database에 저장할 수 있도록 데이터를 변환하는 것을 지원하자
        - Redis
        - Oracle
        - MySQL
        - PostgreSQL

#### Reference
- [OLTP](https://ko.wikipedia.org/wiki/%EC%98%A8%EB%9D%BC%EC%9D%B8_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98_%EC%B2%98%EB%A6%AC) 서비스 용도
- <https://tech.kakao.com/2016/06/27/opensource-5-adt/>
- [MariaDB Binlog을 이용한 변경사항 추적 - RidiCorp](https://www.ridicorp.com/blog/2017/10/30/binlog-collector/)

## 초당옥수수의 취소를 막아라! : 수만 건의 주문을 1초내에 처리하는 기술
> 고희경님, 마태일님  - 카카오 커머스

#### 초당 옥수수의 비밀
- 초당 옥수수는 엄청 달달한 옥수수를 말합니다 :)
- 프로세스는?
    - 구매자 -> 주문 -> 판매자 확인 -> 물건 준비 -> 배송
    - 소비자가 선주문 -> 옥수수를 재배 후 발송
    - 배송지연이 되는 경우는?
        - 판매자가 배송 지연 공지

#### 우리의 목표는?
> 해당 공지를 빠르게 소비자에게 전달해야 하는 것이 목표.

### Legacy 시스템의 문제는 무엇일까?
#### 배송지연 안내는 어떻게 전송할까?
- TMS(카카오톡 Message Service)통해 배치 수행
- 실시간이 아니라 배치 처리
- 배치 주기를 줄이면 빠르게 전달이 가능하지만?
    - 근본적인 문제 해결이 아니라고 생각

#### 복잡한 비즈니스 로직
- 너무 복잡해서 실시간으로 하기 어려움
- 코드가 스파게티 코드처럼 구성

#### 느린 처리 속도
- 하나의 요청에 - 하나의 스레드
- 단일 스레드에서 반복되는 Task 수행하는 점.
- 요청 받은 대량의 주문 리스트 대상

### 그래서 우리의 어떻게 해결했을까?
- 실시간 TMS 발송을 위한 Worker 구성하자
    - 다양한 외부 API
    - 비동기 워커를 구성하여 처리해보자.
    - 기존의 배치를 비동기 방식으로 처리하니 실시간으로 가능해졌다.
- 복잡한 비즈니스 로직은?
    - 코드 리팩토링을 통해 복잡도를 낮췄다.
    - 공통적인 Validation 체크는 ValidatorUtil로 진행
- 처리속도 개선은?
    - 불필요한 / 중복하는 로직을 모으고
    - Validation 단일화
    - 비즈니스 처리 - 비동기 워커를 통해
    - TMS 발송 - 비동기 워커를 통해

### Actor가 된 비동기 워커
- 분산처리
    - 단 하나의 Queue를 통해 소비
    - Consumer만 늘리면 성능이 올라갈까?
        - Atomic한 단위로 Event를 만들어서 병렬로 실행할 수 있게 만들자.
    - Spring SimpleRabbitListenerContainerFactory을 감싼 Custom 리스너 제작
        - 최소 Concurrent : 5
        - 최대 ConCurrent : 20
        - 각각의 Consumer 마다 다르게 설정
    - 자동 재처리 및 실패 감지
        - Rabbit MQ의 Queue와 Message header를 통해 구성
        - Queue - Queue.retriable 로 구성
            - 소비자가 재수행하였지만 실패해서 nack를 반환한다면?
                - x-death.cnt++
                - x-dead-letter-*
                - x-message-ttl를 설정하고
                - 다시 Queue에 재진입하여 수행한다.
                - <https://www.rabbitmq.com/dlx.html>
        - 하지만 게속해서 실패하면?
            - 최대 Count가 넘어간다면?
            - DB에 저장하고 / Noti받고
            - 어드민이나 배치 실행해서 문제를 해결
    - 구현은 어떻게 했을까?
        - Method Interceptor를 통해 감지하고
        - 상태에 따라 성공 / 재처리 / 실패를 수행하여 신뢰성을 높혔다.

#### 더 하고 싶은 것?
- [Actor Model](https://hamait.tistory.com/215)
    - 액터 메시지를 Tracing하고 싶다.
        - tracing ID를 추가하여 집계하고 싶다.

### 배포없이 빠르게 롤백하는 전략
- 배포없이 어떻게 하면 빠르게 롤백할 수 있을까?
    - SwitchManager를 통해 on/off로 조절가능
    - 해당 설정은 Zookeeper로 관리
    - LocalCache로 저장하고 Zookeeper Watcher를 통해 갱신

## Practical Microservices in gRPC Go feat. GraphQL, Kafka(서포터즈 기사 개발기)
> 강태훈님, 김민영님, 문주성님, 양진선님, 이하건님 - 카카오 모빌리티

### 서포터즈 기사 서비스 - 요구 사항
- 기계학습에 기반한 더욱 지능적인 배정의 대상이 되어야 한다.
- 자동 배정되어야 한다.
- 건당 지급에서 - 시간제로 변경된다. 등등 다양한 요구사항이 존재

### 개발파트 상황은 어떤상황이였을까?
- 외부 영입으로 들어온 새로운 인재
- 파트 주요 기술 스택은?
    - Rails
    - Vert.x
    - Java
    - Groovy
    - JRuby
- 여러가지 운영 대응
- 학습 비용 증가
    - 급격히 복잡해지는 시스템에 대한 이해

#### 개발 복잡도의 상관 관계
- [Complex Product Design](https://pdfs.semanticscholar.org/1b1e/e4e8844100d2cec855c440ee8cd70c82ed3d.pdf)

![[Assets/posts/img/2019-08-29-17-51-06.png]]

- 제품 개발 복잡도의 세가지 요소
    - 요구사항
    - 사람
    - 기술

### 그래서 우리는 생각의 정리부터 하기로
- 새로운 것을 개발하기 앞서 생각을 정리하고
- 문서에 작성하고 공유하자.
- [RFC](https://ko.wikipedia.org/wiki/RFC)과 비슷한 형태로 작성해보자.
    - 작성자 목록
    - 승인자 목록
    - 요약
    - 배경
    - 구조
    - 고려했던 대안
    - 구현
    - 서비스 SLA
    - 서비스 의존성
    - 부하 및 성능 테스트
    - 보안 고려 사항
    - 테스트 및 출시 계획
    - 지표 관련 내용 등등

### 프로그래밍 언어
#### Java의 장단점은 무엇이 있을까?
- 장점
    - 익숙하다.
    - Spring Framework가 잘 해준다.
    - 개발자 구인이 쉽다.
    - OS에 독립적인 언어이다.
- 단점
    - Spring Framework 내부를 들여다보기 어렵다.
    - 개발자의 편차가 크다.
    - JVM 튜닝을 해야하는 이슈가 있다.
    - OS 독립적인게 과연 좋은것인가?

#### 파트원 프로그래밍 언어 선호도
- Java 극혐하는 사람들 / Java 익숙한 사람들
- 중재안을 찾다보니..
    - Go Lang으로 결정
- 언어별 HTTP 서버 성능
    - Go가 Java보다 2배정도 빠른 것을 확인
-  `25 / 56`
    - go 언어의 keyword 숫자 / Java 언어의 keyword 숫자
    - 그만큼 go 언어는 단순함.

#### Go
- 배우기 쉽다
- 자유도 낮은 Coding Style
- 적은 메모리 사용
- JVM같은 무거운 VM이 없음
- Compile언어 경량의 정적 Compile 결과물
- No magic 모두 들여다 볼 수 있음
- 500배 경량의 Thread와 Queue = Gorutine과 Channel 실수의 여지가 적고 고성능
- 직관적인 오류 조작. 예외 던지기 없음

#### 의존성 주입은 어떻게 해결할까?
- 스프링 프레임워크 가장 큰 장점 의존성 주입
    - 의존 관계 설정이 실행시에 이루어지므로 모듈간의 결합도 낮춤
- [Go - FX](https://github.com/uber-go/fx)
    - 단점
        - 어노테이션이 없다.

### 서비스 구조 상황은?
- 사용자 기사, 운영 관련등등 엄청 복잡
- Line수도 269878
- 테스트 커버리지도 35%정도..

#### 왜 MSA?
- 고립된 기능
- 고립된 데이터 / 상태
- 병렬적으로 간섭없이 개발하고 싶고, 독립적으로 배포하고 싶다.
- 서비스별로 확장을 유연하게 하고 싶다.
- 자주 작은 배포를 하고 싶다.
- 전사 차원의 DKOS라는 Cloud 지원 이를 잘 활용하려면 MSA가 적절
- 제품의 각 부분이 단순화 되어 의사소통이 원활
- 넷플릭스, 트위터, 우버같은 회사에서 미리 검증
- 단점은 없을까?
    - 기존 하나의 API호출이 MicroService에서는 다수로 늘어날 수 있음
        - API Gateway
    - 네트워크 통신 비용
        - DC내부 비용, 병렬 처리를 염두에 두고 개발
    - 서비스 발견이 복잡함
        - DNS를 사용하는데 etcd, consil등으로 효율적 개선 필요
    - 공통 기능을 대한 중복 발생
        - 중복된 라이브러리 화
    - 테스팅 및 운영 복잡
        - Testing strategies in a Microservice

### 서포터즈 서비스 구조
- graphql gateway
- routing service gRPC go
- 서비스 계층
    - RESTful vs gRPC
        - gRPC가 월등하게 빠르고 가볍다.
    - Stubby의 오픈 소스 구현체 - gRPC
        - 구글에서 1주일에 20억개의 컨테이너가 실행
        - 1초에 100억건의 RPC를 처리
    - gRPC는 어떻게 테스트할까?
        - <https://github.com/fullstorydev/grpcui>
        - Postman과 유사하나 gRPC 테스트 용
    - 항상 RPC만 노출해야할까?
        - REST 변환해주는 오픈소스가 있음.
        - <https://github.com/grpc-ecosystem/grpc-gateway>
    - IDL Registry
        - gRPC Proto 파일들을 중앙화해서 관리

#### 테스트는 어떻게?
- [ghz](https://github.com/bojand/ghz) - gRPC Load Test
- [nGrinder](https://naver.github.io/ngrinder/) - HTTP Load Test
- 통합 테스트
    - [Docker Compose](https://docs.docker.com/compose/)로 묶어서 진행
    - Postman을 통하여 통합 테스트 실행

#### 남은 도전들?
- 협업에 대한 문제를
- Api Gateway - 인증, 로깅

### kafka
- kafka가 없다면?
    - 모든 서비스를 호출해서 진행해야 한다.
    - 데이터도 [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load)을 통해 동기화
- kafka를 사용하면?
    - 비동기적으로 진행가능
- 사용으로 얻은 이점
    - 서비스 간 메시지 흐름 단순화
    - 메시지의 영속성을 보장, 유실 방지
    - 패킷 오버헤드 감소
    - 자유로운 메시지 처리
    - 하나의 이벤트 메시지를 동시에 여러 서비스에서 소비
    - 메시지 버저닝

### API Gateway
- API 버져닝은 어떻게 할까?
    - GraphQL
        - No Versioning
- GraphQL 구현체
    - Node가 엄청난 Library 지원
    - Go
    - Java
- Middleware
    - 원하는 인증 관련 내용은 Middleware에 추가해서 진행
    - 인증 / 검증 추가 가능
- gRPC Interceptor로 추가 가능
    - Zipkin Tracer
    - New Relic

- Monitoring
    - 수정 사항으로 인해 서비스 전체의 지연 발생
    - 출시일이 개발 완료 이전에 확정된 상황
        - 빠른 적용이 관건인 상황
    - [Prometheus](https://prometheus.io/)
        - Pull 방식의 메트릭 수집
        - 모든 데이터를 수집하는 것이 아닌 일정 주기로 발생하는 메트릭 수집
        - 도커 기반의 어플리케이션을 보는데 좋음
    - [Grafana](https://grafana.com)
        - 고유의 Query Language가 존재
    - 장애의 원인
        - 작은 서비스의 사소한 실수가 전체 제품에 영향
        - 분산 로그 추적 시스템이 필요
            - [Zipkin](https://zipkin.io/)

- Legacies
    - 너무나 잘 동작하고 있는 레거시의 변화를 최소화하고 싶다.
    - feature flag
        - [traffic throttling](https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/api-gateway-request-throttling.html) 기능을 추가
        - 설정 서버
    - nginx 설정
    - kubernates


## Airflow를 활용하여 아름다운 데이터 파이프라인 구성하기 - R2
> 최주원님 - 카카오페이지

### 카카오페이지의 데이터 분석 문제
#### 카카오 페이지의 성장
- 2014년보다 100배
- 2015년보다 10배
- 지속적인 성장을 위해 노력

#### 카카오 페이지 & 다음 웹툰는 MSA로 구성
- MSA으로 인해 DB도 분화
    - 그럼 데이터 분석은?
    - 데이터 분석가 입장에서는 DB가 너무 많아요 ㅠㅠ
    - 서로 다른 DB간에 JOIN이 필요한 경우에는?
- Data Lake (Data warehouse)
    - 분산 파일 시스템에 의존
        - HDFS or S3
        - 싸고 안정성이 뛰어나다.
        - 분산형 쿼리 / 분석 엔진
            - Hive
            - Spark
            - Impala
            - Presto
    - 몽땅 다 밀어넣어 보자
        - MySQL DB로 복제
        - 변환 과정이 필요하다 / 데이터 분석가 입장
            - 원본데이터에서 데이터 입장으로 변환
                - 열람 / 구매
                - 광고 / 이벤트
                - 회원 등급
                - 작품별 지표
        - 분석가입장에서는 변환된 데이터만 바라보면된다.
        - 이 모든 프로세스는 Airflow로 진행

### Workflow management System
- Workflow Platform - AirFlow
    - Airbnb에서 개발
- Apache
    - 2018년 말, `incubating -> Top->Level`
- [엄청 많은 Workflow 프로젝트](https://github.com/common-workflow-language/common-workflow-language/wiki/Existing-Workflow-systems)
    - 다양한 Workflow 시스템

### Workflow란?
- 작업
    - 수집 작업
    - 정제 작업
    - 지표 생성 작업
    - 리포팅 작업
- 작업 간 의존성
- 이 전체를의 플로우를 워크플로우
- DAG(Directed Acycli Graph)

#### Workflow Platform에서는?
- DAG 작업 의존 관계에 따라 순차 실행
- 모든 작업은 ASAP으로 종료
- 중간에 작업이 실패하면?
    - 연관성 없는 작업은 계속 실행
    - 실패한 작업을 재실행
    - 성공하면 후속작업 이어서 실행

### Oozie vs Airflow
- First Commit
    - Oozie가 더 빠름
- Number of Commits
    - Airflow가 3배정도 차이
- Contributors
    - Airflow가 더 많은 인원
- Release 횟수
    - Airflow가 더 많다.
- DAG 표현 방식
    - Oozie - XML
    - Airflow - Python
- GUI
    - Airflow가 더 많은 지원
- 가용성
    - Oozie가 더 좋다.
    - Airflow는 SPOF 존재

### Airflow Architecture
- Scheduler
    - 실행 주기가 되면 작업을 생성
    - 의존하는 작업이 모두 성공하면 Broker에 넘김
- Worker
    - 실제 작업을 실행하는 주체
- Broker
    - 실행가능한 작업들이 들어가는 공간
- Meta DB
    - DAG, Task등이 정의 되어있음
    - DAG RUN, Task RUN들이 존재

#### Airflow - SPOF
- Scheduler
- Broker
- MetaDB

#### Airflow - HA
- HA Broker
- Master - Slave 형태로 구성
- 스켸줄러를 2개로 구성하면?
    - 동일한 DAG가 발생할 수 있는 이슈
    - FailOver - Controller
        - 공식적으로 지원하지는 않는다.

### 카카오 페이지의 Airflow 활용
- DAG : 100여개
- Task : 5000여개
- 하루에 돌아가는 Task 개수
    - 15000여개
- 상당 수가 Spark Application
    - Spark 기동을 위한 메모리가 꽤 필요함
    - 다수의 Worker를 물리 장비 , VM 장비도 사용
- 문제는 DB안에 테이블 개수가 많다.
    - DB안에 테이블이 350개, 160개
    - 모든 테이블을 순서대로 내려받자니 350개 테이블을 분당 1개씩 처리해도
    - 약 6시간?
    - 동시에 내려받자니 부하 걱정

### 그래서 이를 해결하기 위한 방법으로 -> Pool and priority weight
#### Pool
- 동시성의 한계치를 제어
- 지정된 Slot 개수 만큼 동시에 실행
#### Priority weight
- Task 단위로 Integer value로 지정
- 의존하는 테스크가 많으면 자동으로 증가

#### Pool 관리
- 작은 테이블, 큰 테이블로 분리해서 관리

#### 많은 테이블을 적절한 부하를 유지하면서 병렬적으로 가져오기 위해서는?
- Pool, Priority weight를 적절히 사용하자

#### Airflow Impala, Spark 호출
- Worker는 호출하는 껍데기 역할
- 실제 부하는 하둡 클러스터에서 발생
- Worker 역할 분리
    - `Queue를` 분리하여 진행
    - Spark용 , R용
    - 어떻게 분리하지?
        - Celery 활용시에는 airflow.cfg 수정
        - Worker 실행시에 -q 옵션과 같이 실행
        - Task 생성시 Queue 파라미터 지정
- 부하 때문에 꼭 분리해야돼?
    - 대표적으로 보안 문제가 있음
    - 외부 데이터에서 가져올때 (s3와 같은 부분)
    - 계정 분리

- 이토록 거대한 DAG 의존 관계는 어떻게 해결해야 할까?
    - [External Task Sensor](https://airflow.readthedocs.io/en/stable/_modules/airflow/sensors/external_task_sensor.html)
    - 특정 조건이 채워지기를 기다리는 Operator
        - Poke_interval : 체크 주기
        - Timeout
        - 원하는 상태에 도달하면 종료
        - execution_delta
        - execution_fn
    - DAG를 연결해서 추가 Flow 진행
        - 높은 복잡도의 DAG를 없애는 장점



## 카카오 애플리케이션 모니터링 NEO - R5
> 김은수님 - 카카오

### Neo란?
- Neo는 카카오의 성능 모니터링 서비스

### 서비스와 애플리케이션
- NEO의 사용자는 어떤 관점으로 성능을 볼 것인가?
    - 서비스 1: N 어플리케이션
    - 어플리케이션 1 : N 인스턴스
    - 애플리케이션 성능이 다를 수 있다.
    - 애플리케이션 속도 - 서비스 속도

### Neo Usage
- 트러블 슈팅
- 인스턴스 별 워킹 쓰레드 카운트
- 트랜잭션 윈도우
- Method
- Map. ComputeIfAbsent
    - Mutex 사용
    - 짧고 간단한 내용

#### Neo는 어떻게 데이터를 수집할까?
- [JMX](https://ko.wikipedia.org/wiki/JMX)를 통해 수집
- NeoAgent를 추가
- Default 트랜잭션
    - HttpServlet.service()
    - 서블릿 기반의 요청이 아니면?
        - 사용자에게 트랜잭션 정의를 맞기자.

### APM 데이터의 특징
- 데이터가 너무 많다.
    - 데이터 하나의 사이즈를 최소화 하자
        - Protocol-buffers를 사용
        - 컴팩트한 메세지의 사이즈
        - 하위 버전 데이터 호환
        - <https://developers.google.com/protocol-buffers/docs/encoding>
- 적당히 데이터를 잘 버리자
    - Metrics 데이터 수치형
    - 수치형 데이터
        - 예측 가능
    - 로그형 데이터
        - 인스턴스 수의 비례
        - 예측 불가능
        - 트랜잭션 데이터는 더 예측하기 어렵다.
        - 그래서 Agent에서 모든 데이터 대신 Sampling하자
            - 트랜잭션이 높은 데이터는 모두 Sampling
            - 낮은 트랜잭션은 적은 비율로 Sampling
        - 시간 단위로 Sampling 수를 모집
            - 작은 시간단위로 Sampling하다 보면
            - 큰 그림은 유지할 수 있다.
    - 잘 버리는 것이란?
        - 본래의 목적은 유지하면서 성능은 최대한 유지하자.
    - [Back Pressure](https://en.wikipedia.org/wiki/Reactive_Streams)
        - Reactive Programming
- 메인 스토리지는 카산드라에 저장

### 왜 카산드라인가?
- High Performance writing
    - 대부분은 Read가 많지만 APM에서는 다른 상황
    - Write >>>>>>>>>>>> READ
    - [insert-mostly workload](https://www.datastax.com/wp-content/themes/datastax-2014-08/files/NoSQL_Benchmarks_EndPoint.pdf)
        - cassandra > couchbase > hbase > mongodb
- Scalability
    - Linear Scalability
        - 2배 늘리면 > 2배 속도 증가
- Time Series Data Store
    - Partition Key - 어느 파티션으로 갈지
        - Application ID
    - Cluster Key - 어떤 순서로 저장할지
        - Time 기준으로
    - 특정 파티션이 많이 차오르면?
        - 그 파티션은 HotSpot!
        - 이를 해결하기 위해 Partition Key에 `Time Bucket` 추가
        - Example
            - Time Bucket값을 정해 Hash값 지정
        - Time Bucket 크기는 데이터의 특성과 사용자 경험에 의존적이다.
            - Time Bucket 크기가 커지면?
                - 쿼리의 용이성
            - Time Bucket 크기가 작아지면?
                - 노드의 균형성
        - 멀티 IDC
            - cassandra.yaml
            - cassandra-rackdc.properties

- 디스크 사용량 이슈가 발생했는데..
    - Community가 활성화되지 않는 단점 ㅠㅠ
    - 그래서 직접 Maliing List에 가입하여 커뮤니케이션 진행

## Day 1 후기
- <https://ryanpark.dev/2019/08/29/if-kakao-2019-후기/>
- <https://brunch.co.kr/@springboot/254>

