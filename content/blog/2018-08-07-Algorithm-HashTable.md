---
title: Java의 HashMap에 대해
date: 2018-08-07
aliases: [../articles/2018-08/Algorithm-HashTable]
---
# HashTable
> 가장 자주 사용하는 자료구조인 HashMap에 대해 더 깊이 이해하기 위해 작성합니다.

## HashTable, HashMap에 대해
- HashTable은 Dictionary, HashMap은 AbstractMap을 사용하고 있습니다.
- Dictionary와 AbstractMap의 인터페이스는 동일하나 Java8 document에선 Map을 사용하기를 권하고 있습니다.

### [Dictionary Document](https://docs.oracle.com/javase/8/docs/api/java/util/Dictionary.html)
> NOTE: This class is obsolete. New implementations should implement the Map interface, rather than extending this class.



## HashMap에 대해
![[Assets/posts/20180807/1.png]]

- Key값을 Hash Function을 통해 HashCode를 얻어 해당 Bucket에 Value를 저장하는 형태입니다.

### Hash Function
> 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수입니다.

#### 나누는 방법
- hash(key) = key % size
  - bucket size의 크기를 정할 때 `2의 지수승 값에 근접하지 않는 소수`를 택하는 것이 좋습니다.
- size가 크면 클수록 충돌하는 확률이 낮아집니다.

#### 곱하기 방법
- hash(key) = [size * (key*A % 1)] :: 0 < A < 1
  - key * A를 통해 소수부분을 추출합니다.
  - size를 곱한 후에 내림 연산을 합니다.
- 곱하기의 장점은 size값이 그렇게 중요하지 않습니다.
- 나누는 방법보다는 다소 느립니다.

#### [Universe Hashing](https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%88%EB%B2%84%EC%84%A4_%ED%95%B4%EC%8B%B1)
- 다수의 해시함수를 만들고, 이 해시함수의 집합 H에서 무작위로 해시함수를 선택해 해시값을 만드는 기법입니다.
- 암호학에서 유일한 식별자로 사용하기도 합니다.

> 최상의 선택은 Hashing이 될 자료의 특성을 이해하는 것입니다.

## Direct-Address Tables
![[Assets/posts/20180807/2.png]]
- 키의 전체 개수와 동일한 크기의 버킷을 가지고 있습니다.

### 문제점은 없을까요?
- 현재 사용하지 않는 Key에 대해서 미리 Memory를 할당받아 사용하고 있는 단점이 있습니다.
- HashMap 크기(size)는 실제 사용하는 키 개수(key)보다 적게 설정합니다.
  - load factor(α) : key/size
  - 해시테이블의 한 버킷에 평균 몇 개의 키가 매핑되는가를 나타내는 지표입니다.
- load factor > 1 인 경우에는 Hash Collision이 발생합니다.

#### Java8의 HashMap Load Factor
![[Assets/posts/20180807/3.png]]

## 충돌을 해결하기 위해서는?
### Dynamic resizing
- Bucket Size를 단순히 2배로 늘린 후 Key값을 재배열합니다.

### Open-Addressing
- Open Addressing은 연속된 공간에 데이터를 저장하기 때문에 Separate Chaining에 비하여 캐시 효율이 높습니다.
- 데이터 개수가 충분히 적다면 Open Addressing이 Separate Chaining보다 더 성능이 좋습니다.

#### Linear Probing
![[Assets/posts/20180807/4.png]]
- 충돌이 발생한 경우에 일정 Offset 간격으로 Bucket으로 접근하여 Search, Insert를 진행합니다.
  - 구현은 매우 쉬운 장점이 있습니다.
  - Value가 특정 Area로 모이게 되는 Clustering이 발생할 수 있습니다.
  - 평균 검색 시간은 점점 증가하게 됩니다.

#### Quadratic Probing
![[Assets/posts/20180807/5.png]]
- Linear Probing을 해결하기 위해 2차식과 관련된 Offset으로 접근합니다.
  - Linear Probing보다 가벼운 Clustering이 발생합니다.
  - 초기 Hashing값이 동일한 경우에는 충돌이 발생하는 문제가 있습니다.

#### Double Hashing
- 초기 Hashing값과 Offset을 얻는 Hashing을 따로 두는 방식입니다.
  - Cluserting 문제를 해결할 수 있습니다.

### Seperate Chaining With LinkedList
![[Assets/posts/20180807/6.png]]
- 충돌이 발생하게 되면 LinkedList로 결과값으로 값을 저장합니다.
- LinkedList의 특성상 최악의 경우 O(N)이기 때문에 Red-Black Tree와 같은 다른 자료구조를 사용하는 경우도 있습니다.

## Reference
- <https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/>
- <https://d2.naver.com/helloworld/831311>
- <https://www.codingeek.com/data-structure/complete-guide-open-addressing-classification-eliminate-collisions/>
- <http://docs.likejazz.com/hash-table-implementations/#separate-chainingwith-linked-lists>
