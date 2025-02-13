---
title: Couchbase는 어떻게 동작하는가?
tags:
  - Couchbase
date: 2018-11-20
aliases: 
  - ../articles/2018-11/Couchbase
---

![[Assets/logo/couchbase.png]]


## High - Level Deployment Architecture

![[Assets/posts/20181120/1.png]]

- Couchbase는 JSON 문서, Binary Data를 저장할 수 있습니다.
- Couchbase는 저장할 문서는 다른 서버로 Replication을 진행합니다.

### Bucket & vBucket
- 문서는 bucket이라고 불리는 Logical Data Container에 저장을 하게 됩니다.
- 각각의 bucket은 논리적인 1024개의 vBucket으로 구성되어 있습니다.
- 1024개의 vBucket은 Cluster와 Mapping 정보를 가지고 있습니다.

![[Assets/posts/20181120/2.png]]

- CRC32 Hash Function을 사용하여 해당 Cluster-Node 정보를 얻습니다.
    - 해당 Cluster-Node를 통해 문서를 Couchbase에 저장하게 됩니다.

- [vBucket - ver 5.5](https://docs.couchbase.com/server/5.5/understanding-couchbase/buckets-memory-and-storage/vbuckets.html)


## Client Architecture
- Client는 Cluster Map을 통해 Cluster 정보를 관리하고 있습니다.
- Cluster Map을 통해 얻은 정보로 적절한 서버에 요청을 보냅니다.
- Client가 Cluster와 처음으로 connection을 맺은 이후 갱신된 Cluster Map을 통해 요청을 보냅니다.
    - connection은 Streaming Update를 위해 유지합니다.
- 모든 Couchbase의 Cluster와 Client은 Cluster Map을 공유하게 됩니다.

### Data flow - Client

![[Assets/posts/20181120/3.png]]

1. 사용자가 원하는 document에 값을 변경하는 Event를 진행합니다.
2. Application은 Set Operation을 실행합니다.
3. Couchbase Client는 문서 Key Hashing값을 통해 문서를 저장할 Server를 찾습니다.
4. Couchbase Server는 문서를 복사하고 Memory에 Caching합니다. 그리고 비동기적으로 Disk에 저장하게 됩니다.

### Data flow - Server
- Couchbase Server는 문서 단위로 변경이 진행됩니다.
- 다음은 Couchbase Server가 Request를 받고 문서를 작성하는 과정입니다.

![[Assets/posts/20181120/4.png]]

1. 모든 Server는 각각의 Object-managed cache를 가지고 있습니다.
- 클라이언트는 문서를 Cache에 작성하고 서버는 클라이언트에게 Confirm 메시지를 보냅니다.
- 클라이언트는 기본적으로 서버가 Persist Level과 문서를 Replication하는 것을 기다리지 않게 설계 되어 있습니다.
- 이 모든 행위는 비동기적으로 이뤄집니다.
- 하지만 Client SDK를 사용한다면 동기적으로 진행할 수 있도록 변경할 수 있습니다.

2. 저장할 문서는 다른 서버로 Replication을 하기 위해 intra-cluster의 replication Queue에 추가됩니다.
3. 또한 문서는 Disk Write Queue에 추가되며 비동기적으로 Disk에 작성합니다.
4. Disk에 작성이 완료된 문서는 XDCR을 진행하거나 Index를 생성하는 작업을 진행합니다.

### Server 구성요소
![[Assets/posts/20181120/5.png]]

### Data Manager
- Data manager는 Application의 데이터의 저장과 조회에 응답해주는 역할입니다.
- 구성요소
    - Object-Managed Cache
    - Storage Engine
    - Query Engine

#### Object-Managed Cache
- 모든 Couchbase Server는 Multi Threaded로 이루어진 Object-Managed Cache를 가지고 있습니다.
- 메모리기반으로 접근하기 때문에 빠른 응답을 기대할 수 있습니다.

![[Assets/posts/20181120/6.png]]

- HashTable은 Couchbase의 partition들의 정보를 가지고 있습니다.
- Hashtable 정보는 파티션안에 있는 각각의 문서의 Document ID, Metadata를 동기화 하고 있습니다. 상황에 따라 Content를 가지고 있는 경우도 있습니다.
    - Content를 가지고 있는 경우 Cache 역할을 하기도 합니다.
- 데이터를 읽을때 Hashtable을 통해 Memory부터 찾고 Doucment가 없는 경우 Disk에서 읽습니다.
    - 서버는 최근 24시간동안 document Access log file을 작성합니다.
    - 만약 서버를 재시작하게되면 access log를 읽어 메모리에 최근 읽었던 document 정보를 올리는 과정을 `warmup`이라고 합니다.
- `warmup` 은 다음과 같이 진행합니다.
    - 각각의 partition은 Document ID, Metadata들을 읽어 메모리에 적재시킵니다.
    - 만약 메모리에 공간이 남는 경우 access log를 읽어 우선순위에 맞게 content도 메모리에 적재시킵니다.


- 각각의 Hashtable은 여러 개의 Worker Thread를 통해 read와 write를 진행하게 됩니다.
- Worker Thread가 Hashtable에 접근하기 전에 lock과정이 필요합니다.
    - 각각의 Hashtable은 section 단위로 lock을 진행하기 때문에 multiple lock이 가능합니다.
- Couchbase의 `checkpoints`
    - 문서의 변화를 추적하기 위한 자료구조.
    - linked list를 사용하여 문서의 변화를 기록하고
    - Storage engine이나 replication하는 과정에 사용합니다.

- Document는 `TAP replicator`를 통해 다른 서버로 Replication이 됩니다.
    - TAP 연결이 source Node와 처음 연결된 경우
        - partition의 hashtable을 scan합니다.
    - 연결된 이후 병렬로 `backfill` 프로세스가 시작되어 data를 Disk에서 bulk로 읽어올지 결정합니다.
    - Couchbase는 사용 가능한 RAM보다 시스템에 더 많은 데이터를 제공할 수 있으므로, 다른 노드로 전송하기 위해 디스크에서 읽어야 하는 상당한 양의 데이터가 있을 수 있습니다.
    - 이를 제어하기 위해선 `backfill process`의 `resident item ratio`를 보고 판단합니다.
        - `resident item ratio` : RAM에 cache된 Data / 전체 데이터
        - 90%보다 낮은 경우 bulk로 Disk에서 RAM으로 데이터를 읽어오고 있는 중입니다.
        - 90%보다 높은 경우 프로세스는 동작하지 않습니다.
- hashtable의 scan을 완료하면 Couchbase는 `TAP connection`을 통해 key와 document을 전송합니다.
    - 전송될 정보들은 RAM에 cache된 상태로 있기 때문에 상당히 빠르게 진행됩니다.
    - 전송될 동안 서버에서 문서가 변경될 경우 `checkpoint`를 통해 변화를 기록합니다.
    - 전송이 완료된 경우 `TAP replicator`가 checkpoint와 document를 마지막으로 전송함으로써 replicatio이 끝납니다.

- Couchbase 서버들은 Disk write를 비동기적으로 실행합니다.
    - document는 hashtable에 존재하며, 문서의 변화는 checkpoint에 기록됩니다.
    - 같은 문서에서 문서의 변화가 동일하게 발생한다면 RAM Level에서 deduplication을 처리하고 최종적으로 update된 문서버젼을 disk에 작성합니다.
- Data bucket당 기본적으로 3개의 Worker Thread가 존재합니다.
    - 2개의 Reader Worker
    - 1개의 Writer Worker
    - 최대 8개까지 Thread를 늘릴 수 있습니다.
- Couchbase Server는 Disk fetch를 Batch단위로 진행합니다.
    - Storage Engine을 통해 Document를 읽고 Hashtable에 값을 채웁니다.
    - 메모리가 더이상 없는 경우 Couchbase는 Object-Managed Cache에서 필요한 공간을 얻어냅니다.
        - 이 과정을 `ejection`이라고 합니다.
        - NRU Metadata를 통해 Cache에서 Disk로 내려가게됩니다.
-  메모리 사용을 유지하기 위해 Couchbase는 주기적으로 `item pager`를 동작시킵니다.
    - bucket의 메모리 용량이 적정선을 넘어선다면?
        - 75% 이상인 경우 : hashtable을 스캔하여 최근 사용하지 않은 item들을 제거합니다.

- Couchbase는 TTL 기능을 제공합니다.
    - Expiration 문서는 Lazy합니다.
    - Server가 즉시 문서를 Disk에서 지우지 않습니다.
    - 대신에 60분마다 `expiry pager`라는 Task를 동작시켜 제거합니다.
    - `expiry pager`가 hashtable과 storage engine 에서 지우는 작업을 진행합니다.


- 데이터파일이 너무 커지고 모든 Disk를 사용하는 것을 예방하기 위해 Couchbase는 주기적으로 오래된 Data를 제거합니다.
## Reference
- <http://docplayer.net/10940906-Couchbase-server-under-the-hood.html>
