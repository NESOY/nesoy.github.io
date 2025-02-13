---
title: Database의 리플리케이션(Replication)이란?
tags:
  - Database
date: 2018-02-16
aliases: 
  - ../articles/2018-02/Database-Replication
---
![[Assets/logo/database.jpg]]

# Replication
## 배경
아주 단순한 Database를 구성할때에는 아래의 그림처럼 하나의 서버와 하나의 Database를 구성하게 된다.

![[Assets/posts/20180216/1.png]]

하지만 사용자는 점점 많아지고 Database는 많은 Query를 처리하기엔 너무 힘든 상황이 오게 된다.

Query의 대부분을 차지하는 `Select`를 어느 정도 해결하기 위해 Replication이란 방법이 나오게 되었다.

## Replication이란?
- 두 개의 이상의 DBMS 시스템을 `Mater / Slave`로 나눠서 동일한 데이터를 저장하는 방식이다.

## 방식
![[Assets/posts/20180216/2.png]]

`Master DBMS`에는 데이터의 수정사항을 반영만하고 Replication을 하여 `Slave DBMS`에 실제 데이터를 복사한다.

아래에는 데이터를 복사하는 방법에 대해 소개하는 글이다.

### 로그기반 복제(Binary Log)
- Statement Based : `SQL문장`을 복사하여 진행
  - issue : SQL에 따라 결과가 달라지는 경우(Timestamp, UUID, ...)
- Row Based : SQL에 따라 변경된 `Row 라인`만 기록하는 방식
  - issue : 데이터가 많이 변경된 경우 데이터 커질 수 밖에 없다.
- Mixed : 기본적으로 Statement Based로 진행하면서 필요에 따라 Row Based를 사용한다.

## Replication 장점.
![[Assets/posts/20180216/3.png]]

언급했던 것처럼 Query의 대부분은 `Select`가 차지하고 있다.

이 부분의 부하를 낮추기 위해 많은 `Slave Database`를 생성하게 된다면 `Read(Select)` 성능 향상 효과를 얻을 수 있다.

`Master Database` 영향없이 로그를 분석할 수 있다.

## Reference
- <https://dev.mysql.com/doc/refman/5.7/en/replication.html>
