---
title: JUnit Test 순서 제어하기
description: 
aliases: [/articles/2019-02/JUnit-Test-Ordering]
date: 2019-02-13
tags: [JUnit, Testing]
comments: true
---
# JUnit Test 순서 제어하기
## 들어가며
- JUnit Test case들이 랜덤하게 진행하기보단 특정한 순서대로 진행하는 방법이 있어 작성합니다.

## JUnit Test 순서 제어하기

### Example
![[assets/posts/20190213/1.png]]

### Result
![[assets/posts/20190213/2.png]]

### How to use?
```java
@FixMethodOrder(MethodSorters.SORT방식)
MethodSorters.DEFAULT
MethodSorters.JVM
MethodSorters.NAME_ASCENDING
```

## Reference
- <https://github.com/junit-team/junit4/wiki/test-execution-order>
