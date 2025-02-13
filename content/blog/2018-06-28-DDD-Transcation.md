---
title: DDD - Aggregate Transaction 관리
tags:
  - DDD
date: 2018-06-28
aliases: 
  - ../articles/2018-06/DDD-Transcation
---

![[Assets/logo/ddd.png]]

## 트랜잭션(Transaction)이란?
- [Link](https://nesoy.github.io/articles/2018-05/Database-Transaction)

## Pessimistic Lock(선점 잠금)
![[Assets/posts/20180628/1.png]]
- Thread1이 사용하는 Resource(자원)을 Lock(잠금)합니다.
- Thread2는 Resource(자원)에 접근하려고 하면 unLock이 될 때까지 기다려야 합니다.

### 선점 잠금에는 문제가 없을까요?
- Thread1이 Resource A를 잠그고 Resource B를 사용하기 위해 요청한 상황
- Thread2이 Resource B를 잠그고 Resource A를 사용하기 위해 요청한 상황

![[Assets/posts/20180628/5.png]]

### 더 쉽게 설명하자면?
- 서로가 가지고 있는 것을 놓지 않고 상대가 가진 것을 뺏기 위해 노력하지만.
- 끝나지 않는 싸움입니다.

![[Assets/posts/20180628/6.png]]

### 이를 해결하기 위해선?
- Timeout를 통해 무한 대기 상태를 방지하고 있습니다.
  - Lock Timeout
  - Query Timeout
  - Connection Timeout
- 사용하는 DBMS에 따라 전략이 다르기에 DBMS를 확인해야 합니다.


## 선점 잠금으로 풀 수 없는 상황

![[Assets/posts/20180628/2.png]]

- 운영자가 시스템에서 배송지를 가져옵니다.
- 운영자가 상품을 배송하러 간 사이에 고객은 배송지를 변경하죠.
- 운영자는 예전의 배송지로 배송을 진행하고 배송 상태 변경을 요청합니다.

> 그러면 운영자는 고객의 최신 배송지가 아닌 예전의 배송지로 배송해버리는 문제가 발생합니다.

## Optimistic Lock(비선점 잠금)
![[Assets/posts/20180628/3.png]]

- 변경한 데이터를 실제 DBMS에 반영하는 시점에 변경 가능 여부를 확인하는 방식입니다.
- 데이터의 version 숫자를 부여합니다.
- 데이터가 변경이 발생할 경우 요청 version번호와 시스템 version번호가 일치하는지 확인합니다.

## Passimistic Offline Lock(오프라인 선점 잠금)
![[Assets/posts/20180628/4.png]]

- Application Level에서 Lock을 거는 방법으로 생각됩니다.
- 한 사람이 블로그의 글을 수정하고 있다면.
  - 다른 사람들이 글 수정을 위해 접근한다면 Lock 상태를 보여주며 에러 페이지를 반환합니다.
- 여러 트랜잭션에 걸쳐 데이터 변경을 막습니다.
- 첫번째 트랜잭션에서 더 이상 아무 행동을 하지 않을 수 있기 때문에 잠금의 유효 시간을 가져야 합니다.
- 단점.
  - 코드 복잡도 높습니다.

## 정리하며
> 선점 잠금과 비선점 잠금을 선택하는 가장 중요한 기준은 충돌의 빈도와 심각도다. 충돌이 자주 발생하지 않거나 그 결과가 그리 심각하지 않다면 더 나은 동시성을 제공하고 구현하기기도 쉬운 비선점 잠금을 선택해야 한다. 그러나 충돌의 결과가 사용자에게 심각한 경우에는 선점 잠금을 사용해야 한다. - 마틴파울러 저. 엔터프라이즈 애플리케이션 아키텍처 패턴

- 문제에 대해 이해하고 Lock 전략을 선택하는 것이 최선입니다.



## Reference
- <https://github.com/iamkyu/TIL/blob/master/books/summary/ddd-start.md#8-%EC%95%A0%EA%B7%B8%EB%A6%AC%EA%B1%B0%ED%8A%B8-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EA%B4%80%EB%A6%AC>
