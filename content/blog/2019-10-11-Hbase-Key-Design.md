---
title: Hbase Key Design에 대해
tags:
  - Hbase
date: 2019-10-11
aliases: 
  - ../articles/2019-10/Hbase-Key-Design
---

![[Assets/logo/hbase.png]]

## 들어가며
- Hbase를 활용하기 위해서는 Key 설계가 무엇보다 중요하다.
- Hbase는 어떻게 저장이 되고 어떻게 설계하는게 좋은지 이해하기 위해 작성한다.

## Hbase Key Design에 대해
### Hbase가 데이터를 어떻게 저장할까?
![[Assets/posts/img/2019-10-10-18-10-41.png]]

- 왼쪽 상단의 그림은 데이터를 논리적으로 표현한 그림이다.
  - `Row`와 `Column[Family:Qualifier]`로 구성된 모습이다.
- 오른쪽 상단&하단 그림은 논리적인 데이터를 물리적으로 저장하는 과정을 표현한 그림이다.
  - `Column-Famliy`를 기준으로 분리하는 것을 확인할 수 있다.
  - 색깔의 진함은 `Version을 의미`하고 타임스탬프 내림차순으로 저장되는 것을 확인할 수 있다.
  - `Null값`을 저장하지 않기 때문에 `RowKey`, `Column 정보`를 포함하여 저장한다.

### 원하는 데이터를 얻기 위해서는?
![[Assets/posts/img/2019-10-10-18-34-29.png]]

- 오른쪽으로 갈수록 Scan 범위가 커지는 점을 알 수 있다.
  - Performance가 안좋아진다.
- 특정 RowKey를 검색할 때 `Column-Famliy`를 지정하면 작은 Scan 범위로 빠른 속도를 얻을 수 있다.
- `Column-Qualifier` 단위의 조건은 성능상 이점은 크게 없다.

### 그럼 어떤 형태로 설계하여 저장해야할까?
![[Assets/posts/img/2019-10-10-19-23-28.png]]

- 두 종류의 테이블이 있다.
  - 왼쪽 : `userID : colfam : messageID : timestamp : emali-message`
  - 오른쪽 : `userID-messageID : colfam : : timestamp : emali-message`
  - 두 테이블의 저장되는 데이터양에는 아무런 차이가 없지만..
    - Hbase 특성상 `RowKey 기준으로 분할하는 특성`때문에 오른쪽 형태의 설계를 권장한다.
    - 왼쪽 설계라면 `Heavy User의 데이터`를 균등하게 분배할 수 없는 단점이 있다.

### 그렇다면 항상 복합 RowKey가 정답일까?
- 복합 RowKey로 테이블을 구성하면 `User`로 진행하는 작업에 대해 원자성을 잃게 된다.
  - 단일 Rowkey는 UserID로 모든 Message를 읽거나 수정할 수 있었지만
  - 복합 Rowkey인 경우 UserID만 가지고는 모든 Message를 수정하기 어렵다.


### Hbase의 Rowkey 디자인 가이드
- 잘못된 RowKey는 Hotspotting을 유발할 수 있으니 주의하자.
  - 하나의 Region Server에 많은 트래픽이 집중될 수 있다.
  - 이를 회피하기 위해서는 `Salting / Hashing / Reversing Key`와 같은 방법을 사용할 수 있다.
  - 트래픽은 분산되었지만.. Read 성능은 떨어지는 단점을 가지고 있다.
- 순차적인 Row Key / TimeseriesData 설계는 최대한 피하자.
  - 순차적으로 정렬된 RowKey 상황에서 특정 Range만 트래픽을 받는 경우
  - Rowkey기반으로 Region을 분산해도 트래픽이 제대로 분산이 안될 수 있다.
  - [monotonically increasing values are bad](https://ikaisays.com/2011/01/25/app-engine-datastore-tip-monotonically-increasing-values-are-bad/#comments)
- Row와 Column 이름을 작게 만들자.
  - `Column Families` : 최대한 짧은 이름으로 설계 (예: data는 d)
  - `Attributes`로 읽기 쉬운 네이밍보단 짧은 이름으로 설계
  - `Rowkey Length`도 최대한 짧게
  - `long`을 byte로 저장하면 `8byte` 이를 String으로 저장하여 byte로 변환하면 거의 `3xbytes`에 저장된다.
    - 읽기는 어렵지만 / 데이터를 작게 만들 수 있다.
  - 왜 이렇게 데이터 크기를 작게 설계하라고 할까?
    - https://hbase.apache.org/book.html#keyvalue



## Reference
- [Hbase 다양한 Rowkey 설계 Reference](https://hbase.apache.org/book.html#schema.casestudies)
- [비트윈 Hbase 설계](http://engineering.vcnc.co.kr/2014/05/hbase-schema-in-between/)
