---
layout: post
title: JUnit Test 순서 제어하기
excerpt: ' '
categories:
  - Testing
tags:
    - Testing
    - JUnit
date: 2019-02-13
---


![No Image](/assets/logo/JUnit.png)


## 들어가며
- JUnit Test case들이 랜덤하게 진행하기보단 특정한 순서대로 진행하는 방법이 있어 작성합니다.



## JUnit Test 순서 제어하기

### Example
![No Image](/assets/posts/20190213/1.png)

### Result
![No Image](/assets/posts/20190213/2.png)

### How to use?
```java
@FixMethodOrder(MethodSorters.SORT방식)
MethodSorters.DEFAULT
MethodSorters.JVM
MethodSorters.NAME_ASCENDING
```

## Reference
- <https://github.com/junit-team/junit4/wiki/test-execution-order>
- <https://www.baeldung.com/junit-5-test-order>