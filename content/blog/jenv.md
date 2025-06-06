---
aliases: [/articles/2019-07/jenv]
comments: false
date: 2019-07-03
description: 
tags: [Java]
title: jenv 설치 및 사용하기
---
# jenv 설치 및 사용하기
## [jenv란?](https://www.jenv.be/)

-   다양한 Java version을 하나의 컴퓨터에서 사용하는 상황에서는 매우 복잡함이 있습니다.
-   [python의 pyenv](https://github.com/pyenv/pyenv)가 있듯이 Java의 Version을 관리하는 도구입니다.

### jenv 설치 및 사용하기

```bash
brew install jenv
```

#### .zshrc에 추가하기

```bash
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

#### .zshrc 활성화시키기

```bash
source ~/.zshrc
```

#### 최신 Java 설치하기

```bash
brew cask info java
```

![[assets/posts/img/2019-07-03-18-26-34.png]]

#### Java 8 설치

-   brew로 쉽게 설치하던 시절은 지났습니다.. - [그래도 설치하시겠다면?](https://github.com/Homebrew/homebrew-cask-versions/issues/7253#issuecomment-484356654)

### 설치된 Java 확인하기

-   `/Library/Java/JavaVirtualMachines`

![[assets/posts/img/2019-07-03-18-45-50.png]]

#### Jenv에 Java Version 추가하기

![[assets/posts/img/2019-07-03-18-47-42.png]]

#### 추가된 Java Version 확인하기

![[assets/posts/img/2019-07-03-18-49-08.png]]

### Jenv 사용하기

#### Global로 사용하기

-   `jenv global oracle64-1.8.0.211`

#### Local로 사용하기

-   `jenv local oracle64-10.0.2`

## Reference

-   [여러 개의 JDK를 설치하고 선택해서 사용하기](https://blog.benelog.net/installing-jdk.html)
-   [Mac에 Java 여러 버전 설치 & 사용하기 - jojoldu](https://jojoldu.tistory.com/329)
