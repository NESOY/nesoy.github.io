---
aliases: [/articles/2020-05/Redis]
comments: false
date: 2020-05-06
description: 
tags: [Redis]
title: Redis
---
# Redis
- `Remote Dictionary Server`
- 모든 데이터를 메모리에 저장하고 조회
- 다양한 자료구조를 지원
- 싱글 Thread로 동작하는 서버로 Atomic하게 동작

## Getting Started
- <https://redis.io/topics/quickstart>

### Install Redis in CentOS 7
- https://linuxize.com/post/how-to-install-and-configure-redis-on-centos-7


} <!-- QZ -->
### Install Redis in Docker

```bash
docker pull redis
docker run --name myredis -d -p 6379:6379 redis
```

#### Redis 동작하는지 확인하기
- `brew install redis-cli` 설치하기

```bash
redis-cli ping
PONG
```

### Redis 접근하기
- `redis-cli`를 치면 로컬호스트로 접근한다.

### 간단한 String 저장해보기
```bash
❯ redis-cli
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> get hello
"world"
```

## Redis Collections
- [String](https://redis.io/commands#string)
    - Key를 어떻게 할 것인가?
    - Key에 따라서 분산이 결정되기 때문에 상황에 고려해서 설계하기

```bash
# single
SET <KEY> <VALUE>
GET <KEY>

# multi
MSET <KEY1> <VALUE1> <KEY2> <VALUE2>
MGET <KEY1> <KEY2>
```

- [List Commends](https://redis.io/commands#list)
    - 중간 insert 복잡도가 높다.
    - [Twitter의 Timeline Cache](https://www.infoq.com/presentations/Real-Time-Delivery-Twitter/)

```bash
# PUSH
LPUSH <KEY> <A> # (A)
RPUSH <KEY> <B> # (A, B)
LPUSH <KEY> <C> # (C, A, B)
RPUSH <KEY> <D, A> # (C, A, B, D, A)

# POP
LPOP <KEY> # C, (A, B, D, A)
RPOP <KEY> # A, (A, B, D)
RPOP <KEY> # D, (A, B)

# 컬렉션중에 최근에 쓰여진 데이터를 조회, 없다면
# > 데이터를 Push하기 전까지 대기, Timeout 존재
BLPOP
BRPOP
```

- [Set Commends](https://redis.io/commands#set)
    - 데이터가 있는지 없는지 체크하는 용도

```bash
# ADD
SADD <KEY> <VALUE>

# 모든 Value를 돌려줌
SMEMBERS <KEY>

# Value가 존재하면 1, 없으면 0
SISMEMBER <KEY> <VALUE>
```

- [Sorted Set Commends](https://redis.io/commands#sorted_set)
    - 정렬된 Set

```bash
# Value가 이미 Key에 있으면 해당 Score로 변경된다.
ZADD <KEY> <SCORE> <VALUE>

# Score 범위에 포함되는 값들을 모두 돌려줌
# ZRANGE key 0 -1 > 모든 범위 값 가져온다.
# score는 정수형이 아님, 실수형이기 때문에 값이 정확하지 않을 수 있다
ZRANGE <KEY> <START_INDEX> <END_INDEX>

# Score 기준으로 역으로 정렬하여 반환
ZREVRANGE
# 5 < score < 10
ZRANGEBYSCORE zset (5 (10
# 5 < score <= 10
ZRANGEBYSCORE zset (5 10
# 무한대 표현
ZRANGEBYSCORE myzset -inf +inf
```

- [Hash Commends](https://redis.io/commands#hash)

```bash
# single
HSET <KEY> <SUBKEY> <VALUE>
HGET <KEY> <SUBKEY>

# multi
HMSET <KEY> <SUBKEY1> <VALUE1> <SUBKEY2> <VALUE2>
HMGET <KEY> <SUBKEY1> <SUBKEY2>

HGETALL <KEY>
```

- 그 외 많은 Collection
    - [bit / bitmap](https://redis.io/commands#hash)
    - [hyperloglogs](https://redis.io/commands#hyperloglog)
    - [Geospatial indexes](https://redis.io/commands#geo)
    - [Stream](https://redis.io/commands#stream)

### 주의사항은 없을까?
- 하나의 컬렉션에 너무 많은 아이템을 저장하지 않는게 좋다.
    - 10000개 이하가 권장
- Expire는 Collection의 Item 개별로 걸리지 않고, 전체 Collection에 대해서만 걸림



## Reference
- <https://www.inovex.de/blog/redis-more-than-caching/>
- <https://meetup.toast.com/posts/224>
- <https://www.slideshare.net/charsyam2/redis-196314086>
