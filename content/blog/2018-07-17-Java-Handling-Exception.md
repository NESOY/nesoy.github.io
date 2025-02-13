---
title: Java 예외 처리(Handling Exception)에 대해
tags:
  - Java
date: 2018-07-16
aliases: 
  - ../articles/2018-07/Java-Handling-Exception
---

![[Assets/logo/Java.jpg]]

## Exception catch 무시하지 않기
- catch에서 아무 코드도 없는건 바람직하지 않습니다.
- `Connection.close()`와 같은 이해하기 쉬운 코드는 괜찮습니다.
- `try-with-resources`를 사용하면 자동으로 자원을 반납하는 코드를 작성할 수 있습니다.


### Bad Example
```java
try {
    process();
} catch (IOException e) { // Bad Code

}
```

### try-with-resources Example
```java
// AutoCloseable인 경우 자동으로 Resource를 반환
try (BufferedReader br = new BufferedReader(new FileReader(path)) 
) {
        return br.readLine();
}
```

## 단순히 throw는 사용하지 않기
- catch에서 아무 작업도 없이 바로 throw를 하는 코드 또한 바람직하지 않습니다.

### Bad Example

```java
try {
    process();
} catch (IOException e) { // Bad Code
    throw e
}
```

- Exception을 무시하는 것보다는 났지만, 굳이 불필요한 코드만 추가한 것입니다.
- catch절에는 예외 흐름에 적합한 구현코드가 있어야 합니다. 
- Logging이나 Layer에 적합한 Exception 변환 등도 그 예입니다.

### Better Example
```java
try {
    process();
} catch (IOException e) { // Better Code
    log.error("Service Layer IOException {}", e.getMessage(), e);
    throw e
}
```

## e.printStackTrace() 대신 Logging Framework
- e.printStackTrace()은 제거하는게 좋습니다.
- Logging을 하고 싶다면 Logging Framework를 사용하는 편이 좋습니다.

### Java Logging Framework
- [sl4j](https://www.slf4j.org/)
- [commons logging](http://commons.apache.org/proper/commons-logging/)
- [log4j](http://logging.apache.org/log4j/2.x/)
- [logback](http://logback.qos.ch/)

### Web Logging 
- [Sentry](https://sentry.io/welcome/)
- [Logstash](https://www.elastic.co/kr/products/logstash)

### Bad Example
```java
try {
    process();
} catch (IOException e) {
    e.printStackTrace()
}
```

### Better Example
```java
try {
    process();
} catch (IOException e) {
    log.error("fail to process file", e);
}
```

- Tomcat에서 `e.printStackTrace()`로 콘솔에 찍힌 값은 `{TOMCAT_HOME}/logs/catalina.out` 에만 남습니다. 
- 로깅 프레임워크를 이용하면 파일을 쪼개는 정책을 설정할 수 있고, 여러 서버의 로그를 한곳에서 모아서 보는 시스템을 활용할 수도 있습니다.
- `log.error()`메서드에 Exception객체를 직접 넘기는 `e.printStackTrace()`처럼 Exception의 스택도 모두 남겨줍니다. 
- 에러의 추적성을 높이기 위해서는 `e.toString()`이나 `e.getMessage()`로 마지막 메시지만 남기기보다는 전체 에러 스택을 다 넘기는 편이 좋습니다.

## 추상화 Layer에 맞는 Exception 던지기
- `DAO`에서 `ServletException` 발생하거나, `Servlet`에서 `SQLException`을 처리하는것은 Layer별 역할에 맞지 않습니다. 
- 적절한 수준으로 추상화된 `Exception`을 정의하거나 `IllegalArgumentException` 같은 Java의 표준 Exception을 활용할 수도 있습니다. 
- Service layer에서는 Business 로직의 수준에 맞는 `custom exception`을 정의하는 것도 고려할만 합니다. 
- `cause exception`을 상위 Exception의 생성자에 넘기는 `exception chaning`기법도 확용할만 합니다.

### Example

```java
try {
    process(url);
} catch (IOException e) {
    throw new BankAccountExeption("fail to call " + url, e);
}
```

## java.lang.Exception 남용하지 않기
- `java.lang.Exception`은 자세한 Exception을 파악하기 어렵습니다.

### Bad Example

```java
public void updateUser throws Exception {

    ....
}
```

### Better Example

```java
public void updateUser throws NullPointerException {

    ....
}
```

- 정말 다른 Exception을 지정할것이 없을때 최후의 수단으로 씁니다. 
- 프레임워크에서는 checked exception에 대한 처리를 미루는 목적으로 사용하기도 합니다.
- 습관적으로 java.lang.Exception을 쓴다면 정교한 예외 처리를 할 수 없습니다.

## Unchecked exception 활용 검토
- Java의 Exception 처리는 C++로부터 도입되었지만 `checked exception`은 Java만의 독특한 특징입니다.
    - [Java Exception](https://nesoy.github.io/articles/2018-05/Java-Exception)
- 현 시점에서는 `unchecked exception`을 Defalut
- 특별한 이유가 있는 것만 `checked exception`을 활용하는 방식입니다.

## 에러 페이지 적절한 활용
- 과도하게 모든 예외를 catch할 필요는 없이, `RuntimeException`과 에러 페이지를 적절히 활용하는 방식이 보통입니다. 
- DBMS의 다운 같은 정상적이지 않는 상황은 에러페이지를 이용하고 어플리케이션에서는 공통적으로 catch를 하지는 않습니다.
- Spring의 `ExceptionResolver`등을 이용해서 예외처리를 한곳으로 모을수도 있습니다. 
- 물론 정교한 에러메시지나 그에 따른 별도의 화면 Flow가 필요할 때는 섬세하게 catch를 할 수도 있습니다. 
- 에러 페이지도 Business 언어 수준의 예외를 정의하고 거기에 맞는 페이지를 따로 준비하기도 합니다.



## Reference
- <https://www.slipp.net/questions/350>
- <https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html>
