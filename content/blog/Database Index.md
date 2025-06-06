---
aliases: [/articles/2017-07/DBIndex]
comments: false
date: 2017-07-09
description: Database Index 기능에 대해 소개한다.
tags: [Database]
title: DB의 Index 기능에 대해
---
# Database Index
## 들어가며
> 많은 면접을 보면서 공통으로 DB Index의 개념에 대해 질문을 받았다. 내가 알고있던 Index는 Read 성능을 향상시키기 위해 사용되는 기능으로만 알고 있었지만 좀 더 자세하고 정확하게 알기 위해 포스팅한다. 앞으로 많은 인원이 사용할 수 있는 서버를 만들기 위해 성능에 관해 공부를 많이 하려고 노력해야 겠다.

## SQL의 간단한 예시
- `SELECT first_name FROM people WHERE last_name = 'Smith';`라는 SQL문을 실행한다고 가정해 보자.
- Index가 설정되어 있지 않는다면 Database는 Full table scan이라고 불리는 scan을 진행한다.

## Full Table Scan
- row의 값을 순차적으로 scan하며 값을 비교한다.
- Full table scan은 가장 느린 scanning방법이며 많은 자료가 담긴 Disk를 읽기 위한 I/O를 사용하며 자원을 잡아먹는다.
- 결국엔 속도도 느리고 자원도 많이 사용하는 좋지 않은 방법이다.
- 이러한 문제를 해결하기 위해 Database에서 Index기능을 제공한다.

## DB Index란?
- 읽기 성능을 향상시키기 위한 일종의 자료구조라고 볼 수 있다.
- Index는 관련된 Table과 별도로 저장되며 Index로 설정한 컬럼값이 변경되거나 추가되면 Index도 업데이트가 동시에 된다.
- Index에 주료 사용하는 자료구조는 B+-Tree 알고리즘이다.
- Primary Key에는 Database가 자동으로 Index기능을 설정하여 관리한다.

## Architecture
- 추가 내용 : <http://shadowxx.egloos.com/2333505>

### Clustered Index
- 물리적으로 데이터를 정리하여 Index 테이블은 하나만 존재한다.
- 데이터 페이지가 물리적으로 정렬되어 있기 때문에 순차적 데이터를 접근할 때 편한다.

![[assets/posts/20170709/2.PNG]]

### Non-Clustered Index
- 데이터는 임의적으로 존재하지만 논리적 순서는 인덱스에 의해 지정된다.
- 데이터 페이지가 물리적으로 정렬되어 있지 않기 때문에 인덱스에 의해 찾아가야한다.

![[assets/posts/20170709/3.PNG]]

## MySQL Index 설정하기
- 기존테이블에 Index 추가하기

```sql
CREATE INDEX part_of_name ON customer (name(10));
```

- 테이블 생성 및 Index 추가하기

```sql
CREATE TABLE lookup (id INT) ENGINE = MEMORY;
CREATE INDEX id_index ON lookup (id) USING BTREE;
```

### MySQL Engine Option

![[assets/posts/20170709/1.PNG]]

## JPA Index 설정하기
```java
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(name = "region",
       indexes = {@Index(name = "my_index_name",  columnList="iso_code", unique = true),
                  @Index(name = "my_index_name2", columnList="name",     unique = false)})
public class Region{

    @Column(name = "iso_code", nullable = false)
    private String isoCode;

    @Column(name = "name", nullable = false)
    private String name;

}
```
## Reference
- <https://en.wikipedia.org/wiki/Full_table_scan>
- <https://en.wikipedia.org/wiki/Database_index>
- <http://shadowxx.egloos.com/2333505>
- <https://dev.mysql.com/doc/refman/5.7/en/create-index.html>
- <https://technet.microsoft.com/ko-kr/library/ms177443(v=sql.105).aspx>
- <https://stackoverflow.com/questions/3405229/specifying-an-index-non-unique-key-using-jpa>
