---
title: Couchbase의 CAS란?
tags:
  - Couchbase
date: 2019-01-23
aliases: 
  - ../articles/2019-01/Couchbase-CAS
---

![[Assets/logo/couchbase.png]]


## CAS(Check & Set) 값이란?
> Optimistic Concurrency Control

- 문서의 일관성을 유지하기 위한 필드입니다.
- 하나의 문서에 CAS의 값이 설정이 되어 있고, 문서의 값(VALUE)가 변경될 때 마다 이 CAS의 값도 변경됩니다.

### Example

![[Assets/posts/20190123/1.png]]

- Step 1 : 클라이언트 A가 문서를 읽습니다.
- Step 2 : 클라이언트 A는 문서의 값을 **1 증가** 시킵니다.
- Step 3 : 클라이언트 B는 클라이언트 A가 문서를 업데이트하기 전에 문서를 읽습니다.
- Step 4 : 클라이언트 A는 문서를 업데이트를 진행합니다.
- Step 5 : 클라이언트 B는 문서의 값을 **1 증가** 시킵니다.
- Step 6 : 클라이언트 B는 문서를 업데이트를 진행합니다.

#### Example 결과는 어떠할까?
- 두 번의 문서의 값이 증가하여 문서의 값은 `12`가 되어야 하지만 실제 `11`이 문서에 업데이트가 되는 것을 확인할 수 있습니다.
- 데이터의 일관성 문제를 예방 위해서 보통 RDBMS의 경우 lock을 거는 방법을 사용하지만,
    - 분산 DB의 경우에는 전체 분산 노드 간에 lock을 거는 것이 성능상 문제가 발생할 수 있기 때문에, CAS라는 필드를 사용합니다.

### How to work CAS?
- 문서의 값이 10일 때 CAS값이 1인 경우, 클라이언트는 문서 값 10뿐만 아니라 CAS값도 같이 읽습니다.
- 다른 클라이언트가 해당 `문서를 업데이트를 진행하면 CAS값도 같이 변경`됩니다.

#### 업데이트 이전의 CAS값을 가진 클라이언트가 문서를 업데이트를 진행한다면?
- `서버에 저장된 문서의 CAS값`과 `클라이언트가 가지고 있는 CAS 값`이 불일치하기 때문에 문서 업데이트는 실패하게 됩니다.
- 실패한 클라이언트는 다시 문서를 읽어 CAS값을 조정한 뒤 문서 업데이트를 진행해야 합니다.

#### 그렇다면 CAS를 사용하는데 문제가 없을까?
- 서로 저장하기 위해 경쟁하는 Race Condition인 경우에는 급격하게 성능이 낮아집니다.
    - 문서 저장을 실패하게 된다면 다시 재시도해야하는 Cost가 필요합니다.
- 다시 문서를 읽어 문서를 저장하는 Loop안에서 Side Effect가 없어야 합니다.
    - Loop에서 Message Queue로 메시지를 보내는 Logic이 있다면 예측이 불가능한 문제가 발생할 수 있습니다.

## Reference
- <https://docs.couchbase.com/java-sdk/2.7/concurrent-mutations-cluster.html>
- <https://bcho.tistory.com/category/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%20%EC%BB%B4%ED%93%A8%ED%8C%85%20%26%20NoSQL/CouchBase>
- <https://www.slideshare.net/hoyoungchoi980/nosql-mmorpg>



