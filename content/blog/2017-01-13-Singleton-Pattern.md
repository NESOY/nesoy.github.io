---
title: Singleton Pattern(싱글턴 패턴)
tags:
  - Design Pattern
date: 2017-01-13
aliases: 
  - ../articles/2017-01/Singleton-Pattern
---

![[Assets/logo/design-pattern.jpg]]

# **Singleton Pattern**

Spring을 공부하던 도중에 Container가 Default로 빈(Bean) 들을 Singleton Pattern으로 관리한다는 사실을 알았다.



> 싱글턴 패턴(Singleton pattern)을 따르는 클래스는, 생성자가 여러 차례 호출되더라도 **실제로 생성되는 객체는 하나** 이고 최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.

## Eager initialization

- 클래스 로딩 시점에 미리 객체를 생성하는 방법이다.

```java
public class SingletonTest{
  private static SingletonTest instance = new SingletonTest();

  private SingletonTest(){
    System.out.println("Constructor");
  }

  public static SingletonTest getInstance(){
    return instance;
  }

  public void testPrint(){
    System.out.println("Method");
  }
}
```

## Static block initialization

- 클래스 로딩 시점에 미리 객체를 생성하는 방법이다.

- 변수 셋팅 및 에러처리를 위한 구문을 담을 수 있다.

```java
public class SingletonTest{
  private static SingletonTest instance;
  private SingletonTest(){}

  static{
    try{
      System.out.println("instance Create");
      instance = new SingletonTest();
    }catch(Exception e){
      throw new RuntimeException("Exception Creating SingletonTest");
    }
  }

  public static SingletonTest getInstance(){
    return instance;
  }

  public void testPrint(){
    System.out.println("Method");
  }
}
```

## lazy initialization

- 인스턴스가 사용되는 시점에 인스턴스를 만든다.

- Multi Thread 방식에 Singleton 보장이 되지 않는다.

```java
public class SingletonTest{
  private static SingletonTest instance;
  private SingletonTest(){}

  public static SingletonTest getInstance(){
    if( instance == null)
      instance = new SingletonTest();
    return instance;
  }

  public void testPrint(){
    System.out.println("Method");
  }
}
```

## thread safe initalization

- 인스턴스가 사용되는 시점에 인스턴스를 만든다.

- getInstance()에 Lock을 하는 방식이라 속도가 느리다.

```java
public class SingletonTest{
  private static SingletonTest instance;
  private SingletonTest(){}

  public static synchronized SingletonTest getInstance(){
    if( instance == null)
      instance = new SingletonTest();
    return instance;
  }

  public void testPrint(){
    System.out.println("Method");
  }
}
```

## enum initialization

- Effective Java 책에 소개되었던 방식이다.

- enum Type이 한번만 초기화 되는 점을 이용하였다.

```java
public enum SingletonTest {
	INSTANCE;
	public static SingletonTest getInstance() {
		return INSTANCE;
	}
}
```


## Reference
- <https://ko.wikipedia.org/wiki/%EC%8B%B1%EA%B8%80%ED%84%B4_%ED%8C%A8%ED%84%B4>
- <https://blog.seotory.com/post/2016/03/java-singleton-pattern>
- <https://madplay.github.io/post/singleton-pattern>
