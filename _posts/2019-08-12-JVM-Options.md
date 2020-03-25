---
layout: post
title: JVM Option 설정에 대하여
excerpt: ' '
categories:
  - Java
tags:
  - Java

date: 2019-08-12
---

![No Image](/assets/logo/Java.jpg)

## JVM (Oracle) Options
- `-Xms`
    - JVM 시작시의 Heap size
- `-Xmx`
    - 최대 Heap size

#### `-Xms, -Xmx`를 어떻게 셋팅하는 것이 좋을까?
- ~~`-Xms, -Xmx`를 동일하게 셋팅하는 것을 추천.~~
- ~~Heap 사이즈를 변경하기 위해 런타임 기간동안 발생하는 불필요한 오버헤드를 줄일 수 있다.~~
- 과거의 JVM 기준으로 내려오는 설정방법이라는 의견이 있다.
- 최신 JVM에서는 설정안하는 것을 추천한다고 하는데 테스트를 진행하고 확인해봐야 한다.
- [Reference](https://blog.newrelic.com/technology/state-of-java/)
> In very early versions of the adaptive sizing algorithms there may have been some advantage to running with this combination, but for modern workloads it’s almost always counterproductive. If you set this combination, the JVM is constrained in how it can resize and shape the heap, making it less responsive to sudden changes in traffic behavior or request rate.


#### 그럼 Heap Size를 어느 정도까지 설정하는게 좋을까?
- `32bit` 운영체제인 경우 최대 Heap Size는 `2^32 = 4GB`를 사용할 수 있다.
- `64bit` 운영체제인 경우 최대 Heap Size는 그보다 더 많이 사용할 수 있다.
  - 하지만 포인터 크기가 증가함에 따라 불필요한 메모리를 사용하는 단점이 있다.
  - Java에서는 더 많은 Heapsize와 작은 포인터 크기를 사용하기 위해 [Compressed Ordinary object pointers](https://brunch.co.kr/@alden/35)를 사용하였다.
  - 실제로 주소가 아닌 주소의 Offset을 8의 배수로 계산하여 가지기 때문에 최대 힙사이즈는 `4GB -> 32GB`로 증가하게 된다.
  - 최대 힙 사이즈가 `32GB`를 넘어서게 된다면 JVM은 `64bit 기반의 OOP`를 사용하게 된다.
  - 그렇기 때문에 ElasticSearch에서는 최대 HeapSize를 32GB 이하로 권장한다.


## Reference
- <https://kwonnam.pe.kr/wiki/java/memory>
- [Elastic Search Memory Setting 가이드라인](https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html)
- <https://brunch.co.kr/@alden/35>
- <https://www.baeldung.com/jvm-parameters>
- <https://www.slipp.net/wiki/pages/viewpage.action?pageId=26641949>
- <https://kwonnam.pe.kr/wiki/linux/performance>