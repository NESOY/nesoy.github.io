---
title: JVM, JRE, JDK에 대해
tags:
  - Java
date: 2020-10-05
aliases: 
  - ../articles/2020-10/Jvm-Jre-Jdk
---

![[Assets/logo/Java.jpg]]

## JVM, JRE, JDK에 대해
### JVM(Java Virtual Machine)
- 컴파일된 자바 바이트 코드(.class)를 OS에 특화된 언어로 변환(인터프리터와 JIT 컴파일러)하여 실행해주는 역할을 하고 있다.
- 바이트 코드를 실행하는 표준의 의미
    - [Java SE](https://docs.oracle.com/javase/specs/index.html)
- 바이트 코드를 실행하는 표준을 구현한 구현체도 JVM이라는 용어로 표현하기도 한다.
    - Oracle
    - [Amazon-corretto](https://aws.amazon.com/ko/corretto/)
    - [Azul](https://kr.azul.com/)
    - [AdoptOpenJDK](https://adoptopenjdk.net/)

#### JVM의 종류에 대해
- JVM도 회사에 따라 구현이 다를 수 있으므로 여러가지 종류를 가지고 있다.
    - 구현체마다 옵션이 다를수도 있으니 잘 찾아보자.
- Hotspot
    - 우리가 가장 많이 사용하고 흔히 보는 Hotspot이다.
    - [HotSpot Runtime Overview](https://openjdk.java.net/groups/hotspot/docs/RuntimeOverview.html)
    - [The Java HotSpot Performance Engine Architecture](https://www.oracle.com/technetwork/java/whitepaper-135217.html)
    - <https://blog.naver.com/2feelus/220738480797>
- [openJ9](https://www.eclipse.org/openj9/)
    - IBM, Eclipse 재단의 OpenJDK용 JVM
    - <https://kwonnam.pe.kr/wiki/java/openj9>

#### JRE(Java Runtime Environment)
- 자바 애플리케이션을 실행할 수 있도록 구성된 배포판이다.
- JVM을 포함하는 패키지로 볼 수 있고, JVM뿐만 아니라 자바 런타임 환경에서 사용하는 프로퍼티 세팅이나 리소스 파일을 가지고 있다.
- JRE는 JVM이 자바 프로그램을 동작시킬 때 필요한 라이브러리 파일들과 기타 파일들을 가지고 있다.
    - JRE는 JVM의 실행환경을 구현했다고 할 수 있다.

#### JDK(Java Development Kit)
- JRE + 개발에 필요한 도구들을 포함한 패키지를 말한다.
- [Java 개발 Tool list](https://docs.oracle.com/javase/8/docs/technotes/tools/)
- Example
    - javadoc
    - jar
    - javap
    - jconsole
    - javac
