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

![](/assets/posts/img/2020-07-10-16-12-39.png)

- Client가 Hbase에게 데이터 변경(Put, Delete Operation)을 요청하면 특정 Region Node의 WAL 파일안에 WALEdit 형태로 Operation이 기록된다.
    - WALEdit이란?
        - 하나의 Transaction을 나타내는 Object
        - 하나 이상의 변경 작업을 가지고 있을 수 있다.
    - WAL 파일들은 설정된 시간(기본적으로 60분 마다) 이후에 지속적으로 계속 변경되므로, 특정 시간에 하나의 Region 서버에는 오직 하나의 WAL 파일만 존재한다.
    - 변경되는 Cell이 Replication 범위에 해당하는 경우 Replication Queue에 추가하게 된다.
    - 변경된 사항은 Source Cluster의 UUID 정보를 추가한다. 버퍼에 추가된다.
        - 버퍼가 채워지거나 Reader가 파일 끝까지 읽을 경우, Destination Cluster에 Random으로 Region에 보내게 된다.
    - Region Server는 순차적으로 읽으며 다 읽으면 Table로 Flushing한다.
        - 부여된 UUID를 확인하여 Cluster간의 Replication Loop를 방지할 수 있다.
    - Source Cluster는 WAL의 Offset을 ZooKeeper를 통해 등록하고 관리한다.


![](/assets/posts/img/2020-07-10-15-37-28.png)

- WAL에 저장한 이후 Region의 Memstore에 저장하고 클라이언트에게 성공 응답을 보낸다.
    - Memstore란?
        - 메모리 기반의 저장소
        - 나중에 Flush라는 작업을 통해 Disk에 Write한다.

![](/assets/posts/img/2020-07-10-15-40-45.png)


- Source Cluster에 있는 WAL 파일안의 WALEdits(WAL에 쓰여져 있는 변경 기록들)을 재현함으로써 수행된다.
- 이 WALEdits들은 Slave Cluster의 Region 서버들로 전송되고, 필터링 후에(어떤 변경 기록들은 리플리케이션이 되지 않는 범위일 수 있습니다.)
- WAL 리더가 현재 WAL 파일의 끝에 다다르면, 그 때 까지 읽은 WALEdits를 전송하려고 준비할 것입니다. 리플리케이션이 비동기 모드를 이용하므로,  수 분을 소모하는 무거운 헤비 어플리케이션에서는 마스터에 비해서 복제가 느릴 수 있습니다.


#### ClusterId(UUID)이란?
- 모든 HBase Cluster는 UUID 형태로 HBase에 의해 자동으로 생성된 ClusterId를 가지고 있다.
- ClusterId는 Restart시 바뀌지 않기 의해서 파일시스템에 저장됩니다. 그리고 zookeeper의 /hbase/bhaseid znode 에 저장됩니다.
- 그리고 마스터/마스터 acyclic 리플리케이션에 이용됩니다. WAL은 Region 서버안에 저장된 Region 들의 변경정보를 가지고 있습니다.
- 리플리케이션 코드는 리플리케이션 범위안에 있는 모든 key/value 에 대해서 읽어들이고 필터링합니다.
- key/value 에 있는 컬럼 패밀리 속성 값을 읽고, 이것을 WALEdit 의 컬럼 패밀리 맵 데이터 구조체와 비교하므로써 해당 작업을 수행합니다.
    - 리플리케이션해야 하는 범위에 포함된 key/value의 경우에는, key/value의 clusterId 값을 해당 HBase ClusterId 값으로 수정합니다.


ReplicationSource
ReplicationSource는 Region 서버 프로세스 안에 있는 자바 스레드 객체로써, WAL 정보를 지정된 슬레이브 클러스터로 복제하는 작업을 하게 됩니다. 이것은 리플리케이션되어야 하는 로그 파일을 담고 있는 우선 순위 큐를 가지고 있습니다. 로그가 처리되는 만큼, 큐에서는 제거됩니다. 우선 순위 큐는 로그 파일이 생성된 시간(로그 파일에 추가된 시간)을 기준으로 비교합니다. 그래서 생성된 시간의 순서와 같은 순서로 처리되게 됩니다.( 오래된 로그가 먼저 처리됩니다. ) 우선 순위 큐에 오직 하나의 로그 파일만 있다면,  그것은 현재 WAL을 의미하므로, 지워지지 않을 것입니다.

## Reference
- <https://hbase.apache.org/book.html#_cluster_replication>
- <https://charsyam.wordpress.com/2012/08/05/%EB%B0%9C-%EB%B2%88%EC%97%AD-hbase-replication-overview/>
- <https://charsyam.wordpress.com/2012/08/22/%eb%b0%9c-%eb%b2%88%ec%97%ad-hbase-replication-operational-overview/>
- <https://community.cloudera.com/t5/Support-Questions/HBase-Active-Active-writes-collision/td-p/138622>
- <https://mapr.com/blog/in-depth-look-hbase-architecture/>