---
aliases: [/articles/2018-08/DDD-Domain]
comments: false
date: 2018-08-03
description: 
tags: [DDD]
title: DDD - Domain
---
# 도메인 모델 시작
- 도메인 모델은 기본적으로 도메인 자체를 이해하기 위한 개념 모델
- 개념 모델과 구현 모델은 서로 다른 것이지만 구현 모델이 개념 모델을 최대한 따르도록 할 수는 있다.
- 특정 도메인을 위한 소프트웨어라고 해서 도메인이 제공해야 할 모든 기능을 구현하는 것은 아니다.

## 도메인 모델
- 도메인 모델을 표현할 때 클래스 다이어그램이나 상태 다이어그램과 같은 UML표기법만 사용해야하는 것은 아니다.
- 모델의 각 구성요소는 특정 도메인을 한정할 때 비로소 의미가 완전해지기 때문에, 각 하위 도메인마다 별도로 모델을 만들어야 한다.

## 도메인 모델 패턴
### 사용자 인터페이스
- 사용자의 요청을 처리하고 사용자에게 정보를 보여준다.

### 응용
- 사용자가 요청한 기능을 실행한다. 도메인 계층을 조합해서 기능을 실행한다.

### 도메인
- 시스템이 제공할 도메인의 규칙을 구현한다.

### Infrastructure
- 데이터베이스나 메시징 시스템과 같은 외부 시스템과의 연동을 처리한다.

> 구현한 코드는 도메인 모델에만 위치하기 때문에 규칙이 바뀌거나 규칙을 확장해야 할 때 다른 코드에 영향을 덜 주고 변경 내역을 모델에 반영할 수 있게 된다.


## 개념 모델과 구현 모델
- 개념 모델은 순수하게 문제를 분석한 내용.
    - 데이터베이스 트랜잭션 처리, 성능, 구현 기술에 대해 고려하지 않았기 때문에 그대로 사용할 수 없다.
- 전반적인 개요를 알 수 있는 수준으로 개념 모델 작성
    - 전체 윤곽을 이해하는 데 집중.
    - 구현 모델로 점진적으로 발전시켜 나가야 한다.


## 도메인 모델 도출
- 요구사항은 언제나 바뀔 수 있고 언제든지 Naming도 바뀔 수 있다.
- 모델을 공유할 때는 화이트보드나 위키와 같은 도구를 사용해서 누구나 쉽게 접근할 수 있도록 하면 좋다.

## Entity & Value
### Entity
- 식별자를 갖는다는 것이다.
- 예를 들면 사람의 주민등록번호는 하나의 고유한 값을 가진다. 따라서 사람은 Entity가 되며 주민등록번호라는 속성을 갖게 된다.

### Value
- 개념적으로 완전한 하나를 표현할 때 사용한다.
- Value Type을 위한 기능을 추가할 수 있다.
- 기존 데이터를 변경하기 보다는 변경한 데이터를 갖는 새로운 Value Object를 생성하는 방식을 선호.
    - 데이터 변경 기능을 제공하지 않음으로써 immutable한 성격을 가진다.
    - 안전한 코드를 작성할 수 있는 장점.


### 도메인 모델에 set Method 넣지 않기
- get/set Method는 습관적으로 추가하는 Method.
- 특히 set Method는 도메인의 핵심 개념이나 의도를 코드에서 사라지게 한다.
    - set 보다는 의도를 명확하게 표현하는 코드로 바꾸는 연습을 하자.
    - 어떠한 이유로 상태가 바뀌어야 하는지?

### DTO
- Data Transfer Object
    - Presentation과 Domain Layer에서 데이터를 서로 주고받을 때 사용하는 일종의 구조체
    - 최근 프레임워크는 set Method 대신에 도메인 기능을 최대한 구현하자.

## 도메인 용어
- 코드를 작성할 때 도메인에서 사용하는 용어는 매우 중요.
- 코드를 분석하고 이해하는 시간도 절약한다.
- 도메인 용어를 사용해서 최대한 도메인 규칙을 코드로 작성하게 되므로 버그도 줄이게 된다.

