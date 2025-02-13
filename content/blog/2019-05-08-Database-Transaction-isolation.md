---
title: 트랜잭션의 격리 수준(isolation Level)이란?
tags:
  - Database
date: 2019-05-08
aliases: 
  - ../articles/2019-05/Database-Transaction-isolation
---

![[Assets/logo/database.jpg]]

## 트랜잭션의 격리 수준(isolation)이란?
- 동시에 여러 트랜잭션이 처리될 때
  - 특정 트랜잭션이 다른 트랜잭션에서 변경하거나 조회하는 데이터를 볼 수 있도록 허용할지 말지를 결정하는 것.

### 트랜잭션 격리 수준은 어떤게 있을까?
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

#### READ UNCOMMITTED
- 각 트랜잭션에서의 변경 내용이 `COMMIT`이나 `ROLLBACK` 여부에 상관 없이 다른 트랜잭션에서 값을 읽을 수 있다.
- 정합성에 문제가 많은 격리 수준이기 때문에 사용하지 않는 것을 권장한다.
- 아래의 그림과 같이 `Commit`이 되지 않는 상태지만 `Update`된 값을 다른 트랜잭션에서 읽을 수 있다.

![[Assets/posts/img/2019-05-08-21-09-02.png]]



#### 그렇다면 READ UNCOMMITTED는 문제가 없을까?
- `DIRTY READ`현상 발생
  - 트랜잭션이 작업이 완료되지 않았는데도 다른 트랜잭션에서 볼 수 있게 되는 현상

#### READ COMMITTED
- RDB에서 대부분 기본적으로 사용되고 있는 격리 수준이다.
- Dirty Read와 같은 현상은 발생하지 않는다.

- 실제 테이블 값을 가져오는 것이 아니라 Undo 영역에 백업된 레코드에서 값을 가져온다.

![[Assets/posts/img/2019-05-08-21-18-08.png]]

#### 그렇다면 READ COMMITTED는 문제가 없을까?
![[Assets/posts/img/2019-05-08-21-25-41.png]]
- `트랜잭션-1`이 Commit한 이후 아직 끝나지 않는 `트랜잭션-2`가 다시 테이블 값을 읽으면 값이 변경됨을 알 수 있다.
- 하나의 트랜잭션내에서 똑같은 SELECT 쿼리를 실행했을 때는 항상 같은 결과를 가져와야 하는 `REPEATABLE READ`의 정합성에 어긋난다.
- 이러한 문제는 주로 입금, 출금 처리가 진행되는 금전적인 처리에서 주로 발생한다.
  - 데이터의 정합성은 깨지고, 버그는 찾기 어려워 진다.

#### REPEATABLE READ
- MySQL에서는 트랜잭션마다 트랜잭션 ID를 부여하여 트랜잭션 ID보다 작은 트랜잭션 번호에서 변경한 것만 읽게 된다.
- Undo 공간에 백업해두고 실제 레코드 값을 변경한다.
  - 백업된 데이터는 불필요하다고 판단하는 시점에 주기적으로 삭제한다.
  - Undo에 백업된 레코드가 많아지면 MySQL 서버의 처리 성능이 떨어질 수 있다.
- 이러한 변경방식은 [MVCC(Multi Version Concurrency Control)](https://en.wikipedia.org/wiki/Multiversion_concurrency_control)라고 부른다.

![[Assets/posts/img/2019-05-08-21-52-08.png]]


#### 그렇다면 REPEATABLE READ는 문제가 없을까?
- PHANTOM READ
  - 다른 트랜잭션에서 수행한 변경 작업에 의해 레코드가 보였다가 안 보였다가 하는 현상
  - 이를 방지하기 위해서는 쓰기 잠금을 걸어야 한다.

![[Assets/posts/img/2019-05-08-22-14-18.png]]


#### SERIALIZABLE
- 가장 단순한 격리 수준이지만 가장 엄격한 격리 수준
- 성능 측면에서는 동시 처리성능이 가장 낮다.
- `SERIALIZABLE`에서는 `PHANTOM READ`가 발생하지 않는다.하지만.. 데이터베이스에서 거의 사용되지 않는다.

## Reference
- <https://doooyeon.github.io/2018/09/29/transaction-isolation-level.html>
