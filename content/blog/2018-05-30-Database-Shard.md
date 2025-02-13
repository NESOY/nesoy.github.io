---
title: Database의 샤딩(Sharding)이란?
tags:
  - Database
date: 2018-05-30
aliases: 
  - ../articles/2018-05/Database-Shard
---

![[Assets/logo/database.jpg]]


# 왜 샤딩(Sharding)이 필요할까요?
- 파티셔닝과 동일함으로 Link를 추가합니다. [Link](https://nesoy.github.io/articles/2018-02/Database-Partitioning)

## Vertical Partitioning

![[Assets/posts/20180222/6.png]]

- 도메인에 따라 쉽게 분리할 수 있습니다.
- 도메인에 영향을 많이 받기 때문에 대부분 `application level`에서 CRUD를 구현합니다.

# 샤딩(Sharding)이란?

![[Assets/posts/20180222/5.png]]

- 같은 테이블 스키마를 가진 데이터를 다수의 데이터베이스에 분산하여 저장하는 방법을 의미합니다.
- `application level`에서도 가능하지만 **database level**에서도 가능합니다.
- `Horizontal Partitioning`이라고 볼 수 있습니다.

## 샤딩(Sharding)을 적용하기에 앞서.
- 샤딩(Sharding)을 적용한다는것은?
    - 프로그래밍, 운영적인 복잡도는 더 높아지는 단점이 있습니다.
- 가능하면 Sharding을 피하거나 지연시킬 수 있는 방법을 찾는 것이 우선되어야 합니다.
    - `Scale-in`
        - Hardware Spec이 더 좋은 컴퓨터를 사용합니다.
    - Read 부하가 크다면?
        - `Cache`나 [Database의 Replication](https://nesoy.github.io/articles/2018-02/Database-Replication)을 적용하는 것도 하나의 방법입니다.
    - Table의 일부 컬럼만 자주 사용한다면?
        - `Vertically Partition`도 하나의 방법입니다.
        - Data를 Hot, Warm, Cold Data로 분리하는 것입니다. [Link](https://d2.naver.com/helloworld/526125)

## 샤딩(Sharding)에 필요한 원리
1. 분산된 Database에서 Data를 어떻게 Read할 것인가?
2. 분산된 Database에 Data를 어떻게 잘 분산시켜서 저장할 것인가?
    - 분산이 잘 되지 않고, **한 쪽으로 Data가 몰리게 되면 자연스럽게 Hotspot**이 되어 성능이 느려지게 됩니다.
    - 그렇기 때문에 균일하게 분산하는 것이 중요한 목표입니다.

## 샤딩(Sharding) 방법에 대해
> Shard Key를 어떻게 정의하느냐에 따라 데이터를 효율적으로 분산시키는 것이 결정됩니다.

### Hash Sharding

![[Assets/posts/20180530/1.png]]

- Shard Key : Database id를 Hashing 하여 결정합니다.
    - Hash크기는 Cluster안에 있는 Node개수로 정하게 됩니다.
- 아주 간단한 Sharding 기법입니다.

#### 단점은 없을까요?
- Cluster가 포함하는 Node 개수를 늘려보거나 줄여보면 어떨까요?
    - **Hash 크기**가 변하게 되고. **Hash Key** 또한 변하게 됩니다.
    - 그러면 기존에 있던 Hash Key에 따라 분배된 **Data 분산 Rule**이 다 어긋나게 되고.
    - 결국엔 **ReSharding**이 필요하게 됩니다.
- 짝수번째 Node에 큰 크기의 Data만 들어간다고 가정해보면 어떨까요?
    - Hash Key로 분산되기 때문에 공간에 대한 효율은 고려하지 않았습니다.

### Dynamic Sharding

![[Assets/posts/20180530/2.png]]

- Naming 그대로 Dynamic으로 바꿀 수 있다.
- Locator Service를 통해 Shard Key를 얻습니다.
- Cluster가 포함하는 Node 개수를 늘려본다면?
    - Locator Service에 Shard Key를 추가만 하면됩니다.
    - 기존의 Data의 Shard Key는 변경이 없습니다.
    - 확장에 유연한 구조입니다.
- Example
    - HDFS : [Name Node](http://blog.cloudera.com/blog/2012/03/high-availability-for-the-hadoop-distributed-file-system-hdfs/)
    - MongoDB : [ConfigServer](http://docs.mongodb.org/manual/core/sharded-cluster-config-servers/#sharding-config-server)

#### 단점은 없을까요?
- Data Relocation을 하게 된다면?
    - Locator Service의 Shard Key Table도 일치시켜줘야 합니다.
- Locator가 성능을 위해 Cache하거나 Replication을 하면 어떨까요?
    - 잘못된 Routing을 통해 Data를 찾지 못하고 Error가 발생합니다.
    - Locator에 의존할 수 밖에 없는 단점이 있습니다.

### Entity Group

![[Assets/posts/20180530/3.png]]

- 위의 Hash Sharding과 Dynamic Sharding은 Key-Value 형태를 지원하기 위해 나온 방법입니다.

#### Key-Value가 아닌 다양한 객체들로 구성된다면 어떨까요?
- 우리는 RDBMS의 join, index, transaction을 사용함으로써 Application의 복잡도를 줄이는 효과를 얻었습니다.
- 이와 유사한 방법으로 Sharding하는 방법이 Entity Group입니다.

#### 장점은 어떤게 있을까요?
- 하나의 물리적인 Shard에 쿼리를 진행한다면 효율적입니다.
- 하나의 Shard에서 강한 응집도를 가질 수 있습니다.
- 데이터는 자연스럽게 사용자별로 분리되어 저장됩니다.
- 사용자가 늘어남에 따라 확장성이 좋은 Partitioning입니다.

#### 단점은 없을까요?
- cross-partition 쿼리는 single partition 쿼리보다 consistency의 보장과 성능을 잃습니다.
    - 그렇기 때문에 이런 쿼리들이 자주 실행하지 않도록 만들어야 합니다.


## Pitfall에 대해
> Logical Shard는 반드시 Sigle Node안에 있어야 합니다.

![[Assets/posts/20180530/4.png]]

- Dynamic Sharding을 진행하게 된다면 작업량을 효과적으로 줄일 수 있습니다.
- HotSpot을 찾고 Sharding을 진행합니다.
- 지속적으로 Sharding을 진행하게 된다면 가장 오른쪽 Node만 Write을 진행하게 됩니다.
- 나머지 Node들은 Read Performance가 향상하는 효과를 얻을 수 있습니다.


## 정리하며
- Sharding을 피하는 방법을 우선 적용해보고 불가피하다면 적용하는게 좋습니다.
- 반드시 Trade-Off가 있습니다.
    - Locator와 Sync해야하는 비용이 필요합니다.
    - Cross-Partition Query가 발생할 경우 기존의 Query보다 느릴 수 있습니다.


## Reference
- <https://en.wikipedia.org/wiki/Shard_(database_architecture)>
- <https://medium.com/@jeeyoungk/how-sharding-works-b4dec46b3f6>
- <https://www.quora.com/Whats-the-difference-between-sharding-DB-tables-and-partitioning-them>

