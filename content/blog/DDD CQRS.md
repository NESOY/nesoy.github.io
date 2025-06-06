---
aliases: [/articles/2018-07/DDD-CQRS]
comments: false
date: 2018-07-19
description: 
tags: [DDD]
title: DDD - CQRS
---
# DDD - CQRS
## 왜 등장하게 되었을까요?
![[assets/posts/20180719/1.png]]

- 조회 화면 특성상 조회 속도가 빠를 수록 좋은데 여러 Aggregate에서 데이터를 가져와야 할 경우 어떻게 가져올까?라는 고민을 하게 됩니다.
    - Aggregate간의 관계를 ID 사용해서 이용한다면 즉시 로딩(eager Loading) 방식과 같은 JPA의 쿼리 관련 최적화 기능을 사용할 수 없습니다.
    - Aggregate간의 관계를 참조 방식으로 한다해도 경우에 따라 지연 로딩(lazy Loading) 방식을 사용하기 위해선 Native Query를 사용해야 합니다.

### 도메인의 구조
- 상태를 변경할 때와 조회할 때 단일 도메인을 사용하기 때문에 문제가 발생합니다.
    - ORM(Object-relational mapping)은 도메인의 상태 변경을 구현하는 데 적합하지만,
    - 여러 Aggregate에서 데이터를 가져와 출력하는 기능을 구현하다보면 도메인 복잡도가 점점 높아지는 문제가 발생합니다.

> CQRS는 단일 모델을 사용할 때 발생하는 복잡도를 해결하기 위해 사용하는 방법입니다.

## CQRS란?
![[assets/posts/20180719/2.png]]

- 상태를 변경하는 기능과 상태 정보를 조회하는 기능을 분리하여 도메인을 구성하는 것입니다.

- 도메인 모델 관점에서 상태 변경 기능은 주로 한 Aggregate의 상태를 변경합니다.
    - 주문 취소 기능과 배송지 정보 변경 기능은 한 개의 Order Aggregate에서 진행합니다.
- 조회 기능은 하나의 Aggregate도 조회할 수 있지만, 두 개 이상의 Aggregate에서 데이터를 조회할 수 있습니다.
    - 단일 모델로 두 종류의 기능을 구현하면 모델이 불필요하게 복잡해집니다.

## 다양한 구조
### 단일 Database 구조
![[assets/posts/20180719/3.png]]
- Database를 공유하고 Model을 Command와 Query Model로 분리하여 적용하였습니다.
- 쉽고 단순하게 적용할 수 있지만, 같은 Database를 사용하기 때문에 성능에 대한 문제점은 해결하기 힘든 구조입니다.

### Ployglot 구조
![[assets/posts/20180719/4.png]]
- Command Database와 Query Database를 분리하고 Message Broker(RabbitMQ, Kafka)를 통해 Data 동기화를 처리 하는 방식입니다.
- 각각의 Model에 적합한 구조를 사용할 수 있는 장점이 있습니다. : Ployglot 구조(RDBMS, NoSql, Cache)
- 동기화 처리를 위한 Message Broker의 HA와 Message 전달의 신뢰도에 대해 보장되어야 하는 단점이 있습니다.

### Event Sourcing 구조
![[assets/posts/20180719/5.png]]
- Event Sourcing : Application내의 모든 Action을 이벤트로 전환해서 이벤트 스트림(Event Stream)을 별도의 Database에 저장하는 방식을 말합니다.

#### Example Event Store

 id	| root_id | event
---- | :--: | ----
 1 | 1 | 카트 생성함
 2 | 1 | 상품1 추가함
 3 | 1 | 상품2 추가함
 4 | 1 | 상품2 제거함
 5 | 1 | 배송정보 입력함

- 실행되는 데이터베이스 연산은 삽입(insert) 뿐입니다.
- 수량이 변경된 부분도, 삭제되는 부분도 이벤트이기 때문에 갱신(update)이나 삭제(delete) 연산은 수행되지 않습니다.
- [개체 관계형 임피던스 불일치](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch)

#### 장점.
- 트랜잭션 처리 중 경합이 없습니다.
- 모든 변경 내역이 이벤트로 기록되기 때문에 원하는 시점으로 Rollback이 가능하게 됩니다.
- 메시지 중심(Message-Driven) 아키텍처에 적합합니다.
- Event Monitoring이 필요한 경우에 적합합니다.

#### 단점.
- 상태 불일치가 발생할 수 있습니다.
- 업데이트 충돌 발생이 매우 적은 시스템에는 적합하지 않습니다.
- 데이터 뷰 일관성 및 실시간 업데이트가 필요한 시스템에는 적합하지 않습니다.

## 정리하며
### CQRS 장점
- 각각의 도메인 목적에 맞게 집중하여 개발할 수 있습니다.
- 명령과 쿼리 파이프라인을 원하는대로 최적화하면서 다른 요소가 깨질 위험은 거의 없다는 것

### CQRS 단점
- 구현해야 할 코드가 더 많다는 것.
- 더 많은 구현 기술이 필요하다는 것.
- 유지 비용 증가.

### 사용하지 않아야 할 경우
- 도메인 또는 비즈니스 규칙이 간단한 경우.
- 대규모의 고차원적인 어플리케이션이 아닌 경우.

## Reference
- <https://docs.microsoft.com/ko-kr/azure/architecture/patterns/cqrs>
- <https://www.popit.kr/cqrs-eventsourcing/>
- <https://msdn.microsoft.com/magazine/mt147237>
- <https://www.future-processing.pl/blog/cqrs-simple-architecture/>
- <https://docs.microsoft.com/ko-kr/azure/architecture/patterns/event-sourcing>
- <https://www.haruair.com/blog/4008>
