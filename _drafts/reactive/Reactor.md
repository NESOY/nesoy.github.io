---
layout: post
title: Reactor란?
excerpt: ''
categories:
- reactive
tags:
- reactive
date: 2021-09-23
---

## Reactor란?
- Pivotal에서 구현한 JVM 기반의 Reactive Stream의 구현체
- Java 8+ 에서 동작한다.

#### [Flux](https://projectreactor.io/docs/core/release/reference/#flux)
> 끊임없는 변화
- onNext x 0..N [onError | onComplete]
- 0, 1 또는 다수의 데이터를 갖는 파이프라인
	- Reactive Stream의 Publisher<T>를 구현한 구현체

#### [Mono](https://projectreactor.io/docs/core/release/reference/#mono)
> 하나의
- 하나의 데이터 항목만 갖는 데이터셋에 최적화된 리액티브 타입
- onNext x 0..1 [onError | onComplete]

#### Flux & Mono의 차이점?
- 단순히 의미의 차이뿐만 아니라 내부적으로 버퍼를 작게쓰는 것과 동기화 비용의 차이등 다양한 차이가 존재한다.


#### 간단하게 만드는 Flux or Mono



- 500개 이상의 Operation이 존재한다.
- Creation Operation
- Combination Operation
- Transformation Operation
- Logic Operation




#### Flux Example


- defers 유무의 차이
	- defers로 선언하면 실제로 구독하지 않는 이상 해당 Function을 실행되지 않는다.
	- defers로 선언하지 않으면 메소드가 호출됨과 동시에 실행이 된다.

## Reference
- <https://projectreactor.io/docs/core/release/reference>