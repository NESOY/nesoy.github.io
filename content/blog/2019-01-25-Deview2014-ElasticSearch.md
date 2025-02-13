---
title: Deview 2014 - Elastic Search 성능 최적화
tags:
  - ElasticSearch
date: 2019-01-25
aliases: 
  - ../articles/2019-01/Deview2014-ElasticSearch
---

![[Assets/logo/elastic.png]]

## ElasticSearch 이해와 성능 최적화 - 정호욱님
### ElasticSearch 이해
#### ElasticSearch란?
- Lucene 기반의 오픈 소스 검색엔진

#### ElasticSearch 특징
- Easy
- Real time search & analytics
- Distributed & highly available search engine

#### ElasticSearch 구성
- physical
    - cluster -> Node -> Indice -> Shard
- logical
    - Index -> Type -> Document -> field : value

#### ElasticSearch Nodes
- Master Node
    - `node.master: true`
- Data Node
    - 검색과 색인 모두 처리
    - `node.data: true`
- Client Node
    - REST API, Load 분산
    - `node.client: true`

#### ElasticSearch Node 구성 예
- All Round Player
    - Master, Data Node 상관없이 진행
- Master - Data 분리
    - Master, Data 역할을 분리하면?
        - Master에 고사양 컴퓨터를 배치안해도 되는 장점.
- Master, Data, LoadBalancer
    - 보안을 더 강화할 수 있다.

#### ElasticSearch Shard replication

![[Assets/posts/20190125/1.png]]

- Primary Shard를 먼저 생성 후 Replication Shard 생성
- Replication Shard가 많으면 검색 성능이 향상
- Primary Shard는 초기 셋팅하면 변경 불가능
    - Replication Shard는 셋팅 후 변경해도 변경 가능



![[Assets/posts/20190125/2.png]]

- Hash Partitioning으로 문서를 찾는 구조.
- 요청을 받은 Node는 요청 Shard를 가진 Node에게 일을 위임

![[Assets/posts/20190125/3.png]]
- Retrieve
    - `_id`로 문서를 가져오는 방식
- Query & Fetch
    - Query & Fetch 요청이 들어오면 원하는 문서가 어느 Node에 있는지 모르기에 모든 Node에 요청을 보냄
    - 다른 Node들의 결과값을 수집하여 요청받았던 Node가 결과값을 합치고 정렬, Ranking을 진행하여 결과값 반환

### Modeling하기
#### Indice/Type Design
- Time-based / User-based data
- Relation Data

#### Field Design
- 검색 대상 필드
- 분석 대상 필드
- 정렬 대상 필드
- 저장 대상 필드
- Primary Key 필드
    - Hashing으로 진행하기 때문에 특정 Shard에 데이터가 몰릴 위험성이 있다.
    - 꼭 테스트를 진행해보고 결과 확인하기

#### Shard Design
- number of shards >= number of data nodes
- number of replica <= number of data nodes - 1

#### Shard sizing
> 정답은 아니고 참고용으로만 사용

- Index당 최대 Shard 수 : 200개 이하
- Shard 하나 당 최대 크기 : 20~50GB
    - 너무 크면 관리하기도 복구하기도 어렵다.

### ElasticSearch 성능 최적화 이해
#### 장비 관점
- Network bandwith
- Disk I/O
- RAM
- CPU Cores

#### 문서 관점
- Document Size
- Total Index Data Size
- Data Size increase
- Store period

#### 서비스 관점
- Analyzer
- Analyze fields
- Indexed field size
- Boosting
- Realtime or batch
- Querying

#### 어떻게 하면 전체 Node를 테스트 할 수 있을까?
- Production 서버와 동일한 하나의 서버를 구성
- Production과 동일한 하나의 Index
- 하나의 Shard, Replica 셋팅은 하지 않고
- 하나의 Index에 Indexing Stress Test를 진행하여 나온 결과를 바탕으로
- Production 전체의 Performance를 추정 및 Cluster 구성하기
- 주의해야 할 점
    - Indexing 중심으로 Cluster를 구성하면 검색성능이 나오지 않는다.
    - 무조건 Shard를 늘린다고 검색성능이 나오지 않는다.

