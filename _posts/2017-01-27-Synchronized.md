---
layout: post
title: Synchronous(동기) Vs Asynchronous(비동기)
categories: [Programming]
excerpt: ' '
comments: true
share: true
tags: [Programming,Synchronous,Asynchronous]
date: 2017-01-27
---

# **Synchronous(동기) Vs Asynchronous(비동기)**

> 예전에 Javascript를 공부하는 과정에 Synchronized와 Asynchronized의 차이점에 대해 공부를 했지만 다른 사람이 물어보았을때 차이점에 대해 명확히 설명할 수 없었기에 이렇게 블로그를 남긴다.

- Synchronous Vs Asynchronous에 대해 많은 자료를 찾아보았는데 Blocking & Non-Blocking에 대해서도 많이 언급되어 먼저 설명하겠다.

## **Blocking Vs Non-Blocking**

- Blocking & Non-Blocking는 프로그램의 실행하는 순서 관점에서 이해를 하면 좀 더 쉽게 이해할 수 있다.

### 1. Blocking I/O Model

![No Image](/assets/20170127/Blocking.jpg)

- Blocking I/O Model 에서는 **System Call이 끝날때까지 프로그램은 대기해야 하고 System Call이 완료가 되면 그때야 Return 한다.**

- Wait Queue에 들어간다.

- 간단한 예로 C언어의 Scanf()를 생각한다면 프로그램은 사용자가 입력하기 전까지 대기한 상태로 Scanf는 Return하지 않는 모습을 알 수 있다.

### 2. Non-Blocking I/O Model

![No Image](/assets/20170127/Non-Blocking.jpg)

- Non-Blocking I/O Model 에서는 **System Call이 완료되지 않아도 대기하지 않고 Return 해버린다.**

- Wait Queue에 들어가지 않는다.

#### Blocking Vs Non-Blocking 차이점

- 가장 큰 차이점은  **프로그램이 바로 실행할 수 있는 유무가 다르다.**

## **Synchronous Vs Asynchronous**

- Synchronous & Asynchronous은 결과물을 돌려받는 시점에 초점을 두면 좀 더 쉽게 이해를 할 수 있다.

### 3. Synchronous

![No Image](/assets/20170127/Synchronous.jpg)

- Synchronous 에서는 **System Call이 끝날때까지 기다리고 결과물을 가져온다.**

### 4. Asynchronous

![No Image](/assets/20170127/ASynchronous.jpg)

- Asynchronous 에서는 **System Call이 완료되지 않아도 나중에 완료가 되면 그때 결과물을 가져온다.**

- 주로 Callback 함수를 통해 결과물을 가져온다.

#### Synchronous Vs Asynchronous 차이점

- 가장 큰 차이점은 **결과물을 가저오는 시점이 다르다.**

### 5. Non-Blocking Vs ASynchronous 차이점

*System Call이 즉시 Return될 때 데이터의 포함 유무*

- Asynchronous은 **요청에 처리 완료와 관계없이 응답한다. 이후 운영체제에서 응답할 준비가 되면 응답한다.**

- Non-Blocking은 **요청에 처리할 수 있으면 바로 응답하고 아니면 Error를 반환한다.**

### 6. Blocking Vs Synchronous 차이점

*Wait Queue 유무*

- Blocking은 **System Call의 Return을 기다리는 동안 필수로 Wait Queue에 머문다.**

- Synchronous은 **System Call의 Return을 기다리는 동안 Wait Queue에 머물 수도 아닐 수도 있다.**

## 참고

<http://www.ibm.com/developerworks/linux/library/l-async/>

<http://www.slideshare.net/unitimes/sync-asyncblockingnonblockingio>

<http://www.slideshare.net/namhyeonuk90/tcp-ip-io-model>

<http://www.gpgstudy.com/forum/viewtopic.php?f=8&t=14985>

<http://devsw.tistory.com/142>

<http://stackoverflow.com/questions/8416874/whats-the-differences-between-blocking-with-synchronous-nonblocking-and-asynch>

<https://msdn.microsoft.com/ko-kr/library/windows/desktop/aa365683(v=vs.85).aspx>
