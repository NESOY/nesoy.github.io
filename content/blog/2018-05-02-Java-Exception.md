---
title: Java 예외(Exception)에 대해
tags:
  - Java
date: 2018-05-02
aliases: 
  - ../articles/2018-05/Java-Exception
---

![[Assets/logo/Java.jpg]]

# Exception에 대해

![[Assets/posts/20180502/1.png]]

## Error와 Exception이란?
### Error
- 시스템에 비정상적인 상황이 생겼을 때 발생합니다.
- System Level에서 발생하기 때문에 심각한 수준의 오류이기 때문에 System에서 Error에 대한 처리를 합니다.

### Exception
- 개발자가 구현한 로직에서 발생합니다.
- 그렇기 때문에 미리 예측하여 처리 할 수 있는 상황이고, 그에 따른 처리 방법을 명확히 알고 적용하는 것이 중요합니다.


## Checked Exception과 UnChecked(Runtime) Exception차이에 대해
### Checked Exception
- 반드시 예외를 처리해야 합니다.
- 컴파일 단계에서 확인할 수 있습니다.
- 예외발생시 `roll-back`을 하지 않습니다.
- IOException / SQLException / FileNotFoundException
#### Example
- 간단한 FileReader를 선언했지만 Exception 처리를 컴파일 단계에서 요구하고 있습니다.

![[Assets/posts/20180502/2.png]]

- Exception 처리를 한 코드 모습입니다.

![[Assets/posts/20180502/3.png]]

### UnChecked Exception
- 반드시 예외를 처리하지 않아도 됩니다.
- Runtime에서 확인할 수 있습니다.
- 예외발생시 `roll-back`을 해야합니다.
- NullPointerException / ArrayIndexOutOfBoundException / ArithmeticException

#### Example
- 크기가 10인 int배열을 선언하고 값이 없지만 8번째와 11번째에 접근하려고 합니다.
- 하지만 컴파일 단계에서는 아무런 요구사항이 없습니다.

![[Assets/posts/20180502/4.png]]

- 실제로 Running을 하게 되면 ArrayIndexOutOfBoundException이 발생합니다.

![[Assets/posts/20180502/5.png]]


## 예외 처리 방법
### 예외복구
- 네트워크가 환경이 좋지 않아서 서버에 접속이 안되는 상황의 시스템에 적용하면 효율적입니다.
- 예외를 잡아서 일정 시간만큼 대기하고 다시 재시도를 반복합니다.
- 그리고 최대 재시도 횟수를 넘기면 예외를 발생합니다.

```java
int maxretry = MAX_RETRY;
while(maxretry -- > 0) {
    try {
        // 예외가 발생할 가능성이 있는 시도
        return; // 작업성공시 리턴
    }
    catch (SomeException e) {
        // 로그 출력. 정해진 시간만큼 대기
    }
    finally {
        // 리소스 반납 및 정리 작업
    }
}
throw new RetryFailedException(); // 최대 재시도 횟수를 넘기면 직접 예외 발생
```
### 예외처리 회피
- 예외가 발생하면 throws를 통해 호출한쪽으로 예외를 던지고 그 처리를 회피합니다.
- 단 예외처리의 필요성이 있다면 어느 정도 처리하고 호출한 쪽으로 넘기는게 좋습니다. 무책임하게 던지는 것은 위험합니다.

```java
public void add() throws SQLException {
    ... // 구현 로직
}
```
### 예외 전환
- 호출한 쪽에서 예외를 받아서 처리할 때 좀 더 명확하게 인지할 수 있도록 돕기 위한 방법입니다.

```java
catch(SQLException e) {
   ...
   throw DuplicateUserIdException();
}
```


## 정리하며
- Checked Exception과 Unchecked Exception의 가장 명확한 구분 기준은 ‘꼭 처리를 해야 하느냐?’입니다.
- roll-back여부에 따라 트랜잭션을 어떻게 묶어놓느냐에 따라 Exception 영향도가 크다는 것을 기억합시다.
- 무책임한 throw와 catch의 무시는 매우 위험한 행동입니다.

## Reference
- <http://www.nextree.co.kr/p3239/>
