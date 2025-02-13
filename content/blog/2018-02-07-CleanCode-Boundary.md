---
title: Clean Code - 경계(Boundary)
tags:
  - CleanCode
date: 2018-02-07
aliases: 
  - ../articles/2018-02/CleanCode-Boundary
---
![[Assets/posts/20171211/cleancode.jpg]]

# 경계
> 어떤 식으로든 외부 코드를 우리 코드에 깔끔하게 통합해야만 한다.

## 외부 코드 사용하기
- 패키지 제공자나 프레임워크 제공자는 적용성을 최대한 넓히려 애쓴다.(더 많은 환경/ 더 많은 고객 -> $)
- 사용자는 자신의 요구에 집중하는 인터페이스만 바란다.

### java.util.Map
- 다양한 기능과 유연성은 유용하지만 그만큼 위험하다.

|Figure 8-1. The methods of Map|
|---|
|clear() void – Map|
|containsKey(Object key) boolean – Map|
|containsValue(Object value) boolean – Map|
|clear() void – Map|
|containsKey(Object key) boolean – Map|
|containsValue(Object value) boolean – Map|
|entrySet() Set – Map|
|equals(Object o) boolean – Map|
|get(Object key) Object – Map|
|getClass() Class<? extends Object> – Object|
|hashCode() int – Map|
|isEmpty() boolean – Map|
|keySet() Set – Map|
|notify() void – Object|
|notifyAll() void – Object|
|put(Object key, Object value) Object – Map|
|putAll(Map t) void – Map|
|remove(Object key) Object – Map|
|size() int – Map|
|toString() String – Object|
|values() Collection – Map|
|wait() void – Object|
|wait(long timeout) void – Object|
|wait(long timeout, int nanos) void – Object|

만약 우리가 Sensor클래스를 저장하는 Map객체를 사용한다면 다음과 같은 형태일 것이다.
```java
Map sensors = new HashMap();
Sensor s = (Sensor) sensors.get(sensorId);
```
- 이와 같은 방식은 Sensor클래스를 사용하는 코드 전반에 걸쳐 빈번히 사용된다.
- 하지만 이는 사용되는 곳에서 `캐스팅의 부담`을 안게 된다. 그리고 적절한 문맥조차 줄 수 없다.


이는 아래와 같이 generic을 사용함으로써 해결할 수 있다.
```java
Map<String, Sensor> sensors = new HashMap<String, Sensor>();
Sensor s = sensors.get(sensorId);
```
하지만 이 방법 또한 Map객체가 필요 이상의 기능을 제공하는 것은 막지 못한다.


Map의 인터페이스가 바뀌거나 할 경우 또한 우리 코드의 많은 부분들이 바뀌어야 한다.
인터페이스가 바뀔 일이 별로 없을 것이라 생각할 지도 모르지만, 실제로 Java 5버전에서 generic이 추가되었을 때 Map의 인터페이스가 바뀐 사례가 있다.

> 결국 제일 좋은 방법은 Wrapping이다.

모든 Map을 이런 식으로 Wrapping하라는 말은 아니다.
다만 Map과 같은 "경계에 있는 인터페이스"를 시스템 전반에 걸쳐 돌려가며 사용하지 말고
- 해당 객체를 사용하는 클래스 내부에 넣던지 가까운 계열의 클래스에 넣어라.
- 공개된 api에서 인자로 받거나 리턴하지 마라.

```java
public class Sensors {
    // 경계의 인터페이스(이 경우에는 Map의 메서드)는 숨겨진다.
    // Map의 인터페이스가 변경되더라도 여파를 최소화할 수 있다. 예를 들어 Generic을 사용하던 직접 캐스팅하던 그건 구현 디테일이며 Sensor클래스를 사용하는 측에서는 신경쓸 필요가 없다.
    // 이는 또한 사용자의 목적에 딱 맞게 디자인되어 있으므로 이해하기 쉽고 잘못 사용하기 어렵게 된다.

    private Map sensors = new HashMap();

    public Sensor getById(String id) {
        return (Sensor)sensors.get(id);
    }
}
```

## 경계 살피고 익히기
- 서드파티를 익히기도 어렵고. 통합하기도 어렵다. 이 두 가지를 동시에 하기는 두 배나 어렵다.
- 서드파티 코드를 사용할 때, 곧바로 서드파티 코드를 사용하지 말고, 그 코드를 이해하기 위해 테스트를 작성할 수 있다.(짐 뉴커크는 이를 `학습테스트`라고 부른다.)


## log4j 익히기
```java
    // 1.
    // 우선 log4j 라이브러리를 다운받자.
    // 고민 많이 하지 말고 본능에 따라 "hello"가 출력되길 바라면서 아래의 테스트 코드를 작성해보자.
    @Test
    public void testLogCreate() {
        Logger logger = Logger.getLogger("MyLogger");
        logger.info("hello");
    }

    // 2.
    // 위 테스트는 "Appender라는게 필요하다"는 에러를 뱉는다.
    // 조금 더 읽어보니 ConsoleAppender라는게 있는걸 알아냈다.
    // 그래서 ConsoleAppender라는 객체를 만들어 넣어줘봤다.
    @Test
    public void testLogAddAppender() {
        Logger logger = Logger.getLogger("MyLogger");
        ConsoleAppender appender = new ConsoleAppender();
        logger.addAppender(appender);
        logger.info("hello");
    }

    // 3.
    // 위와 같이 하면 "Appender에 출력 스트림이 없다"고 한다.
    // 이상하다. 가지고 있는게 이성적일것 같은데...
    // 구글의 도움을 빌려, 다음과 같이 해보았다.
    @Test
    public void testLogAddAppender() {
        Logger logger = Logger.getLogger("MyLogger");
        logger.removeAllAppenders();
        logger.addAppender(new ConsoleAppender(
            new PatternLayout("%p %t %m%n"),
            ConsoleAppender.SYSTEM_OUT));
        logger.info("hello");
    }

    // 성공했다. 하지만 ConsoleAppender를 만들어놓고 ConsoleAppender.SYSTEM_OUT을 받는건 이상하다.
    // 그래서 빼봤더니 잘 돌아간다.
    // 하지만 PatternLayout을 제거하니 돌아가지 않는다.
    // 그래서 문서를 살펴봤더니 "ConsoleAppender의 기본 생성자는 unconfigured상태"란다.
    // 명백하지도 않고 실용적이지도 않다... 버그이거나, 적어도 "일관적이지 않다"고 느껴진다.

```


