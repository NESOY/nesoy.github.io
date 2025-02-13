---
title: Intellij 테스트 자동 실행하기
tags:
  - Intellij
date: 2019-07-26
aliases: 
  - ../articles/2019-07/Intellij-Infinitest
---

## 들어가며
> 테스트를 자동으로 실행시켜주는 툴을 사용해서 보다 좋은 테스트 코드를 작성하기를 바랍니다 :)

## infinitest 플러그인
![[Assets/posts/img/2019-07-26-16-27-34.png]]

- JVM 테스트 자동 실행 플러그인

### How to install?
![[Assets/posts/img/2019-07-26-16-03-54.png]]


### infinitest Setting
- 해당 프로젝트 모듈로 추가해야 실행 가능합니다.

![[Assets/posts/img/2019-07-26-16-07-47.png]]


- class 파일을 감지하여 실행하기 때문에 자동 빌드 옵션을 설정합니다.
    - `Preference -> Build, Execution, Deployment -> Compiler`

![[Assets/posts/img/2019-07-26-16-22-38.png]]


- Save Action을 활용하면 테스트뿐만 아니라 자동 포맷팅도 사용할 수 있습니다.
    - [Intellij Code Convention 자동화하기](https://nesoy.github.io/articles/2018-09/Intellij-Auto-Convention)

![[Assets/posts/img/2019-07-26-16-23-13.png]]

#### 성공 화면
![[Assets/posts/img/2019-07-26-16-25-13.png]]

#### 실패 화면
![[Assets/posts/img/2019-07-26-16-25-53.png]]

## Reference
