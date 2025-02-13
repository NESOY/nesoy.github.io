---
title: 병행성(Concurrency)와 병렬성(Parallelism)의 차이에 대해
tags:
  - OS
date: 2018-09-13
aliases: 
  - ../articles/2018-09/OS-Concurrency-Parallelism
---

![[Assets/logo/os.jpg]]


## Concurrency와 Parallelism의 차이에 대해
![[Assets/posts/20180913/1.png]]

### 병행성([Concurrency](https://en.wikipedia.org/wiki/Concurrent_computing))
> 동시에 실행되는 것처럼 보이는 것.

- Logical Level에 속한다.
- Single Core
    - 물리적으로 병렬이 아닌 순차적으로 동작할 수 있다.
    - 실제로는 [Time-sharing](https://en.wikipedia.org/wiki/Time-sharing)으로 CPU를 나눠 사용함으로써 사용자가 Concurrency를 느낄 수 있도록 한다.
- Multi Core
    - 물리적으로 병렬로 동작할 수 있다.
- Case
    - Mutex, Deadlock

### 병렬성([Parallelism](https://en.wikipedia.org/wiki/Parallel_computing))
> 실제로 동시에 작업이 처리가 되는 것.

- Physical(Machine) Level에 속한다.
- 오직 Multi Core에서만 가능하다.
- Case
    - OpenMP, MPI, CUDA

## Reference
- <http://atin.tistory.com/567>
- <http://www.dietergalea.com/parallelism-concurrency/>
- <http://tutorials.jenkov.com/java-concurrency/concurrency-vs-parallelism.html>
- <http://www.linux-mag.com/id/7411/>
- <http://egloos.zum.com/minjang/v/2517211>
