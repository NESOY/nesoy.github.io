---
title: Multi Thread Algorithm에 대해
date: 2018-09-14
aliases: 
  - ../articles/2018-09/Algorithm-MultiThread
---

![[Assets/logo/algorithm.png]]

## 직렬 알고리즘(Serial Algorithm)
- 명령을 한 번에 하나만 실행하는 Single Processor 컴퓨터에 적합한 알고리즘입니다.

## 병렬 알고리즘(Parallel Algorithm)
- 여러 명령어를 동시에 수행하는 Multi Processor 컴퓨터에 적합한 알고리즘입니다.

## Computer Architecture
### Shared Memory

![[Assets/posts/20180914/1.png]]

### Distributed Memory
- 프로세서마다 메모리를 가져 다른 프로세서의 메모리를 사용하려면 프로세서끼리 명확한 메시지를 보내야 합니다.

![[Assets/posts/20180914/2.png]]

## 정적 스레딩(Static Threading)
- 대부분의 응용 프로그램에서 계산하는 동안 스레드를 유지시키는데 이런 방법을 `정적`이라고 부릅니다.
- 공유 메모리 병렬 컴퓨터에서는 정적 스레드를 이용해 직접 프로그래밍하기가 어렵고 오류가 발생하기 쉽습니다.
    - 스레드들 사이에서 작업을 동적으로 분할하여 각 스레드가 로드를 대략 같게 받도록 하는 것이 매우 복잡합니다.

> 그렇기에 병렬성 계산 리소스를 조정, 계획 관리하는 소프트웨어 계층을 제공하는 동시성 플랫폼을 만들어야 합니다.

## 동적 스레딩(Dynamic Threading)
- 프로그래머가 통신 프로토콜, 로드 밸런싱, 정적 스레드 프로그래밍의 변칙성을 신경 쓰지 않고 응용 프로그램에 병렬성을 지정할 수 있습니다.



### Example - 피보나치 수

![[Assets/posts/20180914/3.png]]

### Nested Parallelism
- 중첩된 병렬성은 서브 루틴이 여러번 반복되는 것을 허용합니다.
- 호출자가 서브 루틴의 계산 결과를 반복 진행하는 것을 허용합니다.


![[Assets/posts/20180914/4.png]]

```
P-FIB(n)
    if  n <= 􏰎1
        return n
    else
        x = spawn P-FIB(n-1)              # Create Child Process
        y = P-FIB(n􏰐-2)                    # Processing Parent Process
        sync                              # Waiting Child Process Result
        return x+y                        # Return Value
```

- 논리적인 병렬을 나타내는 것이라 실제로 꼭 동시에 실행해야 한다는 의미는 아닙니다.
- 스켸줄러가 계산을 전개할 때 유용한 프로세서를 부분계산에 할당함으로써 실제로 어떤 부분계산을 동시에 실행할지를 결정합니다.


### Parallel loop
- 루프를 반복적으로 동시에 실행할 수 있다는 점을 제외하면 일반 for-loop와 동일합니다.
- 컴파일러는 각 `parallel for` 루프를 중첩된 병렬성 계산으로 이용하는 분할-정복 서브 루틴을 이용할 수 있습니다.

![[Assets/posts/20180914/5.png]]

```
MAT-VEC(A,x)
    n = A.rows
    parallel for i = 1 to n
        yi = 0
    parallel for i = 1 to n
        for j = 1 to n
            yi = yi + aij * xj
    return y
```

- 재귀적으로 생성되는 비용도 무시하지 말고 확인해야 합니다.


## Multi Thread 실행 모델
### DAG(Directed acyclic graph)
- 그래프에 사이클이 없는게 특징.

![[Assets/posts/20180914/8.png]]

- [Khan Academy - Graph](https://ko.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs)
- [Wiki](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

## Multi Thread Scheduling
- 좋은 Multi Threading이란 작업의 범위를 최소화할 뿐만 아니라 작업이 병렬 기계의 프로세서에 의해 효율적으로 스켸줄링되어야 합니다.
- <https://en.wikipedia.org/wiki/Scheduling_(computing)>

### Work Stealing

![[Assets/posts/20180914/10.png]]


## Race Condition

```
RACE-EXAMPLE()
    x = 0
    parallel for i = 1 to 2
        x = x + 1
    print x
```

![[Assets/posts/20180914/6.png]]

### ADD Process - Assembly language
1. x를 메모리로부터 프로세서의 하나의 Register로 읽어들입니다.
2. Register에 있는 값을 증가시킵니다.
3. Register에 있는 값을 메모리의 x에 저장합니다.

### 어떤 문제가 발생할까요?
- 각각 CPU가 가지고 있는 Register 값의 불일치가 발생합니다.
- Register 값의 불일치로 인해 우리가 원하는 값이 아닌 다른 값이 나오게 되는 경우도 종종 발생하게 됩니다.

> 이러한 버그는 찾기도 매우 힘들고, 재연하기도 매우 힘듭니다. 또한 심각한 결과를 초래할 수도 있습니다.

### 어떻게 문제를 해결할까요?
- [Mutex](https://en.wikipedia.org/wiki/Mutual_exclusion), Lock, [Semaphore](https://en.wikipedia.org/wiki/Semaphore_%28programming%29)와 같은 기법을 사용해서 동기화를 진행합니다.
- [Memory barrier](https://en.wikipedia.org/wiki/Memory_barrier)

![[Assets/posts/20180914/9.png]]

- 재귀적으로 호출을 하게 된다면?
    - 이들은 서로 독립적이여야 합니다.
- 즉 순서에 상관없이 호출되고 하나의 계산 결과가 다른 계산에 영향을 주지 않아야 합니다.
    - [함수형 프로그래밍](https://nesoy.github.io/articles/2018-05/Functional-Programming)


## 병렬 프로그래밍이 과연 답일까요?
### Amdahl's Law

![[Assets/posts/20180914/7.png]]

> 실제 프로세서나 노드 수를 많이 늘린다고 해도, 어느 수준 이상에서는 속도 향상을 기대할 수 없다.

- 프로그램의 95%가 병렬화 되어 있다고 해도 16개의 프로세서를 가지고 10배 이상의 속도향상을 내지 못한다.
- 아무리 많은 프로세스를 가지고 있어도 20배 이상의 속도 향상을 낼 수가 없다.

## Reference
- <https://www.quora.com/What-is-the-difference-between-forking-and-spawning-a-process>
- <http://sunyzero.tistory.com/191>
- <https://blog.koriel.kr/fork-hamsureul-iyonghayeo-pibonaci-suyeoleul-culryeoghaeboja/>
- <http://bart7449.tistory.com/244>
- <http://www.albahari.com/threading/part4.aspx>
- <https://actor-framework.readthedocs.io/en/stable/Scheduler.html>
- <https://youtu.be/M1e9nmmD3II>
