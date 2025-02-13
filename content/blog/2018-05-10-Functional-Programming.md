---
title: 함수형 프로그래밍(Functional Programming)이란?
tags:
  - Programming
date: 2018-05-10
aliases: 
  - ../articles/2018-05/Functional-Programming
---

![[Assets/logo/FP.png]]

# 함수형 프로그래밍(Functional Programming)이란?
## Concept
> Avoids changing State and Mutable data

- 상태와 Data를 변경하는 것을 피하면서 프로그래밍하는 것입니다.
- 즉 대입문[assignment statements] 없이 프로그래밍하는 것입니다.

### 일급 시민(First-class citizens)
> 함수를 일급 시민으로 관리하겠다.

#### 일급 시민이 된다는 것은 무엇을 의미할까요?
- Argument로 전달할 수 있다는 의미. -> `함수가 Argument로 전달될 수 있다.`
- 함수의 Return값이 될 수 있다는 의미. -> `Return값이 함수가 될 수 있다.`
- 값을 수정하기도, 값을 할당할 수도 있다는 의미. -> `함수를 값처럼 할당하기도 수정도 할 수 있다.`

#### 일급 시민은 누가 있을까요?
- value
- type
- object
- entity

### Higher-order functions
- 함수를 Argument로 받는 함수.
- 함수를 Return하는 함수.

### Pure functions
- Memory or I/O관점에서 Side-effect가 없는 함수.
- 함수의 실행이 외부에 영향을 끼치지 않는 함수.

#### Pure function을 사용하면 우리는 무엇을 얻을 수 있을까요?
- 함수 자체가 독립적이고 Side-Effect가 없기 때문에 스레드에 안전성을 보장받습니다.
- 스레드에 안전성이 보장되면 병렬적인 계산을 진행할 수 있습니다.

### Referential transparency
- 함수 프로그래밍은 대입이 없는 특성을 가지고 있기 때문에 참조(Reference)에 투명성을 가지고 있습니다.
- 참조 투명성을 통해 기존의 Value는 변경되지 않고 유지됩니다.

### Currying
- 여러개의 인자를 가진 함수를 호출 할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법입니다.

## 함수형 프로그래밍 사용하면 무엇을 얻을 수 있을까요?
> "대입문의 사용을 포기하면 자유로운 동시성을 얻을 수 있다."

![[Assets/posts/20180510/1.png]]

현재 우리는 많은 CPU를 가진 컴퓨터를 사용하고 있습니다. 그렇다고 일을 하나의 CPU에만 일을 시키지는 않죠. 어떻게 하면 컴퓨터의 모든 Cycle을 사용할 수 있을까?
많은 프로세스가 동시에 하나의 메모리 값을 변경하는 경우를 방지하기 위해서 Semaphores라는 기술을 사용했지만 함수형 프로그래밍은 더 이상 기술을 사용하지 않아도 됩니다.

즉 병렬처리에 대해 안전하고 빠르게 처리할 수 있습니다.


## 단점은 없을까요?
- 기본적으로 추상화 단계가 지나치게 높아져서 읽기어려운 코드 즉 Reading이 어렵습니다.
- 기존의 자료구조를 상당히 들어엎어야 한다는 부담이 있습니다.
- 함수형 언어의 장점인 병렬/분산 프로그래밍 또한 실제로는 기존 명령형 언어들의 기능을 가지고도 충분히 구현할 수 있습니다.

## 대표적인 예로는 무엇이 있을까요?
- Scala
- Haskell
- Clojure
- LISP


## Reference
- <https://en.wikipedia.org/wiki/First-class_citizen>
- <https://pragprog.com/magazines/2013-01/functional-programming-basics>
- <https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536>
- <http://cafe.elharo.com/programming/java-programming/why-functional-programming-in-java-is-dangerous/>
- <https://medium.com/@originerd/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8%EA%B8%B0-14ce8f98e34e>
- <https://sungjk.github.io/2017/07/17/fp.html>

