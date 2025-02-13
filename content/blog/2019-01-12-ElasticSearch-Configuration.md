---
title: Elastic Search 설정
tags:
  - ElasticSearch
date: 2019-01-12
aliases: 
  - ../articles/2019-01/ElasticSearch-Configuration
---

![[Assets/logo/elastic.png]]

## [Elastic Search Config](https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html)
![[Assets/posts/20190112/1.png]]

### [`jvm.options`](https://www.elastic.co/guide/en/elasticsearch/reference/current/jvm-options.html)
- 자바 메모리 옵션은 메모리 용량이 변경되는 불필요한 오버헤드를 방지하기 위해
    - 최소 메모리와 최대 메모리를 동일하게 지정해서 사용하는 것을 권장
- 자바 Heap Memory Error가 발생하면 오류 내용을 heapdump.hprof와 같은 파일에 저장
    - Default HeapDump Path : Home
    - 수백MB ~ 수GB 정도로 용량이 크므로 넉넉한 용량을 가진 별도의 경로에 저장하는 것을 권장

### [`elasticsearch.yml`](https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html)
- `cluster.name`
    - Elastic Search Cluster : 각 노드가 연결된 전체 시스템
- `node.name`
    - 하나의 Node : 실행된 하나의 Elastic Search 프로세스
- `path.data`
    - data/ 데이터 파일 경로
    - `,`로 구분해서 여러 경로를 지정할 수 있다. 색인 된 데이터를 여러 개의 드라이브에 나눠서 저장
- `path.logs`
    - logs/ 로그 파일 경로
- `bootstrap.memory_lock`
    - ElasticSearch가 사용하고 있는 메모리 Lock
    - Swap을 방지할 수 있다.
    - 너무 많은 메모리를 Elastic Search 할당하지 않도록 적절한 조절이 필요.
    - 전체 메모리의 50%가 넘지 않도록 하는 것이 안정적
- `network.host`
    - ElasticSearch 내부/외부 IP 주소 모두 반영
- `http.port`
    - Default Port : 9200
    - ElasticSearch Port : 9200~9299
    - 다른 Node와 Binding되어 데이터 교환을 위해 통신하는 포트 : 9300~9399

#### Gateway
- ElasticSearch의 전체 Cluster의 상태를 저장하는 저장소
- Recovery
    - ElasticSearch의 전체 Cluster가 종료된 후 재실행 될 때 Gateway에 저장된 상태 값을 읽어 들여 노드와 인덱스 등에 대해 새로 설정하는 과정
- `gateway.recover_after_nodes`
    - 전체 Cluster가 재시작 되고 몇 개의 노드가 활성화됐을때 리커버리를 시작할지 설정한다.

#### Discovery
- 원격 네트워크에 있는 Node와의 Binding을 설정하는 데 필요하다.

#### Slow Log
- Query, Fetch, Indexing 활동에 대해 Slow Log를 남길 수 있다.
- `index.search.slowlog.threshold.(query,fetch,index).(warn,info,error)`
- Example
    - `index.search.slowlog.threshold.query.debug: 2s`
    - Query가 2초 이상 소요되었을때 Debug Level의 로그를 기록한다.

#### cluster 정보 확인
![[Assets/posts/20190112/2.png]]

> curl -XGET http://localhost:9200/_cluster/stats\?pretty=true

![[Assets/posts/20190112/3.png]]



### [`log4j2.properties`](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html)
- 클러스터명별로 설정된 로그 파일은 같은 설치 디렉터리에서 서로 다른 클러스터를 실행해도 로그 파일이 섞이지 않도록 방지하는 기능이 있다.



## Reference
- <https://blog.naver.com/PostView.nhn?blogId=indy9052&logNo=220948106201>
- <https://book.naver.com/bookdb/book_detail.nhn?bid=8769630>
