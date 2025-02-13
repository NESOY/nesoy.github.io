---
title: Hbase Data Model에 대해
tags:
  - Hbase
date: 2019-10-02
aliases: 
  - ../articles/2019-10/Hbase-Data-Model
---

![[Assets/logo/hbase.png]]

## Hbase Data Model에 대해
![[Assets/posts/img/2019-10-02-13-39-21.png]]
- Hbase는 Data를 Table 형태로 저장한다.

### Tables
- Table은 여러개의 Row를 저장한다.
- 테이블은 [Column Oriented 형태](https://nesoy.github.io/articles/2019-10/Column-Oriented-DBMS)로 저장된다.

### Row
- 하나의 Row Key와 여러개의 Column으로 구성되어 있다.
- Row들은 이름순으로 정렬되어 저장된다.
    - Row Key를 디자인 하는 것이 매우 중요하다.
    - [RowKey Design Guide](https://hbase.apache.org/book.html#rowkey.design)

### Column
- Column은 `Column Family`와 `Column Qualifier`로 구성되어 있고 구분자는 `:`를 사용한다.

### Column Families
- 좋은 Disk I/O을 위해 여러 Column들을 물리적으로 가깝게 저장한다.
- 각각의 Column Family는 Storage 관련 설정파일을 가지고 있다.
    - 메모리에 Cache Option
    - 압축 Option
    - Row Key를 인코딩 Option
- 테이블내의 각각의 Row는 같은 Column Families를 가지고 있다.

### Column Qualifiers
- Data에 추가적으로 Index를 하기 위해 Column Family에 추가한다.
- 테이블이 생성될때 Column Family가 고정적이더라도
    - Column Qualifiers는 유동적으로 다룰 수 있다.

### Cell
- Row
- Column Family, Qualifier
- Value
- TimeStamp로 이루어져있다.

### Timestamp
- value와 함께 같이 작성된다.
- 기본적으로 RegionServer의 데이터가 추가된 시간을 의미한다.
- 설정으로 타임스탬프에 쓰여질 값을 다르게 할 수 있다.

## Example
### 논리적인 모습
![[Assets/posts/img/2019-10-02-16-11-07.png]]
- 중간중간 빈 공간을 볼 수 있다.
- 하지만 실제로 저장할때에는 빈 공간은 생기지 않는다.

### Multi-dimensional Map
```json
{
  "com.cnn.www": {
    contents: {
      t6: contents:html: "<html>..."
      t5: contents:html: "<html>..."
      t3: contents:html: "<html>..."
    }
    anchor: {
      t9: anchor:cnnsi.com = "CNN"
      t8: anchor:my.look.ca = "CNN.com"
    }
    people: {}
  }
  "com.example.www": {
    contents: {
      t5: contents:html: "<html>..."
    }
    anchor: {}
    people: {
      t5: people:author: "John Doe"
    }
  }
}
```

### 물리적으론 어떻게 저장할까?
- column Family로 저장한다.

#### column Family : anchor

![[Assets/posts/img/2019-10-02-16-15-32.png]]

#### column Family : contents

![[Assets/posts/img/2019-10-02-16-15-45.png]]


## Reference
- <https://hbase.apache.org/book.html#datamodel>
- <https://www.edureka.co/blog/hbase-architecture/>
