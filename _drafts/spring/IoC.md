---
layout: post
title: IoC이란?
excerpt: ''
categories:
- language
tags:
- language
date: 2021-05-19
---
## IoC(Inversion Of Control)이란?
- 제어의 역전
    - 일반 오브젝트는 생성과 소멸, 의존관계를 결정하는 것을 모두 포기한다.
    - 생성과 소멸, 의존관계 이 모든 것을 다른 대상에게 위임한다.

#### Hollywood Principle
> Do not call us, we call you

- 일반적인 호출 관계
    - 비즈니스 코드 -> 라이브러리 코드
- IoC 호출 관계
    - 프레임워크 코드 -> 비즈니스 코드

- <https://johngrib.github.io/wiki/hollywood-principle/>

#### IoC의 역사

![No Image](/assets/posts/img/2021-05-19-17-02-26.png)

- <http://picocontainer.com/inversion-of-control-history.html>

#### IoC의 여러 가지 방법
- 생성자 주입(Constructor Dependency Injection)

```java
public interface Orange {
  // methods
}

public class AppleImpl implements Apple {
  private Orange orange;
  public AppleImpl(Orange orange) {
    this.orange = orange;
  }
  // other methods
}

```

- Setter Dependency Injection

```java
public interface Orange {
  // methods
}
public class AppleImpl implements Apple {
  private Orange orange;
  public void setOrange(Orange orange) {
    this.orange = orange;
  }
  // other methods
}
```

- Contextualized Dependency Lookup (Push Approach)
```java
public interface Orange {
  // methods
}
public class AppleImpl implements Apple, DependencyProvision {
  private Orange orange;
  public void doDependencyLookup(DependencyProvider dp) throws DependencyLookupExcpetion{
    this.orange = (Orange) dp.lookup("Orange"); // Service Locator
  }
  // other methods
}
```


## Reference
- <https://www.journaldev.com/2394/java-dependency-injection-design-pattern-example-tutorial#java-dependency-injection-8211-service-components>
- <https://johngrib.github.io/wiki/inversion-of-control/>