```java

// 조금 더 구글링, 문서 읽기, 테스트를 거쳐 log4j의 동작법을 알아냈고 그것을 간단한 유닛테스트로 기록했다.
// 이제 이 지식을 기반으로 log4j를 래핑하는 클래스를 만들수 있다.
// 나머지 코드에서는 log4j의 동작원리에 대해 알 필요가 없게 됐다.

public class LogTest {
    private Logger logger;

    @Before
    public void initialize() {
        logger = Logger.getLogger("logger");
        logger.removeAllAppenders();
        Logger.getRootLogger().removeAllAppenders();
    }

    @Test
    public void basicLogger() {
        BasicConfigurator.configure();
        logger.info("basicLogger");
    }

    @Test
    public void addAppenderWithStream() {
        logger.addAppender(new ConsoleAppender(
            new PatternLayout("%p %t %m%n"),
            ConsoleAppender.SYSTEM_OUT));
        logger.info("addAppenderWithStream");
    }

    @Test
    public void addAppenderWithoutStream() {
        logger.addAppender(new ConsoleAppender(
            new PatternLayout("%p %t %m%n")));
        logger.info("addAppenderWithoutStream");
    }
}
```

## "학습 테스트(Learning test)"는 공짜 이상이다.
- 메인 로직에 영향을 주지 않으며 서드파티 코드를 이해할 수 있다.
- 서드파티 코드가 바뀔 경우 Learning test를 돌려 "아직 우리가 필요한 기능이 잘 동작하는지" 테스트할 수 있다.
- Learning test를 하던 말던, 경계 테스트는 `새 버전으로의 이전`에 도움을 준다.


## 아직 존재하지 않는 코드 사용하기
아직 개발되지 않은 모듈이 필요한데, 기능은 커녕 인터페이스조차 구현되지 않은 경우가 있을 수 있다.

하지만 우리는 이러한 제약때문에 우리의 구현이 늦어지는걸 탐탁치 않게 여긴다.
### 예시
- 저자는 무선통신 시스템을 구축하는 프로젝트를 하고 있었다.
- 그 팀 안의 하부 팀으로 "송신기"를 담당하는 팀이 있었는데 나머지 팀원들은 송신기에 대한 지식이 거의 없었다.
- "송신기"팀은 인터페이스를 제공하지 않았다. 하지만 저자는 "송신기"팀을 기다리는 대신 "원하는" 기능을 정의하고 `인터페이스`로 만들었다. [지정한 주파수를 이용해 이 스트림에서 들어오는 자료를 아날로그 신호로 전송하라]
- 이렇게 인터페이스를 정의함으로써 메인 로직을 더 깔끔하게 짤 수 있었고 목표를 명확하게 나타낼 수 있었다.(참조 1)

![[Assets/posts/20180207/adapterPattern.png]]

```java
public interface Transimitter {
    public void transmit(SomeType frequency, OtherType stream);
}

public class FakeTransmitter implements Transimitter {
    public void transmit(SomeType frequency, OtherType stream) {
        // 실제 구현이 되기 전까지 더미 로직으로 대체
    }
}

// 경계 밖의 API
public class RealTransimitter {
    // 캡슐화된 구현
    ...
}

public class TransmitterAdapter extends RealTransimitter implements Transimitter {
    public void transmit(SomeType frequency, OtherType stream) {
        // RealTransimitter(외부 API)를 사용해 실제 로직을 여기에 구현.
        // Transmitter의 변경이 미치는 영향은 이 부분에 한정된다.
    }
}

public class CommunicationController {
    // Transmitter팀의 API가 제공되기 전에는 아래와 같이 사용한다.
    public void someMethod() {
        Transmitter transmitter = new FakeTransmitter();
        transmitter.transmit(someFrequency, someStream);
    }

    // Transmitter팀의 API가 제공되면 아래와 같이 사용한다.
    public void someMethod() {
        Transmitter transmitter = new TransmitterAdapter();
        transmitter.transmit(someFrequency, someStream);
    }
}
```

- Adapter Pattern으로 API 사용을 캡슐화해 API가 바뀔 때 수정할 코드를 한곳으로 모았다.
- API인터페이스가 나온 다음 경계 테스트 케이스를 생성해 우리가 API를 올바르게 사용하는지 테스트할 수도 있다.

## 깨끗한 경계
- 좋은 소프트웨어 디자인은 변경이 생길 경우 많은 재작업 없이 변경을 반영할 수 있는 디자인이다.
- 경계에 위치하는 코드는 깔끔히 분리한다.
- 기대치를 정의하는 테스트 케이스도 작성한다.
- 직접 호출하는 코드를 가능한 줄여 경계를 관리하자.
