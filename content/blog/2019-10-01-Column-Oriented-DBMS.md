---
title: Column Oriented DBMS란?
tags:
  - Database
date: 2019-10-01
aliases: 
  - ../articles/2019-10/Column-Oriented-DBMS
---

![[Assets/logo/database.jpg]]

## 왜 Column-Oriented DBMS이 등장하게 되었을까?
- 기존의 Relational DBMS는 Row형으로 데이터를 저장한다.

### Row-Oriented DBMS는 데이터를 어떻게 저장할까?
![[Assets/posts/img/2019-10-01-18-47-14.png]]

- 주로 Row-Value 데이터를 연속적으로 저장한다.

### 실제로 테이블의 데이터파일 모습은?
![[Assets/posts/img/2019-10-01-18-49-58.png]]
- 일렬로 저장된 모습을 확인할 수 있다.

![[Assets/posts/img/2019-10-01-18-51-30.png]]
- Row-Value의 오프셋은 Value의 자료구조에 의존적이다.
  - `32bit의 Integer`,`64bit의 Integer`, `String`등 자료구조의 크기의 총 합산 크기에 따라 오프셋을 결정한다.

### 위 형태의 데이터 파일을 쉽고 빠르게 읽기 위해선?
![[Assets/posts/img/2019-10-01-18-54-37.png]]
- 데이터 파일의 크기를 결정하고 이를 통해 쉽게 Position을 구할 수 있다.
- 구해진 Position을 통해 쉽게 접근이 가능할까?

#### 현실세계에서는 그리 쉽지 않다.

![[Assets/posts/img/2019-10-01-18-57-03.png]]
- `varchars`라는 타입을 생각해보면 매우 다양한 value의 크기를 확인할 수 있다.
- 이는 곧 Position을 계산하기 어렵게 만들며 빠르게 Record를 읽을 수 없게 만든다.


#### 위 방법을 조금 개선해보면?
![[Assets/posts/img/2019-10-01-18-59-21.png]]
- `value`를 저장할 수 있는 여분의 저장소를 추가하고 저장 주소를 values에 담는 형식이다.
- 위 방법으로 Position을 쉽게 구할 수 있지만 여분의 저장소가 필요한 단점이 있다.

### Row-Oriented를 정리하면
- 장점
  - 하나의 Row 데이터를 추가/삭제할때 하나의 페이지만 사용하기에 좋다.
  - 하나의 Row의 대부분의 컬럼을 읽어야 하거나 변경하는 경우 하나의 Read/Write로 가능하다.
- 단점
  - 모든 Row를 읽는 경우 불필요한 Column값을 다 읽어야 한다.
  - Page의 사용하지 않는 공간까지 읽어야 한다.

#### Example
![[Assets/posts/img/2019-10-01-19-21-07.png]]
- `c1`이라는 컬럼의 값을 조회하고 싶은 경우
- 우리는 2번째 페이지까지 읽어야 모든 데이터를 얻을 수 있다.

### 아래의 그림처럼 우리는 1 Read로 모든 데이터를 가져오고 싶다.
![[Assets/posts/img/2019-10-01-19-24-33.png]]

> 이러한 문제를 해결하기 위해 Column Oriented DBMS가 등장했다.

## Column Oriented DBMS란?
- `Row`형으로 저장하는 대신 `Column`으로 저장하는 방식이다.
- 모든 `Column`들은 개별적으로 다뤄지며 `Column`별로 연속적으로 저장된다.
- `Column`별로 데이터가 저장되기때문에 압축에도 높은 효율을 얻을 수 있다.

### Row Oriented vs Column Oriented

![[Assets/posts/img/2019-10-01-19-34-35.png]]
- 우리가 평균 가격을 알고 싶다면?
  - `Row Oriented`는 모든 Row를 조회해야만 결과를 얻을 수 있다.
  - 하지만 `Column Oriented`는 Price 컬럼만 조회해도 결과를 얻을 수 있다.

### 항상 Column Oriented가 좋을까?
- 다수의 컬럼을 조회하는 상황이라면 쓸모가 없어보인다.
- 오히려 결과를 합치는 작업 비용이 더 커져서 느릴 경우가 발생할 거 같다.


## Reference
- <https://en.wikipedia.org/wiki/Column-oriented_DBMS>
- <https://www.slideshare.net/arangodb/introduction-to-column-oriented-databases>
