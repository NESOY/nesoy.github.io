---
aliases:
  - /articles/2017-02/JUnit
comments: false
date: 2017-02-01
description: 
tags:
  - JUnit
  - Testing
  - Java
title: JUnit
---
# JUnit
> TDD를 공부하던 중에 Java의 대표적인 Testing Framework인 JUnit에 대해 예전에 공부를 했었지만 잘 기억이 나지 않았다. JUnit의 어떠한 Method가 있는지 그 역할은 뭔지에 대해 정리하기 위해 포스트를 작성합니다.

## xUnit이란?
- 자바만 단위 테스팅 프레임 워크인 JUnit만 있는게 아니다. 다른 언어도 단위 테스트를 위한 프레임워크가 존재하며 보통 이름을 xUnit이라 칭한다.

xUnit이름 | 해당 언어 | 관련 사이트
--------------- | ----------------
CUnit | C | <http://cunit.sourceforge.net/>
CppUnit | C++ | <https://sourceforge.net/projects/cppunit/>
PHPUnit | PHp | <https://phpunit.de/>
PyUnit | Python | <http://pyunit.sourceforge.net/>
JUnit | Java | <http://junit.org/>

## 1. JUnit 환경구축하기
- Maven을 통해 쉽게 추가 할 수 있다.
- pom.xml에 dependency를 추가한다.
- JUnit Source : <https://mvnrepository.com/artifact/junit/junit>
- Compile Dependencies가 있는 JUnit은 hamcrest를 같이 추가해 주어야 한다.

![[assets/posts/20170201/1.PNG]]

- pom.xml의 모습

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.8.2</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest-all</artifactId>
        <version>1.1</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## 2. JUnit Assert관련 Method

Method | 내용
-------- | --------
assertArrayEquals(a,b) | 배열 a와b가 일치함을 확인한다.
assertEquals(a,b) | 객체 a와b의 값이 같은지 확인한다.
assertSame(a,b) | 객체 a와b가 같은 객체임을 확인한다.
assertTrue(a) | a가 참인지 확인한다.
assertFalse(a) | a가 거짓인기 확인한다.
assertNotNull(a) | a객체가 Null이 아님을 확인한다.

- 더 많은 assert관련 내용 : <http://junit.sourceforge.net/javadoc/org/junit/Assert.html>

## 3. JUnit Function Flow
- **setUp()** : 테스트 대상 클래스의 실행전에 가장 먼저 setUP()을 실행한다.
  - ex) 네트워크 연결, DB 연결에 활용한다.
- **tearDown()** : 가장 마지막에 수행되며 setUp()의 반대 개념으로 생각하면 된다.
  - ex) 네트워크 연결 종료, DB 연결을 종료하는데 활용한다.
- setUp()과 tearDown()은 **Test Case를 진행할때마다 반복적으로 실행된다.**
  - ex) setUp() -> TestA() -> tearDown() -> setUp() -> TestB() -> tearDown()

## 4. JUnit Annotation

- @Test : 해당 Method는 Test대상 메소드임을 의미한다.

```java
public class Example {
    @Test
    public void method() {
       org.junit.Assert.assertTrue( new ArrayList().isEmpty() );
    }
 }
```

- @BeforeClass : 해당 테스트가 시작 전에 딱 한 번씩만 수행되도록 지정한다.

```java
public class Example {
   @BeforeClass public static void onlyOnce() {
      ...
   }
   @Test public void one() {
      ...
   }
   @Test public void two() {
      ...
   }
}
```

- @AfterClass : 해당 테스트가 끝나고 딱 한 번씩만 수행되도록 지정한다.

```java
public class Example {
   DatabaseConnection database;
   @BeforeClass public static void login() {
         database= ...;
   }
   @Test public void something() {
         ...
   }
   @Test public void somethingElse() {
         ...
   }
   @AfterClass public static void logout() {
         database.logout();
   }
}
```

- @Before : 해당 테스트가 진행이 시작되기 전에 작업할 내용을 호출한다.

```java
public class Example {
   List empty;
   @Before public void initialize() {
      empty= new ArrayList();
   }
   @Test public void size() {
      ...
   }
   @Test public void remove() {
      ...
   }
}
```

- @After : 해당 테스트가 진행이 끝난 후에 작업할 내용을 호출한다.

```java
public class Example {
    File output;
    @Before public void createOutputFile() {
          output= new File(...);
    }
    @Test public void something() {
          ...
    }
    @After public void deleteOutputFile() {
          output.delete();
    }
 }
```

- @Ignore : TestCase를 무시할 수 있다.

```java
@Ignore
public class IgnoreMe {
  @Test public void test1() { ... }
  @Test public void test2() { ... }
}
```

- Flow

![[assets/posts/20170201/2.png]]


## Reference
- <http://www.nextree.co.kr/p11104/>
- <http://www.swtestacademy.com/junit-listeners/>
