---
title: Hbase Replication에 대해
tags:
  - HBase
date: 2020-07-13
aliases: 
  - ../articles/2020-07/Hbase-Replication
---

![[Assets/logo/hbase.png]]

## Hbase Replication에 대해
#### 기본적인 Replication 특징에 대해
- Push 방식을 사용하며 Source Cluster에서 Destination Cluster 방향으로 동작한다.
    - directional replication 뿐만 아니라 bi-directional replication도 지원한다.
- Cluster간의 데이터 동기화를 위해 [WAL(write-ahead log)](https://en.wikipedia.org/wiki/Write-ahead_logging)를 사용하고 있다.
- Cluster Replication은 기본적으로 비동기 방식으로 진행된다.
    - 비동기로 동작하기 때문에 Cluster간의 완벽한 동기화는 지원할 수 없다.
    - Replication의 Goals는 eventual consistency을 지향하고 있다.

#### [Hbase 데이터 변경에서 Cluster Replication이 되기까지](https://hbase.apache.org/book.html#_life_of_a_wal_edit)
- Cluster Replication 전체적인 모습은 다음과 같다.

![[Assets/posts/img/2020-07-10-16-12-39.png]]

- Client가 Hbase에게 데이터 변경(Put, Delete)을 요청하면 특정 Region Node의 WAL 파일안에 WALEdit 형태로 기록된다.

- 변경되는 Cell이 Replication 범위에 해당하는 경우 Replication Queue에 추가하게 된다.

- Batch Process 역할을 하는 Thread는 log(WAL)로 부터 변경 사항들은 읽어 들인다.

- 변경 사항은 Source Cluster의 UUID 정보를 추가하여 버퍼에 추가된다.
    - 버퍼가 채워지거나 Reader가 파일 끝까지 읽을 경우, Destination Cluster에 Random으로 Region에 변경 사항들을 보내게 된다.

- Region Server는 변경 사항들을 순차적으로 읽으며, 변경사항들을 각 테이블마다 배정된 Buffer로 분리하는 작업을 한다.
    - 모든 변경 사항들을 읽으면 각 Buffer는 Table로 Flushing한다.
    - 변경 사항을 읽으면서 Source, Destination의 UUID를 확인하며 반영하기 때문에 Replication Loop를 방지할 수 있다.

- Source Cluster의 WAL Offset들은 ZooKeeper를 통해 등록하고 관리한다.
    - 이를 통해 문제가 생겨도 WAL을 통해 복구가 가능하다.
    - 최소의 3대 이상의 Zookeeper로 구성하는 것을 권한다.

- Region의 Thread는 위와 같이 읽고, 필터링하며 변경사항들을 반영한다.
    - Destination Region 서버는 RPC 호출에 응답하지 않는다.

- 만약 Destination Region 서버가 유효하지 않다면?
    - Source Cluster는 새로운 Region 서버에 복사하기 위한 준비를 한다.
    - 그리고 변경 사항들을 몇번이고 전송한다.


#### WALEdit이란?
- 하나의 Transaction을 나타내는 Object
- 하나 이상의 변경 작업을 가지고 있을 수 있다.

#### ClusterId(UUID)이란?
- 모든 HBase Cluster는 UUID 형태로 HBase에 의해 자동으로 생성된 ClusterId를 가지고 있다.
- ClusterId는 Restart시 바뀌지 않기 의해서 파일시스템에 저장한다.
    - `zookeeper의 /hbase/bhaseid znode`

#### Replication 과정에서 Key충돌이 나는 경우 어떻게 해결할까?
- Cell이 변경 사항에는 Timestamp와 Version을 기반으로 가장 늦게 발생한 변경 사항이 반영이 된다.


## Reference
- <https://hbase.apache.org/book.html#_cluster_replication>
- <https://charsyam.wordpress.com/2012/08/05/%EB%B0%9C-%EB%B2%88%EC%97%AD-hbase-replication-overview/>
- <https://charsyam.wordpress.com/2012/08/22/%eb%b0%9c-%eb%b2%88%ec%97%ad-hbase-replication-operational-overview/>
- <https://community.cloudera.com/t5/Support-Questions/HBase-Active-Active-writes-collision/td-p/138622>
