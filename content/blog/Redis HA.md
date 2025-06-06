---
aliases: [/articles/2020-05/Redis-HA]
comments: false
date: 2020-05-12
description: 
tags: [Redis]
title: Redis HA(RHA)에 대해
---
# Redis HA
- 모든 저장소가 그렇듯 Redis에서도 High Availability를 지원한다.
- Replication Node에서 Master 정보에 대해 추가하면 된다.

```shell
> replicaof 127.0.0.1 6001 # master ip / port
```

## 어떻게 Replication이 동작하는가?
![[assets/posts/img/2020-05-11-21-56-03.png]]

- `replicaof 명령어`를 받은 master 노드 A는 자식 프로세스를 만들어 백그라운드로 덤프파일을 만든다.
- 덤프 파일을 네트워크를 통해 Replica 노드인 B에 보낸다.
- 덤프 파일을 받은 노드 B는 데이터를 메모리로 로드한다.

## 문제는 없을까?
- in-memory 저장소라서 Redis 프로세스가 다운되면 메모리 내에 저장됐던 데이터는 유실된다.
- Replica 노드를 master로 승격해서 사용해야 하는데 이 과정은 아래와 같다.
    - Replica 노드에서 `replicaof NO ONE` 커맨드를 통해 master 연결 해제
    - 어플케이션 코드에서 레디스 연결 설정을 변경 (master -> replica)
    - 배포
- 이를 간단하고 빠르게 해결하기 위해 등장한 기술이 sentinel이다.

# [Sentinel](https://redis.io/topics/sentinel)
- master, replica 노드를 모니터링하고 문제가 생기는 경우 자동 fail-over를 진행한다.
- notification 설정하는 것도 가능하다.
- 최소 세 개의 Sentinel 인스턴스가 필요하다.
    - master를 선정하는 과정에서 투표하는 과정을 거치기 때문
- 어플리케이션은 master - replica에 연결되는 것이 아니라 `sentinel`에 연결한다.
- 실행하는 방법은 다음과 같다.
```shell
redis-sentinel /path/to/sentinel.conf
redis-server /path/to/sentinel.conf --sentinel
```

## 아래의 구조로 Sentinel을 구성하면 어떨까?
- master와 2개의 replica
    - 각각 서버에 sentinel을 포함한다.
- 네트워크가 이상이 없을때는 문제가 없다.

```
       +----+
       | M1 |
       | S1 |
       +----+
          |
+----+    |    +----+
| R2 |----+----| R3 |
| S2 |         | S3 |
+----+         +----+

Configuration: quorum = 2
```

- 네트워크가 끊어지는 경우 과반수로 결정할 수 없는 상황이 발생하기 때문에 추천하지 않는다고 한다.

```
         +----+
         | M1 |
         | S1 | <- C1 (writes will be lost)
         +----+
            |
            /
            /
+------+    |    +----+
| [M2] |----+----| R3 |
| S2   |         | S3 |
+------+         +----+
```

## Sentinel, Master, Replica 모두 분리하는 상황

```
            +----+         +----+
            | M1 |----+----| R1 |
            |    |    |    |    |
            +----+    |    +----+
                      |
         +------------+------------+
         |            |            |
         |            |            |
      +----+        +----+      +----+
      | C1 |        | C2 |      | C3 |
      | S1 |        | S2 |      | S3 |
      +----+        +----+      +----+

      Configuration: quorum = 2
```

# [Redis Cluster](https://redis.io/topics/cluster-tutorial)
- 많은 데이터와 높은 TPS를 필요하다면 Cluster를 고려해볼만 하다.
- 최소 3 개의 Master 노드가 필요하다.
- 샤딩으로 모든 데이터를 노드에 맞게 분배하여 저장한다.
- 각 노드는 16384개의 슬롯을 가지고 있다.
- Sentinel 프로세스 대신 레디스 Node 끼리 모니터링한다.
- 샤딩키를 잡기 위해서는 [Consistent Hashing](https://brunch.co.kr/@springboot/258)을 사용한다.
    - [Reference - Consistent Hashing](https://www.popit.kr/consistent-hashing/)

![[assets/posts/img/2020-05-12-23-01-36.png]]

## 사용자는 어느 노드에 데이터가 있는지 없는지 알 수 있을까?
- Redis 특정 노드에 데이터를 찾았을 때 데이터가 없는 경우
    - Client에게 Redirect 결과를 반환한다.
    - Client는 Redirect된 Node로 다시 결과를 요청한다.
    - Client에서 Redirect 처리가 안되어있다면 데이터를 찾을 수 없다.
        - Client에 의존적이다.

- `Couchbase`에서는?
    - Client쪽에서 Shard Info 정보를 들고 있어 실제로 바로 데이터가 담긴 Node로 요청하는 방법이 있다.
    - 아마도 Redis Client쪽에서 Cache를 들고 있지 않을까?

## Failover
- Coordinator 기반 Failover
    - Zookeeper, consul등의 Coordinator
    - 개발이 필요하지만 관리 비용은 낮은 장점이 있다.
- VIP / DNS 기반 Failover
    - 각 Layer DNS 캐시를 주의하며 사용하자.
- Redis Cluster 사용

# Reference
- <https://meetup.toast.com/posts/226>
- <https://brunch.co.kr/@springboot/218>
