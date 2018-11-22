---
layout: post
title: Couchbase는 어떻게 동작하는가?
categories:
  - Couchbase
excerpt: ' '
tags:
  - Couchbase

date: 2018-11-20
---

![No Image](/assets/logo/couchbase.png)


## High - Level Deployment Architecture

![No Image](/assets/posts/20181120/1.png)

- Couchbase는 JSON 문서, Binary Data를 저장할 수 있습니다.

### Bucket & vBucket
- 문서는 bucket이라고 불리는 Data Container에 저장을 하게 됩니다.
    - Bucket은 논리적인 Container입니다.
- 각각의 bucket은 논리적인 1024개의 vBucket으로 구성되어 있습니다.
    - 1024개의 vBucket은 Cluster와 Mapping 정보를 가지고 있습니다.

![No Image](/assets/posts/20181120/2.png)

- CRC32 Hash Function을 사용하여 해당 Cluster 정보를 얻습니다.
    - 해당 Cluster를 통해 문서를 Couchbase에 저장하게 됩니다.

- [vBucket - ver 5.5](https://docs.couchbase.com/server/5.5/understanding-couchbase/buckets-memory-and-storage/vbuckets.html)


## Client Architecture
- Client는 cluster Map을 통해 Cluster 정보를 관리하고 있습니다.
- Cluster map을 통해 적절한 서버에 요청을 보냅니다.
- Client가 cluster와 처음으로 connection을 맺은 이후
    - 갱신된 Cluster Map을 통해 요청을 보냅니다.
    - connection을 유지합니다.
- 모든 Couchbase의 Cluster와 Client은 Cluster Map을 공유를 하게 됩니다.

### Data flow - Client

![No Image](/assets/posts/20181120/3.png)

1. 사용자가 document를 변경하는 행위를 취합니다.
2. Application은 Set Operation을 실행합니다.
3. Couchbase Client는 문서 Key Hashing값을 통해 문서를 저장할 Server를 찾습니다.
4. Couchbase Server는 문서를 복사하고 Memory에 Caching합니다. 그리고 비동기적으로 Disk에 저장하게 됩니다.

### Data flow - Server
- Couchbase Server는 문서 단위로 변경이 발생합니다.
- 다음은 Couchbase Server가 문서를 작성하는 과정입니다.

![No Image](/assets/posts/20181120/4.png)

1. 모든 Server는 각각의 Object를 관리할 cache를 가지고 있습니다.
- 클라이언트는 문서를 Cache에 작성하고 서버는 클라이언트에게 Confirm 메시지를 보냅니다.
- 클라이언트는 기본적으로 서버가 persist Level과 문서를 Replication하는 것을 기다리지 않게 설계되었습니다.
- 이 모든 행위는 비동기적으로 이뤄집니다.
- Client SDK를 사용한다면 기다릴 수 있도록 설계를 변경할 수 있습니다.

2. 저장할 문서는 intra-cluster의 다른 서버들이 추가적으로 복사되기 위해 replication Queue에 추가됩니다.
3. 문서는 또한 Disk Write Queue에 추가되며 비동기적으로 persist하게 Disk에 작성합니다.
4. Disk에 작성이 완료된 문서는 XDCR 또는 Index 작업을 진행합니다.



### Data Manager
![No Image](/assets/posts/20181120/5.png)

- Data manager는 Application의 데이터의 저장과 조회에 응답해주는 역할입니다.
- 구성요소
    - Object-Managed Cache
    - Storage Engine
    - Query Engine

#### Object-Managed Cache
- 모든 Couchbase Server는 Multi Threaded로 이루어진 Object-Managed Cache를 가지고 있습니다.
- 메모리기반으로 접근하기 때문에 빠른 응답을 기대할 수 있습니다.

![No Image](/assets/posts/20181120/6.png)

- HashTable은 Couchbase의 partition들의 정보를 가지고 있습니다.
- Hashtable 정보는 파티션안에 있는 각각의 문서의 Document ID, 메타데이터를 동기화 하고 있습니다. 상황에 따라 Content를 가지고 있는 경우도 있습니다.
    - 가끔은 document Content의 Cache 역할도 진행하게 됩니다.
- 데이터를 읽을때 hashtable을 통해 Memory부터 찾고 없는 경우 Disk에서 읽어오는 Process입니다.
    - 서버는 최근 24시간동안 document Access log file을 작성하게되며
    - 만약 서버를 재시작하게되면 access log를 읽어 memory에 최근 읽었던 document 정보를 올리는 과정을 warmup이라고 합니다.
- 각각의 Hashtable은 여러 개의 thread를 통해 read와 write를 진행하게 됩니다.
- Worker Thread가 Hashtable에 접근하기 전에 lock과정이 필요합니다.
    - 각각의 hashtable은 multiple lock을 가지고 있습니다.
    - hashtable의 section 단위로 lock을 진행합니다.
- 문서의 변화를 추적하기 위해 Couchbase는 checkpoints라는 자료구조를 사용하고 있습니다.
    - linked list를 사용하여 문서의 변화를 기록하고
    - Storage engine이나 replication하는 과정에 필요합니다.
-
## Reference
- <http://docplayer.net/10940906-Couchbase-server-under-the-hood.html>
- <http://bcho.tistory.com/934?category=534534>