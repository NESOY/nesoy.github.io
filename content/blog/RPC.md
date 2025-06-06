---
aliases: [/articles/2019-07/RPC]
comments: false
date: 2019-07-09
description: 
tags: [OS]
title: RPC
---
# RPC
## 왜 RPC가 등장하게 되었을까?

> `어떻게 하면 분산 네트워크 컴퓨터 환경에서 프로그래밍을 쉽게 할 수 있을까?`

#### 우리가 일반적으로 사용하는 커뮤니케이션 패턴은?

-   Client - Server 패턴

    -   Client는 요청하고 기다리고
    -   Server는 요청한 내용을 실행하고 결과값을 반환하고
    -   Client는 결과값을 받아 진행

#### 우리가 알고 있는 친근한 방법은?

-   Socket
    -   수작업으로 Formatting 해야 하는 단점.
    -   직접 네트워크 주소를 입력하고 보내야 하는 단점.

#### 현재 우리가 겪고 있는 문제는?

![[assets/posts/img/2019-07-09-10-49-12.png]]

-   MSA를 통해 정말 다양한 언어와 프레임워크가 존재
-   Polyglot한 구조를 지탱하기 위해선 프로토콜을 맞춰야 비용이 발생.

## RPC란?

> 분산 네트워크 환경에서 조금 더 편하게 프로그래밍하기 위해 등장한 RPC

-   분산 시스템의 핵심 키워드

#### RPC의 궁극적인 목표는 무엇일까?

-   클라이언트 - 서버간의 커뮤니케이션에 필요한 상세한 정보는 최대한 감추고
-   클라이언트는 `일반 메소드를 호출하는 것`처럼 호출하면 된다.
-   서버도 마찬가지로 일반 메소드를 다루는 것처럼!

#### RPC의 대표적인 구현체는 뭐가 있을까?

-   [Google의 ProtocolBuffer](https://developers.google.com/protocol-buffers/)
-   [Facebook의 Thrift](https://thrift.apache.org/)
-   [Twitter의 Finalge](https://twitter.github.io/finagle/)

#### RPC의 간단한 Example를 확인해보자

-   `이상적인 RPC`를 사용하면 아래와 같이 표현할 수 있다.

```
# Client
z = function(x, y)
```

```
# Server
function(x, y) {
 compute x, y
 return z
}
```

-   RPC는 이 정도의 수준으로 프로그래밍 하기를 원한다.
-   이를 통해 초보자 프로그래머도 원격 함수를 쉽게 사용할 수 있다.

### RPC는 어떻게 진행될까?

![[assets/posts/img/2019-07-09-13-54-41.png]]

-   Caller / Callee
    -   사용자(Client / Server)가 필요한 비즈니스 로직을 작성하는 Layer
    -   IDL(interface definition language)로 작성
-   Stub
    -   Stub Compiler가 IDL 파일을 읽어 원하는 Language로 생성.
    -   Parameter Object를 Message로 [marshalling/unmarshalling](<https://en.wikipedia.org/wiki/Marshalling_(computer_science)>)하는 Layer
-   RPC RunTime
    -   Server와 Client를 Binding하는 Layer
    -   커뮤니케이션 중 발생한 에러 처리도 진행

### RPC는 어떻게 서버와 클라이언트는 연결할까?

-   Static Binding
    -   서버 주소 Hard Coding
    -   간단하고 효율적
    -   서버 주소 변경에 약함.
-   Dynamic Binding
    -   주소 변경에 매우 유동적
    -   여분의 서버를 둬야 하는 단점.
        -   Name Server
        -   Load Balancer

![[assets/posts/img/2019-07-09-14-23-33.png]]

## 정리하며

#### RPC의 장점은?

-   비즈니스 로직에 집중할 수 있음.
-   다양한 언어를 가진 환경에서 쉽게 확장할 수 있음.
-   쉽게 인터페이스 협업이 가능함.

#### RPC의 단점은?

-   새로운 학습 비용이 듬.
-   사람의 눈으로 읽기 힘듬.

## Reference

-   [RPC의 역사](https://speakerdeck.com/caitiem20/a-brief-history-of-distributed-programming-rpc)
-   <http://www.cs.princeton.edu/~wlloyd/classes/599s15/slides/2_RPC_and_MapReduce.pdf>
-   <https://www.geeksforgeeks.org/operating-system-remote-procedure-call-rpc/>
-   <https://www.linuxjournal.com/article/2204>
-   <https://book.systemsapproach.org/e2e/rpc.html>
-   <https://www.slideshare.net/sandpoonia/5-26928882>
-   [비트윈 시스템 아키텍처](http://engineering.vcnc.co.kr/2013/04/between-system-architecture/)
-   [타다 시스템 아키텍처](http://engineering.vcnc.co.kr/2019/01/tada-system-architecture/)
