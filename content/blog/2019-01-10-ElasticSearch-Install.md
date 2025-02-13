---
title: Elastic Search 설치하기
tags:
  - ElasticSearch
date: 2019-01-10
aliases: 
  - ../articles/2019-01/ElasticSearch-Install
---

![[Assets/logo/elastic.png]]

## Elastic Search 다운로드
- <https://www.elastic.co/kr/downloads>

![[Assets/posts/20190110/1.png]]
- DEB
    - 데비안 계열 Unix
- RPM
    - 레드햇 계열 Unix

### Elastic Search 실행파일
![[Assets/posts/20190110/2.png]]

- `elasticsearch`
    - 실행 Script
- `elasticsearch.in.sh`
    - ElasticSearch를 실행하기 위한 자바의 실행 변수에 대한 내용이 담긴 Script
- `elasticsearch.plugin`
    - 플러그인 설치를 위한 Script


### Elastic Search 실행
> bin/elasticsearch
- Option
    - `-d` : Elastic Search Background 실행
    - `-p 파일명` : Elastic Search의 프로세스 id를 파일명으로 지정된 파일에 저장

#### Background 실행
![[Assets/posts/20190110/3.png]]

#### Elastic Search Log 확인
![[Assets/posts/20190110/4.png]]

### Elastic Search 정보 확인
> curl -XGET http://localhost:9200
- Default Port : 9200

![[Assets/posts/20190110/5.png]]


### Background Elastic Search 종료
> kill PID

![[Assets/posts/20190110/6.png]]

#### 자주 사용하는 `kill -9`에 대해
- `kill -9`는 좋지 않습니다.
    - jvm shutdown hook 또는 spring @PreDestroy의 실행을 보장하기 힘듭니다.
- 권장 가이드
    - `kill -2 (SIGINT)`
    - `kill -15 (SIGTERM)`
- [Unix, Linux 에서 kill 명령어로 안전하게 프로세스 종료 시키는 방법](https://www.lesstif.com/pages/viewpage.action?pageId=12943674)
- [창천향로님 블로그 댓글, 내용에 언급](https://jojoldu.tistory.com/263)

### Elastic Process ID 저장
> bin/elasticsearch -d -p es.pid

![[Assets/posts/20190110/7.png]]


### [Elastic 실행 Option](https://www.elastic.co/guide/en/elasticsearch/reference/current/jvm-options.html)
```
/usr/bin/java
# JVM heap size
-Xms2g # 최소 메모리 2G
-Xmx2g # 최대 메모리 2G

# GC configuration
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=75
-XX:+UseCMSInitiatingOccupancyOnly

-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch -server
-Xss1m -Djava.awt.headless=true
-Dfile.encoding=UTF-8

# use our provided JNA always versus the system one
-Djna.nosys=true
-Djdk.io.permissionsUseCanonicalPath=true

# Netty Configuration
-Dio.netty.noUnsafe=true
-Dio.netty.noKeySetOptimization=true
-Dio.netty.recycler.maxCapacityPerThread=0

# log4j 2
-Dlog4j.shutdownHookEnabled=false
-Dlog4j2.disable.jmx=true
-Dlog4j.skipJansi=true

# Heap Dump
-XX:+HeapDumpOnOutOfMemoryError

# ElasticSearch 설치된 경로가 /elasticsearch-5.2.2임을 명시
-Des.path.home=/Users/nesoy/Downloads/elasticsearch-5.2.2

# ClassPath : 함께 실행할 자바 프로그램의 위치 설정하는 옵션
-cp /Users/nesoy/Downloads/elasticsearch-5.2.2/lib/elasticsearch-5.2.2.jar:/Users/nesoy/Downloads/elasticsearch-5.2.2/lib/* org.elasticsearch.bootstrap.Elasticsearch
-d -p es.pid
```

### [Elastic Log](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html)
![[Assets/posts/20190110/8.png]]

- `elasticsearch.log`
    - ElasticSearch 실행 로그
- `elasticsearch_index_search_slowlog.log`
    - 검색이 일정 시간 이상 소요됐을 때 느린 속도로 실행된 내용을 기록하는 로그
- `elasticsearch_index_indexing_slowlog.log`
    - 색인이 일정 시간 이상 소요됐을 때 느린 속도로 실행된 내용을 기록하는 로그
- `elasticsearch_deprecation.log`
    - 앞으로 종료될 기능에 대해 미리 관련정보를 기록하는 로그


### Elastic Data
![[Assets/posts/20190110/9.png]]

- 실제로 색인된 문서의 검색 데이터가 저장되는 공간
- 별도로 설정하지 않으면 Default Path로 `data`에 저장됩니다.
- Elastic Search와 데이터가 저장되는 저장소를 분리하는 것이 바람직


## Reference
- <https://book.naver.com/bookdb/book_detail.nhn?bid=8769630>
