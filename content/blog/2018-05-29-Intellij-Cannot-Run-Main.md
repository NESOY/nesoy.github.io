---
title: Intellij에서 메인(Main)이 실행되지 않을 경우 해결방법.
tags:
  - Intellij
date: 2018-05-29
aliases: 
  - ../articles/2018-05/Intellij-Cannot-Run-Main
---

![[Assets/logo/Intellij.png]]


## 문제 정의
- Github, Bitbucket을 통해 Source Code 공유하게 됩니다.
- 공유하는 부분에 있어 .gitignore을 통해 IDE 설정파일을 제외합니다.
- Source Code만 내려받았을 경우 Intellij에서 실행되지 않는 점을 해결하고 기록하고자 합니다.

#### `.java`이지만 원래 보이던 형태가 아닌 경우

![[Assets/posts/20180529/1.png]]

#### 화살표가 없는 경우

![[Assets/posts/20180529/2.png]]

## 해결 방법
- **Mark Directory As -> Source Root** 를 지정하면 됩니다.

![[Assets/posts/20180529/3.png]]

## 결과 화면

![[Assets/posts/20180529/4.png]]


## Reference
- <https://stackoverflow.com/questions/30923909/unable-to-run-java-code-with-intellij-idea>

