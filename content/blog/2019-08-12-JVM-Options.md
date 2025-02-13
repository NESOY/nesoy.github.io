---
title: JVM Option 설정에 대하여
tags:
  - Java
date: 2019-08-12
aliases: 
  - ../articles/2019-08/JVM-Options
---

![[Assets/logo/Java.jpg]]

## JVM (Oracle) Options

### -Xms, -Xmx
- `-Xms`
    - JVM 시작시의 Heap size
- `-Xmx`
    - 최대 Heap size

#### `-Xms, -Xmx`를 어떻게 셋팅하는 것이 좋을까?
- `-Xms, -Xmx`를 동일하게 셋팅하는 것을 추천.
- Heap 사이즈를 변경하기 위해 런타임 기간동안 발생하는 불필요한 오버헤드를 줄일 수 있다.
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

#### 항상 Heap Size가 크다고 좋은것일까?
- 같은 애플리케이션일 경우 2GB의 힙을 사용하는 경우가 8GB 크기의 힙을 사용하는 것보다 풀 GC에 걸리는 시간이 짧아 응답 반응성에 유리하다.
- 하지만 8GB 힙을 사용하면 2GB보다 풀 GC 발생 간격이 그만큼 줄어들 것이고 내부 캐시를 사용하는 애플리케이션이라면 히트율을 높여 응답 반응성을 높일 수 있다.
- 어느 것을 선택해도 Trade-off가 발생하기에 상황에 맞게 적절한 해결방법을 찾자.

### [JVM DNS Cache](https://docs.oracle.com/javase/8/docs/technotes/guides/net/properties.html#nct)
- JVM 내부에서도 DNS Cache를 한다. DNS 변경에 바로 반영이 되려면 캐시를 없애는 편이 좋아보인다.
- `networkaddress.cache.ttl`
- `sun.net.inetaddr.ttl`
  - `-1` - 영속적인 캐시를 지원한다.
  - `0` - 캐시를 없앤다.

### [JVM Server 모드](https://javapapers.com/core-java/jvm-server-vs-client-mode/)
- `-client`
  - JIT(Just in time) Compiler를 사용하기에 서버 시작 시간은 빨라지고 더 작은 메모리 사용량(foot-print)를 사용한다.
  - 보통 GUI 시스템, 작은 시스템을 구동하는데 사용하기 좋다.
- `-sever`
  - client 모드보다 더 많은 최적화를 진행한다.
  - 빠른 Operation이 (작은 메모리 사용량, 빠른 시작 시간)보다 더 중요한 상황에서 사용하면 적절하다.

### `-XX:MaxPermSize=`, `-XX:PermSize=`
- JVM 1.8 이전에는 Permanent영역이 존재하였다.
  - 해당 영역은 Class의 Meta 정보, Method의 Meta 정보, Static변수, 상수 정보가 저장되는 공간
  - 해당 기능은 많은 클래스들을 로드하는 경우 크기를 늘리는 것을 추천하고 있다.
- 해당 기능은 1.8 이후로 Deprecated되었다.
  - Native Memory 영역으로 이동하여 Metaspace영역으로 바뀌게 되었다.
  - [JDK 8에서 Perm 영역은 왜 삭제됐을까](https://johngrib.github.io/wiki/java8-why-permgen-removed/)
  - [Java 8 에서 사라진 maxPermSize, PermSize을 대체하는 옵션?](https://blog.voidmainvoid.net/184)


### `-XX:UseContainerSupport`
- JVM이 사용 가능한 CPU와 RAM을 즉 cgroup limits를 읽어들일 수 있게 하는 옵션이다.
- 해당 옵션은 Java 8u191+ 이후로 Default로 변경되었다.
  - <https://medium.com/adorsys/usecontainersupport-to-the-rescue-e77d6cfea712>


## JIT Compiler option
### `-XX:CompileThreshold`
- 특정 메소드가 일정 횟수 있상 실행되면 JIT Compiler가 native 코드로 컴파일한다.
- 기본값은 1500 / 적정 수준 100 이상
- 너무 작게 설정하면 컴파일 시간 증가
- <https://www.javacodegeeks.com/2012/10/warming-up-your-jvm-superfast.html>


## Reference
- <https://kwonnam.pe.kr/wiki/java/memory>
- <https://kwonnam.pe.kr/wiki/java/performance>
- <https://kwonnam.pe.kr/wiki/linux/performance>
- [Elastic Search Memory Setting 가이드라인](https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html)
- <https://brunch.co.kr/@alden/35>
- <https://www.baeldung.com/jvm-parameters>
- <https://www.slipp.net/wiki/pages/viewpage.action?pageId=26641949>
- <https://d2.naver.com/helloworld/184615>
