---
title: DDD - Architecture
tags:
  - DDD
date: 2018-08-12
aliases: 
  - ../articles/2018-08/DDD-Architecture
---

![[Assets/logo/ddd.png]]

# 아키텍처 개요
## 네 개의 영역
- 표현
- 응용
- 도메인
- Infrastructure

- 응용 영역은 기능을 구현하기 위해 도메인 영역의 도메인 모델을 사용한다.
- 응용 서비스는 로직을 직접 수행하기보다는 `도메인 모델에 로직 수행을 위임`한다.
- 도메인 영역은 도메인 모델을 구현한다.
    - 배송지 변경, 결제 완료, 주문 총액 계산등 과 같은 핵심 로직을 도메인 모델에서 구현한다.

- Infrastructure
    - 구현 기술에 대한 것을 다룬다.
    - RDBMS, Message Queue, SMTP (ex: mysql, kafka)

## Layer Architecture

![[Assets/posts/20180812/1.png]]

- 도메인의 복잡도에 따라 응용과 도메인을 분리하기도 하고 한 계층으로 합치기도 한다.
- 상위 계층에서 하위 계층으로 의존만 존재하고 하위 계층은 상위 계층에 의존하지 않는다.
- 응용계층이 도메인 뿐만 아니라 `Infrastructure에 의존`하기도 한다.
    - Infrastructure에 의존하면 테스트하기 어렵다.
    - 기능 확장이 어렵다.
    - 해결 방법은 DIP를 적용하는 것이다.


## DIP(Dependency Injection Principle)

![[Assets/posts/20180812/2.png]]

- Low Abstract Module이 High Abstract Module에 의존하도록 바꾼다.
- 추상화한 interface에 있다.
- High Abstract Module이 정한 규칙에 따라 Low Abstract Module이 구현하는 것.
- 인터페이스는 High Abstract Module 관점에서 도출해야 한다.

### 잘못된 DIP Example

![[Assets/posts/20180812/3.png]]

#### 어떠한 점이 잘못되었을까?
- CaculateDiscountService가 저수준으로 정의된 RuleEngine에 의존적이다.
- DIP의 핵심은 고수준 모듈이 저수준 모듈에 의존하지 않도록 하기 위함
- 이 구조는 도메인 영역은 구현 기술을 다루는 인프라스트럭처 영역에 의존하고 있다.
    - 즉 고수준 모듈이 저수준 모듈에 의존하고 있다.

### 다시 정의한 DIP Example

![[Assets/posts/20180812/4.png]]
- CaculateDiscountService는 도메인 관점으로 재정의된 RuleEngine에 의존한다.


## 도메인 영역의 주요 구성요소
- Entity
    - 고유의 식별자를 갖는 객체로 자신의 라이프 사이클을 갖는다.
- Value
    - 고유의 식별자를 갖기 않는 객체로 주로 개념적으로 하나인 도메인 객체의 속성을 표현할 때 사용한다.
- Aggregate
    - Entity와 Value를 개념적으로 하나로 묶은 것이다.
- Repository
    - 도메인 모델의 영속성을 처리한다.
- Domain Service
    - 특정 엔티티에 속하지 않는 도메인 로직을 제공한다.

### Entity와 Value
- 도메인 모델의 Entity는 단순히 데이터를 담고 있는 데이터 구조라기보다는 데이터와 함께 기능을 제공하는 객체이다.
- Value는 `immutable로 구현하는 것으로 권장`한다.

### Aggregate
- 도메인이 커질수록 Entity와 Value가 많아지고 관리하기 힘들다.
- 관련 객체를 하나로 묶은 객체이다.
    - 주문 : 주문자, 배송지 정보, 주문 목록, 총 결제 금액
- 내부 구현을 숨겨서 Aggregate 단위로 구현을 캡슐화할 수 있도록 돕는다.

### Repository
- Aggregate 단위로 도메인 객체를 저장하고 조회하는 기능을 정의한다.
    - 저장하는 메소드
    - 루트 식별자로 Aggregate를 조회하는 Method

### 요청 처리 흐름
- @Transaction
- 기능 구현에 필요한 도메인 객체를 Repository에서 가져와 실행하거나 신규 도메인 객체를 생성해서 Repository에 저장한다.

### Infrasturcture
- 무조건 Infrasturcture의존을 없애는 것은 좋은 것이 아니다.
    - @Transaction을 사용하는 것은 편리하다.
- DIP의 장점을 해치지 않는 범위에서 응용 영역과 도메인 영역에서 구현 기술에 대한 의존을 가져가는 것이 현명하다.
- 의존을 완전히 갖지 않도록 시도하는 것은 구현을 더 복잡하고 어렵게 만들 수 있다.

### 모듈 구성
- 한 패키지에 가능하면 10개 미만으로 타입 개수를 유지하려고 노력한다.
- 이 개수가 넘어가면 모듈을 분리하는 시도를 해본다.
