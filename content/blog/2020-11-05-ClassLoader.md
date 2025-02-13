---
title: ClassLoader에 대해
tags:
  - Java
date: 2020-11-05
aliases: 
  - ../articles/2020-11/ClassLoader
---

## Java ClassLoader이란?
- JVM에서 동작하는 모든 Class들은 참조되는 순간 동적으로 Load 및 Link가 이루어진다.
- ClassLoader는 클래스들을 동적으로 메모리에 로딩할 책임을 가지고 있다.

#### Class Load 방식에 대해
- Load Time Dynamic Loading
    - 하나의 클래스를 로딩하는 과정에서 필요한 다른 클래스를 한번에 로딩하는 것을 말한다.
- Run Time Dynamic Loading
    - Reflection과 같은 실제로 메소드가 실행될때 로딩하는 것을 말한다.

### ClassLoader 과정에 대해
![[Assets/posts/img/2020-11-05-19-48-23.png]]
#### Loading
- 클래스 로더가 .class 파일을 읽고, 그 내용에 따라 적절한 바이너리 데이터를 만들고 메소드 영역에 저장하는 행위
    - Loading하면서 JVM 스펙이 맞는지 확인
    - Java Version 확인

#### Linking
- 총 세 단계로 나눠져 있다.
- Verify
    - JVM에서 사용이 가능한 형태인지를 검증하는 작업
    - 해당 비용이 매우 크기 때문에 옵션을 통해 Disabled 할 수 있다.
        - -Xverify:none 옵션으로 끌 수 있음.
            - openjdk13 에서 해당 옵션 deprecated
            - <https://bugs.openjdk.java.net/browse/JDK-8218003>
- Preparation
    - Type이 필요로 하는 Memory를 할당해 주는 작업
- Resolution
    - 심볼릭 메모리 레퍼런스를 메소드 영역에 있는 실제 레퍼런스로 교체한다. 이 과정은 Optional이다.
    - Constant Pool의 Symbolic Reference를 Direct Reference, 즉 실제 메모리 주소 값으로 변경해 주는 작업을 의미

#### Initialization
- Static 변수의 값을 할당한다. (static 블럭이 있다면 이때 실행된다.)
- SuperClass 초기화를 진행한다.
- SuperClass를 초기화한 후 해당 Class의 초기화를 진행한다.

#### ClassLoader 종류
- 클래스 로더는 계층 구조로 이뤄져 있으며 기본적으로 세가지 클래스 로더가 제공된다.
- Bootstrap ClassLoader
    - 최상위 우선순위를 가진 클래스 로더
    - jre/lib/rt.jar을 로딩한다.
        - 네이티브 코드로 구현되어 있다.
- Extension ClassLoader
    - jre/lib/ext에 포함된 클래스 파일을 로딩한다.
- Application ClassLoader
    - 애플리케이션 클래스패스(애플리케이션 실행할 때 주는 -classpath 옵션 또는 java.class.path 환경 변수의 값에 해당하는 위치)에서 클래스를 읽는다.


#### ClassLoader Principle
- Delegation
    - 클래스로딩 작업을 상위 클래스로더에 위임한다.
- Visibility
    - 하위 클래스로더는 상위 클래스로더의 내용을 볼 수 있지만 반대로는 볼 수 없다.
    - Tomcat ClassLoading
        - <https://tomcat.apache.org/tomcat-9.0-doc/class-loader-howto.html>
- Uniquesness
    - 하위 클래스로더는 상위 클래스로더가 로딩한 클래스를 다시 로딩하지 않게 해서 로딩된 클래스의 유일성을 보장한다.


#### 확인해보자
```java
java -verbose:class HelloWorld
```

#### ClassLoader관련 Quiz
- <https://whiteship.tistory.com/2578?category=56999>

#### 왜 클래스 로더들은 여러개여야 하는가?
- <https://stackoverflow.com/questions/10828863/what-is-the-use-of-custom-class-loader>

#### Java9의 ClassLoader 변화
- <https://www.tutorialspoint.com/what-are-the-changes-of-class-loaders-in-java-9>

## Reference
- <https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html>
- <https://homoefficio.github.io/2018/10/13/Java-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%A1%9C%EB%8D%94-%ED%9B%91%EC%96%B4%EB%B3%B4%EA%B8%B0/>
- <https://javacan.tistory.com/entry/1>
- <https://mia-dahae.tistory.com/97>
- <https://futurists.tistory.com/43>
- <https://www.slideshare.net/novathinker/4-class-loader>
- <https://www.slipp.net/wiki/pages/viewpage.action?pageId=8880262>
- <https://www.slipp.net/wiki/pages/viewpage.action?pageId=8880295>
