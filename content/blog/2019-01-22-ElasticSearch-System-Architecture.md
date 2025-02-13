---
title: Elastic Search 시스템 구조
tags:
  - ElasticSearch
date: 2019-01-22
aliases: 
  - ../articles/2019-01/ElasticSearch-System-Architecture
---

![[Assets/logo/elastic.png]]

## Cluster와 Node
- 하나의 Cluster는 여러 개의 Node로 구성
- 클러스터명만 같게 유지하고 프로세스만 실행하면 시스템의 확장이 가능

### Node 종류는?
- Master Node
    - 전체 Cluster의 상태에 대한 Meta 정보를 관리하는 Node
    - 기존 Master Node가 종료되면 새로운 Master Node가 선출
    - `node.master`를 false로 하면 Master Node에서 제외
- Data Node
    - 색인된 데이터를 실제로 저장하는 Node
    - `node.data` 속성을 false로 지정하면 해당 Node는 데이터를 저장하지 않는다.
- 10개 이상의 Node로 구성된 Cluster인 경우 Master 전용 Node와 Data 전용 노드를 분리하는 것이 좋다.
- Master Node가 아니며 Data Node가 아닌 Node도 존재 가능
    - 색인과 검색을 위한 명령과 결과를 전달하는 역할로만 존재
    - HTTP Port차단하여 데이터 저장하는 역할만 전담.

### Example - Node Binding
- Cluster 이름이 동일해야 Binding이 진행됩니다.

#### 아래와 같은 이슈로 Node가 Binding이 되지 않는다면?
```shell
[es-master] failed to send join request to master
[{es-master}{KTKlgNlqllbkaw}{7QMJWBW40MIw}{192.168.0.10}{192.168.0.10:9300}{ml.max_open_jobs=10, ml.enabled=true}],
reason [RemoteTransportException[[es-master][192.168.0.10:9300][internal:discovery/zen/join]];
nested: IllegalArgumentException[can't add node {es-master}{KTKlgNlqllbkaw}{7QMJWBW40MIw}{192.168.0.11}{192.168.0.11:9300}
```

- elasticsearch의 `path.data`에 기존의 Node 정보로 인한 오류발생
- 기존의 Node 정보를 제거하거나 재설치하면 문제해결이 가능합니다.


#### Binding된 모습
![[Assets/posts/20190122/1.png]]

- WARNING `discovery.zen.minimum_master_nodes`가 너무 작은게 원인

### [Split Brain이란?](https://www.elastic.co/guide/en/elasticsearch/reference/6.1/modules-node.html#split-brain)
> `discovery.zen.minimum_master_nodes` 설정할 때 발생할 수 있는 이슈

![[Assets/posts/20190122/2.png]]

- 마스터 후보 노드(master eligible node) 사이에 네트워크가 단절되었을 때
    - 각각의 마스터 후보 노드가 마스터 노드로 승격하여 두 개의 클러스터로 나뉘어 독립적으로 동작하는 현상
- 양쪽 클러스터에서 각각 데이터 업데이트가 이루어지면 나중에 네트워크가 복구되어도?
    - 각각 마스터가 따로 존재하기 때문에 따로 운영되어 데이터 비동기 문제로 데이터의 손실 발생.

![[Assets/posts/20190122/3.png]]

- 마스터 기능의 수행이 가능한 후보(master-eligible) 노드를 3(또는 그 이상의 홀수)개를 두어 Split Brain을 예방
    - `discovery.zen.minimum_master_nodes`설정 : (master_eligible_nodes / 2) + 1



## Shard와 Replica
### Shard란?
- Apache Lucene에서 사용되는 메커니즘으로 데이터 검색을 위해 구분되는 최소의 단위
- 사용자는 Index 단위로 데이터를 처리
    - Shard는 ElasticSearch가 직접 노드로 분산시키는 작업
- Primary Shard
    - 처음 색인되는 Shard
- Replica Shard
    - 데이터 손실 방지 목적
    - Primary Shard와 Replica를 동시에 검색해서 더 빠르게 데이터를 찾을 수 있다.
- Shard와 Replica의 개수는 Node 수와 데이터 용량을 고려해 적절하게 조절하는 것이 좋다.

## Zen Discovery
- Multicast보다는 Unicast를 권장
- Binding하는 node는 Elastic Version이 반드시 같아야 한다.
```shell
discovery.zen.ping.multicast.enabled: false
discovery.zen.ping.unicast.host: ["192.168.1.10", "192.168.1.11"]
```

## [Hot-warm Architecture](https://www.elastic.co/blog/hot-warm-architecture)

![[Assets/posts/20190122/4.png]]

### Master nodes
- Cluster당 3개의 Master Node를 구성하면 다른 유형의 Node의 GC영향을 받지 않으므로 안정성과 복구를 높일 수 있다.
- Master Node는 요청을 처리하지 않고 데이터를 보유하지 않으므로 CPU, RAM 및 디스크와 같은 적은 리소스만 사용한다.

### Hot data nodes
- 클러스터 내에서 모든 인덱싱을 수행하도록 설계되었으며 일반적으로 쿼리 빈도가 가장 높은 가장 최근의 일일 인덱스도 보유하게 된다.
- Indexing이 매우 높은 IO가 필요한 Node이기 때문에 Hot data Node서버는 SSD 스토리지를 권장한다.

### Warm data nodes
- 자주 Query되지 않는 대량의 읽기나 자주 접근하지 않는 인덱스를 처리하도록 설계
- Index는 읽기 전용이므로 빠르고 비싼 SSD 대신 SATA 스토리지를 권장한다.

## Reference
- <https://book.naver.com/bookdb/book_detail.nhn?bid=8769630>
- <https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html#split-brain>
- <https://brunch.co.kr/@alden/34>
- <http://kimjmin.net/2018/01/2018-01-build-es-cluster-3/>
- <https://www.elastic.co/pdf/architecture-best-practices.pdf>
