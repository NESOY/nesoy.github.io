---
title: Java volatile이란?
tags:
  - Java
date: 2018-06-09
aliases: 
  - ../articles/2018-06/Java-volatile
---

![[Assets/logo/Java.jpg]]

# Java volatile이란?
- `volatile` keyword는 Java 변수를 Main Memory에 저장하겠다라는 것을 명시하는 것입니다.
- 매번 변수의 값을 Read할 때마다 CPU cache에 저장된 값이 아닌 Main Memory에서 읽는 것입니다.
- 또한 변수의 값을 Write할 때마다 Main Memory에 까지 작성하는 것입니다.


## 왜(Why) 필요할까요?

![[Assets/posts/20180609/1.png]]

- `volatile` 변수를 사용하고 있지 않는 MultiThread 어플리케이션에서는 Task를 수행하는 동안 `성능 향상`을 위해 Main Memory에서 읽은 변수 값을 CPU Cache에 저장하게 됩니다.
- 만약에 Multi Thread환경에서 `Thread가 변수 값을 읽어올 때` 각각의 CPU Cache에 저장된 값이 다르기 때문에 `변수 값 불일치 문제`가 발생하게 됩니다.



### Example
- SharedObject를 공유하는 두 개의 Thread가 있습니다.
    - Thread-1는 counter 값을 더하고 읽는 연산을 합니다. (Read & Write)
    - Thread-2는 counter 값을 읽기만 합니다.(Only Read)

```java
public class SharedObject {
    public int counter = 0;
}
```

Thread-1은 counter값을 증가시키고 있지만 CPU Cache에만 반영되어있고 실제로 Main Memory에는 반영이 되지 않았습니다.
그렇기 때문에 Thread-2는 count값을 계속 읽어오지만 0을 가져오는 문제가 발생합니다.

![[Assets/posts/20180609/2.png]]


## 어떻게(How) 해결할까요?
- `volatile` 키워드를 추가하게 되면 Main Memory에 저장하고 읽어오기 때문에 `변수 값 불일치 문제`를 해결 할 수 있습니다.

```java
public class SharedObject {
    public volatile int counter = 0;
}
```


## 언제(When) volatile이 적합할까요?
- Multi Thread 환경에서 하나의 Thread만 read & write하고 나머지 Thread가 read하는 상황에서 `가장 최신의 값을 보장`합니다.

### 항상 volatile이 옳을까요?
#### Example
- Thread-1이 값을 읽어 1을 추가하는 연산을 진행합니다.
    - 추가하는 연산을 했지만 아직 Main Memory에 반영되기 전 상황입니다.
- Thread-2이 값을 읽어 1을 추가하는 연산을 진행합니다.
    - 추가하는 연산을 했지만 아직 Main Memory에 반영되기 전 상황입니다.
- 두 개의 Thread가 1을 추가하는 연산을 하여 최종결과가 2가 되어야 하는 상황이지만?
    - 각각 결과를 Main Memory에 반영하게 된다면 1만 남는 상황이 발생하게 됩니다.

![[Assets/posts/20180609/3.png]]


- 하나의 Thread가 아닌 여러 Thread가 write하는 상황에서는 적합하지 않습니다.
- 여러 Thread가 write하는 상황이라면?
    - `synchronized`를 통해 변수 read & write의 원자성(atomic)을 보장해야 합니다.


## volatile 성능에 어떤 영향이 있을까요?
- `volatile`는 변수의 read와 write를 Main Memory에서 진행하게 됩니다.
- `CPU Cache`보다 `Main Memory`가 비용이 더 크기 때문에 `변수 값 일치`을 보장해야 하는 경우에만 `volatile` 사용하는 것이 좋습니다.


## 정리하자면?
- `volatile`
    - Main Memory에 read & write를 보장하는 키워드.
- 상황?
    - 하나의 Thread가 write하고 나머지 Thread가 읽는 상황인 경우.
    - 변수의 값이 최신의 값으로 읽어와야 하는 경우.
- 주의할 점?
    - 성능에 영향이 어느 정도 영향을 줄 수 있는 Point라는 점.



## Reference
- <http://tutorials.jenkov.com/java-concurrency/volatile.html>
