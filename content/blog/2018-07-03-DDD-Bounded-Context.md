---
title: DDD - Bounded Context
tags:
  - DDD
date: 2018-07-02
aliases: 
  - ../articles/2018-07/DDD-Bounded-Context
---

![[Assets/logo/ddd.png]]


# 도메인 모델과 Bounded Context

## 도메인 모델과 경계

### 도메인을 완벽하게 표현하는 단일 모델을 만드는 시도?
- 도메인은 다시 여러 하위 도메인으로 구분된다.
- 모든 하위 도메인에 맞지 않는 모델을 만들게 된다.

### 도메인의 이름과 존재
- 이름은 같지만 다른 역할
  - 카탈로그 도메인 : 상품(상품 이미지, 상품명, 가격)
  - 재고 관리 도메인 : 상품(실존하는 개별 객체를 추적 목적)
- 이름은 다르지만 같은 역할
  - 회원 도메인 : 회원
  - 주문 도메인 : 주문자
  - 배송 도메인 : 보내는 사람

- 같은 용어라도 의미가 다르고 같은 대상이라도 지칭하는 용어가 다를 수 있기 때문에 한 개의 모델로 모든 하위 도메인을 표현하려는 시도는 올바른 방법이 아니다.
- 하위 도메인마다 모델을 만들어야 한다.
- 각 모델은 명시적으로 구분되는 경계를 가져서 섞이지 않도록 해야 한다.
- 섞이기 시작하면 모델의 의미가 약해질 뿐만 아니라
- 하위 도메인 별로 다르게 발전하는 요구사항을 모델에 반영하기 어려워진다.

## Bounded Context
- 모델은 특정한 Context에서 완전한 의미를 갖는다.
- 이렇게 구분되는 경계를 갖는 Context를 DDD에서는 Bounded Context라고 부른다.
- Bounded Context는 모델의 경계를 결정하며 한 개의 Bounded Context는 논리적으로 한 개의 모델을 갖는다.
- 팀 조직 구조에 따라 결정되기도 한다.

![[Assets/posts/20180703/3.png]]

### 하나의 도메인 안에 2개의 Bounded Context

![[Assets/posts/20180703/1.png]]

### 두개의 도메인 안에 1개의 Bounded Context

![[Assets/posts/20180703/2.png]]

### 주의할 점.
- 하위 Domain의 모델이 뒤섞이지 않도록 하는 것이다.
- 개별 Bounded Context Package로 구성하여 하위 Domain이 섞이지 않도록 하여 효과를 낼 수 있다.
- 도메인이 섞이게 된다면 기능 확장이 어렵게 되고 이는 서비스의 경쟁력을 떨어뜨리는 원인이 될 수 있다.

## Bounded Context의 구현
- Bounded Context는 아래를 모두 포함하기도 한다.
  - 표현 영역
  - 응용 서비스
  - 도메인
  - 인프라 영역

### 주의할 점.
- 모든 Bounded Context를 반드시 Domain Driven으로 개발할 필요가 없다.
- 간단한 DAO와 데이터 중심의 VO(Value Object)를 이용해서 개발해도 유지보수하는 부분에 큰 문제가 없다.
- 도메인 기능 자체가 단순하면 서비스-DAO로 구성된 CRUD 방식을 사용해도 코드를 유지보수하는 데 문제되지 않는다.

## CQRS Pattern(Command Query Resposibility Segregaton)
- 상태를 변경하는 명령 기능과 내용을 조회하는 Query 기능을 위한 모델을 구분하는 Pattern
- 하나의 Bound Context 안에 CRUD와 Domain Driven 방식을 섞어서 적용할 수도 있다.
  - Domain : 상태를 변경하는 명령 기능
  - DAO(Data Access Object) : 조회 기능
  - CQRS가 대표적인 Pattern


## Bound Context 간 통합

### 왜(Bound Context)를 통합해야 하는가?
- 서로 다른 Bound Context에서 이름은 같지만 도메인 관점이 달라서 내용이 다른 Model이 있다.
- 간단하게 예시를 든다면?
  - 추천 시스템과 추천을 사용하는 카테고리 시스템은 상품에 대한 정보가 다르다.
  - 추천 시스템 : 상품에 대한 추천 점수와 같은 추천에 필요한 정보를 담고있다.
  - 카테고리 시스템 : 카테고리 정보와 같은 카테고리에 필요한 정보를 담고있다.

![[Assets/posts/20180703/4.png]]

- 제공하는 측에서 클라이언트를 제공해야 한다.
  - 사용하는 측에선 입맛에 맞게 변환하는 작업이 필요하다.
- 직접 REST API를 호출하여 통합하는 대신 큐를 사용해서 간접적으로 통합하는 방식도 있다.


## Bound Context 간 관계
- 위에서 언급했던 것처럼 사용하는 측은 제공하는 측에 의존성을 가지게 된다.
- 제공하는 측이 프로토콜을 변경하게 되면 사용하는 측에서는 많은 수정사항이 발생할 수 있다.
  - 대표적인 예 : 제공[검색], 사용[블로그, 카페, 메일]
- 이를 방지하기 위해 데이터 형태로 제공하는 해결 방법이 등장
  - [Google Protocol Buffer](https://developers.google.com/protocol-buffers/)
  - XML, JSON 형태와 같은 데이터를 저장하는 형태

### [손상 방지 계층(Anticorruption Layer)](https://docs.microsoft.com/ko-kr/azure/architecture/patterns/anti-corruption-layer)
![[Assets/posts/20180703/5.png]]

- 위 그림 처럼 하나의 Layer를 추가해서 외부에 인터페이스 변경에도 기존 도메인의 영향도를 낮출 수 있다.

### 공유 커널(Shared Kernel)
- 두 Bound Context가 같은 모델을 공유하는 경우
- 장점
  - 중복 개발을 방지할 수 있다.
- 단점
  - 한 팀에서 임의로 모델을 변경해서는 안된다.
  - 변경이 필요할 경우 커뮤니케이션 비용이 소요된다.

## 정리하며
- 도메인 주도 설계에서 에릭 에반스는 `대규모 조직에서 너무 큰 단위 모델을 일관되게 유지하는 것이 비현실적`이라면서 독립적인 보편적 언어를 개발할 수 있도록 도메인 영역을 제한하도록 권합니다.
- `커뮤니케이션의 문제를 극복하는 게 DDD의 목적` 중 하나인데 오히려 DDD 때문에 커뮤니케이션이 복잡해진다면 이는 DDD의 애초 목적에도 맞지 않습니다.
> Bounded Context 정답은 사람들과 커뮤니케이션을 통해 만들어 가는 것이라 생각됩니다.



## Reference
- <https://martinfowler.com/bliki/BoundedContext.html>
- <https://martinfowler.com/bliki/CQRS.html>
- <https://martinfowler.com/bliki/CommandQuerySeparation.html>
- <http://blog.fupfin.com/?p=161>
