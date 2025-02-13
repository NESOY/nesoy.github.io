---
title: MySQL Datetime, Timestamp 차이에 대해
tags:
  - MySQL
date: 2020-02-22
aliases: 
  - ../articles/2020-02/mysql-datetime-timestamp
---

## MySQL Datetime, Timestamp 차이에 대해
#### MySQL의 Time Zone을 확인해보자.
```sql
mysql> show variables like '%time_zone%';
+------------------+---------------------+
| Variable_name    |  Value              |
+------------------+---------------------+
| system_time_zone | India Standard Time |
| time_zone        | Asia/Calcutta       |
+------------------+---------------------+
2 rows in set (0.00 sec)
```
#### datetime, timestamp 두 가지 타입을 가진 테이블을 생성
```sql
create table datedemo
(
 mydatetime datetime,
 mytimestamp timestamp
);

Query OK, 0 rows affected (0.05 sec)
```

#### 현재 시간을 넣어보면?
```sql
insert into datedemo values ((now()), (now()));
```

#### 역시 똑같은 것을 확인 할 수 있다.
```sql
select * from datedemo;
+---------------------+---------------------+
| mydatetime          | mytimestamp         |
+---------------------+---------------------+
| 2011-08-21 14:11:09 | 2011-08-21 14:11:09 |
+---------------------+---------------------+
1 row in set (0.00 sec)
```

#### 그런데 시스템의 타임존을 변경하면?
```sql
SET TIME_ZONE = "america/new_york";

Query OK, 0 rows affected (0.00 sec)
```

#### timestamp값이 변경되는 현상 :)
```sql
 select * from datedemo;
+---------------------+---------------------+
| mydatetime          | mytimestamp         |
+---------------------+---------------------+
| 2011-08-21 14:11:09 | 2011-08-21 04:41:09 |
+---------------------+---------------------+
1 row in set (0.00 sec)
```


## 왜 이런 현상이 나타날까?
> timestamp는 time_zone의 의존한다는 사실

#### 그렇다면 Datetime만 사용하면 되는거 아닌가?
- 글로벌 서비스를 하면 여러 지역에 DB를 Clustering 해야 한다.
    - [Github의 MySQL Clustering](https://github.blog/2018-10-30-oct21-post-incident-analysis/)
- Datetime을 사용하는 경우 `time_zone`이 반영되지 않기 때문에 아래와 같은 상황에서 문제가 발생한다.
    - 서울 오전 9시에 작성한 글이 미국으로 Replication하는 경우 여전히 오전 9시로 반영되는 상황이 벌어지게 된다.
    - 이런 경우에는 UTC 지원 가능한 timestamp를 사용하는 것이 더 좋아보인다.

### ETC
#### Datetime
- `1000-01-01 00:00:00`부터 `9999-12-31 23:59:59`까지 지원

#### Timestamp
- `1970-01-01 00:00:01`부터 `2038-01-19 03:14:07`까지 지원
- Index가 더 빠르게 생성된다.



## Reference
- <https://dev.mysql.com/doc/refman/8.0/en/datetime.html>
- <https://www.eversql.com/mysql-datetime-vs-timestamp-column-types-which-one-i-should-use/>