#### 운영체제 관점
- File Descriptor
    - 32K, 64K로 늘린다.
    - File 기반으로 Index를 진행하기에 충분한 크기가 필요
- Swap을 피해야 한다.

#### 검색엔진 관점
- Swap을 피해야 한다.
- Thread pool
    - Client : Connection Pool
    - Server : Request단위에 대한 Pool
- Segment Merge
    - 색인 성능 향상 부분에서는 크게 상관이 없다.
    - 검색과 색인 동시에 운영할 때 정책을 잘 정해야 한다.
- Index Buffer size
    - 전체 Heap Size의 10%
    - Shard 별로 1/n 크기로 나눠가진다. // 최대 512MB
- Storage device
    - SSD 추천 -> Segment Merge를 병렬 처리가능

#### Cluster Restart 관점
- Restart를 하면?
    - Shard Rebalancing이 발생
    - Segment Merge
    - Optimize (max segments:5)
- 자주 사용하지 않는 Index는 Close하는게 좋다.
- 재시작하기 전에 `disable_allocation:true`로 설정하는게 좋다.
    - 재시작이 완료되면 다시 설정을 바꾸어서 allocation 진행
- recovery limit 키워서 Buffer 제공

#### 색인 최적화
- `_all` Disable
    - 모든 필드를 분석한 결과를 저장하기 때문에 성능에 영향
- `_source` 가능하면 Disable
    - 분석작업은 하지 않고 Store 작업만 진행
- `_id` 제대로 구성하기
- `store` Disable
    - `_source`를 사용하면 store는 하지 않는 것을 추천

#### Client
- Bulk API를 사용한다.
- Hardware 성능을 점검
    - Core 수, Memory, Disk I/O
- Exception을 확인
    - Too Many, Reject 옵션 확인하기
- Optimize 대신 Flush와 Refresh를 활용한다.

#### Bulk Indexing
- Request당 크기는 5~15MB
    - Indexing하면 실제 2배에서 3배로 증가
- Request당 문서 크기는 1000 ~ 5000개
    - Small 사이즈로 여러 번 던지는게 더 좋다.
- Server Bulk Thread Pool 크기는 Core size * 5보다 작거나 같게 설정
- Client Bulk Connection Pool 크기 3~10개 * number_of_data_nodes
- Client Ping Timeout 30~90초
- Client node Sampler interval 30 ~ 90초
- Client transport sniff = `true`
- Client network TCP blocking = `false`
- Disable Refresh_interval
- Disable Replica
    - Disk I/O가 엄청나게 발생

#### Bulk Indexing Flow

![[Assets/posts/20190125/4.png]]

#### Shards
- Data 분산을 위해 Shard 수를 늘린다
    - Shard 수가 증가하면 indexing을 빠르게 진행되지만 검색 성능 저하
    - Shard 수, 검색 성능은 Trade-off 관계
- Replica Shard 수를 늘린다.

#### Data Distribution
- Use Routing
- Check id
    - ShardID = hash(id) % number of primary shards

#### Query
- 항상 같은 node로 Query Hitting이 되지 않도록 한다.
- Zero hit query를 줄여야 한다.
- Query 결과를 Cache한다.
- Avoid Deep Pagination
    - Sorting: number_of_shard * (from + size)
    - 1000개의 문서를 요청하면 모든 Node에 1000개의 문서를 요청, Sorting하는 불필요함이 발생

#### Search Type
- Query and fetch
    - Score, Ranking작업을 진행하지 않는다.
- Query then fetch
    - Score, Ranking작업을 진행하기에 속도가 느림

#### Query 최적화
- Query 대신 filtered Query와 filter를 사용한다.
- And/or/not filter 대신 bool filter를 사용한다.


## Slide
<iframe src="//www.slideshare.net/slideshow/embed_code/key/eIDk6BbcjteKOq" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

## Reference
- <https://deview.kr/2014/session?seq=43>
- <https://www.slideshare.net/deview/2d1elasticsearch>
