---
title: Database의 파티셔닝(Partitioning)이란?
tags:
  - Database
date: 2018-02-22
aliases: 
  - ../articles/2018-02/Database-Partitioning
---

![[Assets/logo/database.jpg]]

# Partitioning

## 배경

![[Assets/posts/20180222/1.png]]

서비스의 크기가 점점 커지게 되면서 다양하고 많은 Table들이 존재하게 되었다.

VLDB(Very Large DBMS)`전체 DB가 하나의 DBMS에 다 들어가기 힘들어지는 DBMS`이 자연스럽게 등장하였고 하나의 DBMS가 많은 Table을 관리하다 보니 느려지는 이슈가 발생하게 되었다.

이러한 이슈를 해결하기 위한 하나의 방법이 바로 파티셔닝(Partitioning)이다.

## Partitioning이란?
- 큰 Table이나 인덱스를 관리하기 쉬운 단위로 분리하는 방법을 의미한다.

## Benifits

### 가용성(Availability)
- 물리적인 Partitioning으로 인해 전체 데이터의 훼손 가능성이 줄어들고 데이터 가용성이 향상된다.

### 관리용이성(Manageability)
- 큰 Table들을 제거하여 관리를 쉽게 해준다.

### 성능(Performance)
- 특정 DML과 Query의 성능을 향상시킴, 주로 `대용량 Data Write` 환경에서 효율적이다.
- 많은 Insert가 있는 OLTP 시스템에서 Insert 작업들을 분리된 파티션들로 분산시켜 경합을 줄인다.

## Disadvantages
- Table간의 Join에 대한 비용이 증가한다.
- 테이블과 인덱스를 별도로 파티션 할수는 없다. 테이블과 인덱스를 같이 Partitioning 하여야 한다.

## Partitioning 범위

### Range partitioning
- 연속적인 숫자나 날짜 기준으로 Partitioning 한다.
- 손쉬운 관리 기법 제공 에 따른 관리 시간의 단축할 수 있다.
- ex) 우편번호, 일별, 월별, 분기별 등 의 데이터에 적합하다.

![[Assets/posts/20180222/2.png]]

### List partitioning
- 특정 Partition에 저장 될 Data에 대한 명시적 제어 가능하다.
- 분포도가 비슷 하며, 많은 SQL에서 해당 Column의 조건이 많이 들어오는 경우 유용하다.
- Multi-Column Partition Key 제공하기 힘들다.
- ex) [한국, 일본, 중국 -> 아시아] [노르웨이, 스웨덴, 핀란드 -> 북유럽]

![[Assets/posts/20180222/3.png]]

### Composite partitioning
- Composite Partition은 Partition의 Sub-Partitioning 을 말한다.
- 큰 파티션에 대한 I/O 요청을 여러 partition으로 분산할 수 있다.
- Range Partitioning 할 수 있는 Column이 있지만, Partitioning 결과 생성된 Partition이 너무 커서 효과적으로 관리할 수 없을 때 유용하다.
- Range-list, Range-Hash

### Hash partitioning
- Partition Key의 Hash값에 의한 Partitioning (균등한 데이터 분할 가능)
- Select시 조건과 무관하게 병렬 Degree 제공 (질의 성능 향상)
- 특정 Data가 어느 Hash Partition에 있는지 판단 불가
- Hash Partition은 파티션을 위한 범위가 없는 데이터에 적합

![[Assets/posts/20180222/4.png]]

## 방법

### Horizontal Partitioning

![[Assets/posts/20180222/5.png]]

#### Benefits
- 데이터의 개수를 기준으로 나누어 Partitioning한다.
- 데이터의 개수가 작아지고 따라서 index의 개수도 작아지게 된다. 자연스럽게 성능은 향상된다.

#### Disadvantages
- 서버간의 연결과정이 많아진다.
- 데이터를 찾는 과정이 기존보다 복잡하기 때문에 latency가 증가하게 된다.
- 하나의 서버가 고장나게 되면 데이터의 무결성이 깨질 수 있다.


### Vertical Partitioning

![[Assets/posts/20180222/6.png]]

- 테이블의 컬럼을 기준으로 나누어 Partitioning한다.
- 정규화하는 과정도 이와 비슷하다고 볼 수 있지만 Vertical Partitioning은 이미 정규화된 Data를 분리하는 과정이다.
- 자주 사용하는 컬럼등을 분리시켜 성능을 향상시킬 수 있다.


## Reference
- <https://en.wikipedia.org/wiki/Partition_(database)>
- <http://theeye.pe.kr/archives/1917>
- <http://tnsdogfoot.blogspot.kr/2014/09/2014-9-25.html>
- <http://geekswithblogs.net/shaunxu/archive/2012/01/07/sql-azure-federation-ndash-introduction.aspx>
- <http://wiki.gurubee.net/pages/viewpage.action?pageId=3899999>
