---
title: Reactive Stream이란?
tags:
  - reactive
date: 2021-09-17
aliases: 
  - ../articles/2021-09/Reactive-Stream
---

## Reactive Stream 이란?
> Reactive Streams is a standard for asynchronous data processing in a streaming fashion with non-blocking back pressure.
- 논블로킹(Non-blocking) 백 프레셔(back pressure)를 이용한 비동기 데이터 처리의 표준

#### 왜 Reactive Stream이 탄생하게 되었을까?
- 기존에는 Thread Pool을 활용해서 일처리를 진행했다.
- I/O 작업이 많은 일을 하게 되는 Thread 경우 대부분 기다리는 상황이 벌어진다.
- 물론 다른 Thread로 제어권이 넘어가 일을 하지만 Thread Pool의 크기는 정해져 있다보니 성능에 한계가 찾아온다.
	- Thread Pool Size보다 더 많은 사용자의 요청이 온다면 Thread Pool Hell인 상황
- 위 문제를 해결하기 위해 Thread Pool 대신 비동기 & non-blocking 모델을 사용해서 메시지 커뮤니케이션으로 전환하게 된다.
	- 이를 Reactive Stream이라고 부른다.

#### Reactive Stream은 어떻게 구성되어 있을까?
- I/O를 기다리지 않기 위해 적용한 [Observer pattern](https://johngrib.github.io/wiki/observer-pattern/)으로 시작된다.
	- 이를 통해 Thread들을 역할별로 분리할 수 있다.
- Observer Pattern의 단점은 없을까?
	- Observer - Subject간의 서로 의존하는 상황
	- 다양한 토픽들을 사용하려면 별도로 생성해야 하는 상황
	
![[Assets/posts/img/2021-09-17-16-34-41.png]]

- 서로 의존하지 않기 위해 중간에 Message Broker를 추가하여 Pub-sub Pattern이 등장하게 된다.
	- Pub, Sub 서로 의존하지 않아도 되는 상황
	- 이를 통해 Topic based로 개선되어 다양한 토픽들을 다양한 구독자들에게 전달할 수 있게 된다.

- [Reactive Stream 명세에 따르면 총 4가지 인터페이스로 구성되어있다.](https://github.com/reactive-streams/reactive-streams-jvm)
	- Publisher
	- Subscriber
	- Subscription
	- Processor

#### Flow Control Problem(back pressure)
- Push 방식(빠른 Publisher & 느린 Subscriber)
	- Publisher가 초당 100개의 메시지를 생산해 Subscriber에게 보낸다.
	- Subscriber은 초당 10개밖에 소비를 하지 못한다.
	- 그럼 나머지 초당 90개는 어디에 쌓아두어야 할까?
		- 고정된 버퍼를 가지고 있다면? -> 버퍼 크기를 넘어서면 버리거나 OOM 발생하거나..
- 이를 해결하기 위해 Dynamic Pull 방식으로 바꾼다.
	- Subscriber은 자신이 소비할 수 있는 크기만큼 Publisher에게 요청한다.
	- Publisher는 요청받은 메시지 크기만큼 Subscriber에게 전달한다.
	- Subscriber는 자신이 소화할 수 있는 만큼 메시지를 받기 때문에 처리하는데 문제가 없다.
- 남은 궁금증?
	- 그럼 Publisher가 넘치는 상황은 어떻게 핸들링하는가?
	- 같은 Topic에 다른 Subscriber의 소비속도가 다르면 이를 어떻게 핸들링할까?

#### Reactive Stream은 Spec 이를 구현한 구현체들
- RxJava, Reactor Core, Akka Streams
- ReactiveMongo, Slick
- Armeria, Vert.x, Play Framework, Spring WebFlux


## Reference
- <https://engineering.linecorp.com/ko/blog/reactive-streams-with-armeria-1/>
- <https://howtodoinjava.com/spring-webflux/spring-webflux-tutorial/>
