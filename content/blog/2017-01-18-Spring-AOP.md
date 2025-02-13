---
title: Spring AOP
tags:
  - Spring
date: 2017-01-18
aliases: 
  - ../articles/2017-01/Spring-AOP
---

![[Assets/logo/spring.png]]

# **Spring AOP**

## AOP(Aspect Oriented Programming)이란?

> ### 기능을 핵심 Bussiness Logic과 공통 Module로 구분하고, 핵심 Logic에 영향을 미치지 않고 사이사이에 공통 Module(Security, Logging, Transaction)을 효과적으로 끼워넣도록 하는 개발 방법이다.

- Core Concerns : 핵심 Bussiness Logic
- Crosscutting Concerns : 공통 Module(Security, Logging, Transaction)

## AOP 용어정리

- ### joinPoint

  - **Crosscutting Concerns 모듈이 삽입되어 실행될 수 있는 특정 위치**
  - 제어 흐름중의 한 시점 Ex) Call Method, Return Method, Throw Exception...

- ### pointCut

  - **어떤 클래스의 어느 joinPoint를 사용할 것인지를 결정하는 선택 기능**
  - AOP가 항상 모든 조인포인트를 사용하는 것이 아니기에 사용해야할 모듈의 특정 조인포인트를 지정하는 역할
  - PointCut Expression Pattern -> @PointCut (" joinPoint ( ReturnType : Package : Class : Method : Arguments)")

```java
@Aspect
public class AspectUsingAnnotation {
    @Pointcut("execution(public * nesoy.aop.sample.*Sample.*(..))")
    public void targetMethod() {
      //함수 정의
    }
}
```

- ### Advise

  - **joinPoint에 삽입되어 동작할 수 있는 코드**

  - ### Advise type

    - Before : @Before : Method 실행 전에 적용되는 실행

      ```java
      @Aspect
      public class AspectUsingAnnotation {
      @Before("targetMethod()")
      public void beforeTargetMethod(JoinPoint thisJoinPoint) {
      //함수 정의
      }
      }
      ```

    - After : @After : Method 실행 후에 적용되는 실행

      ```java
      @Aspect
      public class AspectUsingAnnotation {
      ..
      @After("targetMethod()")
      public void afterTargetMethod(JoinPoint thisJoinPoint) {
          //함수 정의
      }
      }
      ```

    - After-Returning : @AfterReturning : Method가 정상적으로 Return한 경우에 실행

      ```java
      @Aspect
      public class AspectUsingAnnotation {
        @AfterReturning(pointcut = "targetMethod()", returning = "retVal")
        public void afterReturningTargetMethod(JoinPoint thisJoinPoint,Object retVal) {
          //함수 정의
        }
      }
      ```

    - After-Throwing : @AfterThrowing : Method가 예외가 발생하고 종료된 경우에 실행

      ```java
      @Aspect
      public class AspectUsingAnnotation {
      @AfterThrowing(pointcut = "targetMethod()", throwing = "exception")
      public void afterThrowingTargetMethod(JoinPoint thisJoinPoint,
              Exception exception) throws Exception {
          System.out.println("AspectUsingAnnotation.afterThrowingTargetMethod executed.");
          System.out.println("에러가 발생했습니다.", exception);

          throw new BizException("에러가 발생했습니다.", exception);
      }
      }
      ```

    - Around : @Around : Method의 이전과 이후에 적용되는 실행

      ```java
      @Aspect
      public class AspectUsingAnnotation {
      ..
      @Around("targetMethod()")
      public Object aroundTargetMethod(ProceedingJoinPoint thisJoinPoint)
            throws Throwable {
        System.out.println("AspectUsingAnnotation.aroundTargetMethod start.");
        long time1 = System.currentTimeMillis();
        Object retVal = thisJoinPoint.proceed();

        System.out.println("ProceedingJoinPoint executed. return value is [" + retVal + "]");

        retVal = retVal + "(modified)";
        System.out.println("return value modified to [" + retVal + "]");

        long time2 = System.currentTimeMillis();
        System.out.println("AspectUsingAnnotation.aroundTargetMethod end. Time(" + (time2 - time1) + ")");
        return retVal;
      }
      }
      ```

- ### Weaving ( = Crosscutting)

  - **joinPoint의 Advice에 Aspect를 주입하는 코드를 만드는 것**

- ### Aspect : @Aspect

  - **pointCut(어디에서) 무엇을 할 것인지(Advice)**
  - Java의 클래스처럼 Aspect 코드로 작성할 수 있다.

  ```java
  import org.aspectj.lang.annotation.Aspect;

    @Aspect
    public class AspectUsingAnnotation {
      //함수 정의
    }
  ```

## 참조

<http://isstory83.tistory.com/90>

<http://www.zdnet.co.kr/news/news_view.asp?artice_id=00000039147106&type=det>

<https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:rte:fdl:aop:aspectj>
