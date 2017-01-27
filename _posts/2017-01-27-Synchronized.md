---
layout: post
title: Synchronous Vs Asynchronous(Edit)
categories: [Programming]
excerpt: ' '
comments: true
share: true
tags: [Programming]
date: 2017-01-18
---

# **Synchronous Vs Asynchronous**

> 예전에 Javascript를 공부하는 과정에 Synchronized와 Asynchronized의 차이점에 대해 공부를 했지만 다른 사람이 물어보았을때 차이점에 대해 명확히 설명할 수 없었기에 이렇게 블로그를 남긴다.

- Synchronized Vs Asynchronized에 대해 많은 자료를 찾아보았는데 Blocking & Non-Blocking에 대해서도 많이 언급되어 먼저 설명하겠다.

## **Blocking Vs Non-Blocking**
- Blocking & Non-Blocking는 프로그램의 실행하는 순서 관점에서 이해를 하면 좀 더 쉽게 이해할 수 있다.

## 1. Blocking I/O Model

![No Image](/assets/20170127/Blocking.jpg)

- Blocking I/O Model 에서는 **I/O 작업이 끝날때까지 대기해야 하고 함수가 Return하지 않는다.**

- 간단한 예로 C언어의 Scanf()를 생각한다면 프로그램은 사용자가 입력하기 전까지 대기한 상태로 Scanf는 Return하지 않는 모습을 알 수 있다.

## 2. Non-Blocking I/O Model

![No Image](/assets/20170127/Non-Blocking.jpg)

- Non-Blocking I/O Model 에서는 **I/O 작업을 완료할 수 있다면 완료하고 그렇지 않으면 대기하지 않고 Return 해버린다.**

### **Blocking Vs Non-Blocking**
- 가장 큰 차이점은 I/O 작업의 끝을 기다리느냐 아니면 기다리지 않고 바로 Return하는 점이다.

## **Synchronous Vs Asynchronous**
- Synchronous & Asynchronous은 결과물(Return 값)을 돌려받는 시점에 초점을 두면 이해를 하면 좀 더 쉽게 이해를 할 수 있다.

## 3. Synchronous
-


## 참고

<http://www.ibm.com/developerworks/linux/library/l-async/>

<http://www.slideshare.net/unitimes/sync-asyncblockingnonblockingio>

<http://www.slideshare.net/namhyeonuk90/tcp-ip-io-model>

<http://devsw.tistory.com/142>

<http://stackoverflow.com/questions/8416874/whats-the-differences-between-blocking-with-synchronous-nonblocking-and-asynch>
