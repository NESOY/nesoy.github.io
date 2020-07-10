## Hbase Replication에 대해
- Source(Master) Cluster Push 방식으로 동작한다.
- 데이터 동기화를 위해 WAL(write-ahead log)를 사용하고 있다.
- Replication은 기본적으로 비동기로 동작한다.
    - 비동기로 동작하여 완벽한 동기화는 지원할 수 없다.
    - Replication의 Goals는 eventual consistency을 지향하고 있다.

- 데이터가 Source Cluster에서 Destination Cluster로 Replication될 때
    - 데이터에 Cluster ID를 부여하여 replication 순환을 방지한다.

The WALs for each region server must be kept in HDFS as long as they are needed to replicate data to any slave cluster.
Each region server reads from the oldest log it needs to replicate and keeps track of its progress processing WALs inside ZooKeeper to simplify failure recovery.
The position marker which indicates a slave cluster’s progress, as well as the queue of WALs to process, may be different for every slave cluster.


- 각 Region Server는 각자의 WAL(HLog)을 가지므로 이 패턴은 단 하나의 이진 로그만 추적하면 되는 MySQL의 마스터 / 슬레이브 복제 같은 다른 유명한 방식처럼 현재 복제가 진행 중인 데이터를 추적하기 훨씬 쉽다.
- 그리고 마스터 클러스터 하나에서 얼마든지 많은 슬레이브 클러스터로 복제할 수 있고, 리전 서버 각자가 변경 사항을 복제하는 작업을 수행한다.

- 레플리케이션은 비동기적으로 수행되므로, Slave Clustering에 데이터가 바로 반영이 안된 경우도 존재한다.
- Zookeeper에 HLog 위치를 기록한다.


#### Metric
164.6. Replication Metrics
The following metrics are exposed at the global region server level and at the peer level:

source.sizeOfLogQueue
number of WALs to process (excludes the one which is being processed) at the Replication source

source.shippedOps
number of mutations shipped

source.logEditsRead
number of mutations read from WALs at the replication source

source.ageOfLastShippedOp
age of last batch that was shipped by the replication source

source.completedLogs
The number of write-ahead-log files that have completed their acknowledged sending to the peer associated with this source. Increments to this metric are a part of normal operation of HBase replication.

source.completedRecoverQueues
The number of recovery queues this source has completed sending to the associated peer. Increments to this metric are a part of normal recovery of HBase replication in the face of failed Region Servers.

source.uncleanlyClosedLogs
The number of write-ahead-log files the replication system considered completed after reaching the end of readable entries in the face of an uncleanly closed file.

source.ignoredUncleanlyClosedLogContentsInBytes
When a write-ahead-log file is not closed cleanly, there will likely be some entry that has been partially serialized. This metric contains the number of bytes of such entries the HBase replication system believes were remaining at the end of files skipped in the face of an uncleanly closed file. Those bytes should either be in different file or represent a client write that was not acknowledged.

source.restartedLogReading
The number of times the HBase replication system detected that it failed to correctly parse a cleanly closed write-ahead-log file. In this circumstance, the system replays the entire log from the beginning, ensuring that no edits fail to be acknowledged by the associated peer. Increments to this metric indicate that the HBase replication system is having difficulty correctly handling failures in the underlying distributed storage system. No dataloss should occur, but you should check Region Server log files for details of the failures.

source.repeatedLogFileBytes
When the HBase replication system determines that it needs to replay a given write-ahead-log file, this metric is incremented by the number of bytes the replication system believes had already been acknowledged by the associated peer prior to starting over.

source.closedLogsWithUnknownFileLength
Incremented when the HBase replication system believes it is at the end of a write-ahead-log file but it can not determine the length of that file in the underlying distributed storage system. Could indicate dataloss since the replication system is unable to determine if the end of readable entries lines up with the expected end of the file. You should check Region Server log files for details of the failures.

## Reference
- <https://hbase.apache.org/book.html#_cluster_replication>
- <https://charsyam.wordpress.com/2012/08/05/%EB%B0%9C-%EB%B2%88%EC%97%AD-hbase-replication-overview/>
- <https://charsyam.wordpress.com/2012/08/22/%eb%b0%9c-%eb%b2%88%ec%97%ad-hbase-replication-operational-overview/>