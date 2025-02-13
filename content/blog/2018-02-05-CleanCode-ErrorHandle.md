---
title: Clean Code - 오류 처리(Error Handle)
tags:
  - CleanCode
date: 2018-02-05
aliases: 
  - ../articles/2018-02/CleanCode-ErrorHandle
---
![[Assets/posts/20171211/cleancode.jpg]]

# 오류 처리

## 오류 코드보다 예외를 사용하라

```java
// Bad
public class DeviceController {
...
public void sendShutDown() {
  DeviceHandle handle = getHandle(DEV1);
  // Check the state of the device
  if (handle != DeviceHandle.INVALID) {
    // Save the device status to the record field
    retrieveDeviceRecord(handle);
    // If not suspended, shut down
    if (record.getStatus() != DEVICE_SUSPENDED) {
      pauseDevice(handle);
      clearDeviceWorkQueue(handle);
      closeDevice(handle);
    } else {
      logger.log("Device suspended. Unable to shut down");
    }
  } else {
    logger.log("Invalid handle for: " + DEV1.toString());
  }
}
...
}
```

- 위의 코드는 호출자의 코드가 복잡해진다. 함수를 호출한 즉시 오류를 확인해야 한다.
- **오류가 발생하면 예외를 던지는 폇이 낫다.** 그러면 호출자 코드가 더 깔끔해진다.


```java
// Good
public class DeviceController {
...
public void sendShutDown() {
  try {
    tryToShutDown();
  } catch (DeviceShutDownError e) {
    logger.log(e);
  }
}

private void tryToShutDown() throws DeviceShutDownError {
  DeviceHandle handle = getHandle(DEV1);
  DeviceRecord record = retrieveDeviceRecord(handle);
  pauseDevice(handle);
  clearDeviceWorkQueue(handle);
  closeDevice(handle);
}

private DeviceHandle getHandle(DeviceID id) {
  ...
  throw new DeviceShutDownError("Invalid handle for: " + id.toString());
  ...
}
...
}
```

## Try-Catch-Finally 문부터 작성하라
- 예외가 발생할 코드를 짤 때는 try-catch-finally 문으로 시작하는 편이 낫다.
- try문은 transaction처럼 동작하는 실행코드로, catch문은 try문에 관계없이 프로그램을 일관적인 상태로 유지하도록 한다.

### Step 1
```java
// Step 1: StorageException을 던지지 않으므로 이 테스트는 실패한다.

@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
  sectionStore.retrieveSection("invalid - file");
}

public List<RecordedGrip> retrieveSection(String sectionName) {
  // dummy return until we have a real implementation
  return new ArrayList<RecordedGrip>();
}
```

### Step 2
```java
// Step 2: 이제 테스트는 통과한다.
public List<RecordedGrip> retrieveSection(String sectionName){
  try{
    FileInputStream stream = new FileInputStream(sectionName);
  } catch (Exception e) {
    throw new StorageException("retrieval error", e);
  }
  return new ArrayList<RecordedGrip>();
}
```

### Step 3
```java
// Step 3: Exception의 범위를 FileNotFoundException으로 줄여 정확히 어떤 Exception이 발생한지 체크하자.
public List<RecordedGrip> retrieveSection(String sectionName) {
  try {
    FileInputStream stream = new FileInputStream(sectionName);
    stream.close();
  } catch (FileNotFoundException e) {
    throw new StorageException("retrieval error", e);
  }
  return new ArrayList<RecordedGrip>();
}
```

## 미확인(unchecked) 예외를 사용하라
- 예전에는 메서드를 선언할 때는 메서드가 반환할 예외를 모두 열거했다.
- 예외처리에 드는 비용 대비 이득을 생각해봐야 한다.
- 확인된 예외를 사용하면 `OCP를 위반한다.`
  - 확인된 예외를 던졌는데 catch 블록이 세 단계 위에 있다면 그 사이 메서드 모두가 선언부에 해당 예외를 정의해야 한다.
  - 다시 빌드한 다음 배포해야한다.
  - 상위 레벨 메소드에서 하위 레벨 메소드의 디테일에 대해 알아야 하기 때문에 캡슐화 또한 깨진다.

## 예외에 의미를 제공하라
- 예외를 던질 때는 전후 상황을 충분히 덧붙인다.
- 실패한 연산 이름과 실패 유형도 언급한다.

## 호출자를 고려해 예외 클래스를 정의해라
- Exception class를 만드는 데에서 가장 중요한 것은 "어떤 방식으로 예외를 잡을까"이다.
- 써드파티 라이브러리를 사용하는 경우 그것들을 `wrapping`함으로써 라이브러리 `교체` 등의 `변경`이 있는 경우 대응하기 쉬워진다.
- 라이브러리를 쓰는 곳을 테스트할 경우 해당 라이브러리를 가짜로 만들거나 함으로써 테스트하기 쉬워진다.
- 라이브러리의 api 디자인에 종속적이지 않고 내 입맛에 맞는 디자인을 적용할 수 있다.
- 보통 특정 부분의 코드에는 exception 하나로 충분히 예외처리 할 수 있다.
- 한 exception만 잡고 나머지 하나는 다시 throw하는 경우 등 정말 필요한 경우에만 다른 exception 클래스를 만들어 사용하자.

```java
// Bad
// 외부 라이브러리가 던질 예외를 모두 잡아 낸다. 
// 같은 에러 잡아 내는 코드가 많다. 
// 변경하기 어렵다.

ACMEPort port = new ACMEPort(12);
try {
  port.open();
} catch (DeviceResponseException e) {
  reportPortError(e);
  logger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
  reportPortError(e);
  logger.log("Unlock exception", e);
} catch (GMXError e) {
  reportPortError(e);
  logger.log("Device response exception");
} finally {
  ...
}
```

```java
// Good
// 호출하는 라이브러리 API를 감싸면서 예외 유형 하나를 반환.
// Wrapper클래스 덕분에 의존성이 크게 감소.

LocalPort port = new LocalPort(12);
try {
  port.open();
} catch (PortDeviceFailure e) {
  reportError(e);
  logger.log(e.getMessage(), e);
} finally {
  ...
}

public class LocalPort {
  private ACMEPort innerPort;
  public LocalPort(int portNumber) {
    innerPort = new ACMEPort(portNumber);
  }

  public void open() {
    try {
      innerPort.open();
    } catch (DeviceResponseException e) {
      throw new PortDeviceFailure(e);
    } catch (ATM1212UnlockedException e) {
      throw new PortDeviceFailure(e);
    } catch (GMXError e) {
      throw new PortDeviceFailure(e);
    }
  }
  ...
}
```

## 정상 흐름을 정의하라.
```java
// Bad
// 식비비용 조회를 실패하면 일일 기본 식비를 총계에 더한다.
// 특수 상황을 처리할 필요가 없다면 더 코드는 간결해진다.
try { 
  MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
  m_total += expenses.getTotal(); 
} catch(MealExpensesNotFound e) {
   m_total += getMealPerDiem(); 
}
```

```java
// Good
// caller logic.
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();

public class PerDiemMealExpenses implements MealExpenses {
  public int getTotal() {
    // 기본값으로 일일 기본 식비를 반환
  }
}
```

위 경우를 `특수 사례 패턴(Special Case Pattern)` 부른다. 클래스를 만들거나 객체를 조작해 특수 사례를 처리하는 방식.

## null를 반환하지 마라.
- null값 처리를 호출자에게 문제를 떠넘기는 행위이다. 좋지 못한 습관.
- null을 리턴하고 싶은 생각이 들면 위의 `Special Case object`를 리턴하라. ex) `Collections.emptyList()`
- 써드파티 라이브러리에서 null을 리턴할 가능성이 있는 메서드가 있다면 Exception을 던지거나 Special Case object를 리턴하는 매서드로 래핑하라.

```java 
// BAD!!!!
public void registerItem(Item item) { 
  if (item != null) {
    ItemRegistry registry = peristentStore.getItemRegistry();
    if (registry != null) {
      Item existing = registry.getItem(item.getID());
      if (existing.getBillingPeriod().hasRetailOwner()) {
        existing.register(item);
      }
    }
  }
}
```

```java
  // Bad
  List<Employee> employees = getEmployees();
  if (employees != null) {
    for(Employee e : employees) {
      totalPay += e.getPay();
    }
  }
```

```java
  // Good
  // 더 읽기 쉬운 코드.
  List<Employee> employees = getEmployees();
  for(Employee e : employees) {
    totalPay += e.getPay();
  }

  public List<Employee> getEmployees() {
    if( .. there are no employees .. )
      return Collections.emptyList();
    }
  }
```

## null을 전달하지 마라.
- null을 리턴하는 것도 나쁘지만 null을 메서드로 넘기는 것은 더 나쁘다.
- null을 메서드의 파라미터로 넣어야 하는 API를 사용하는 경우가 아니면 null을 메서드로 넘기지 마라.
- 일반적으로 대다수의 프로그래밍 언어들은 파라미터로 들어온 null에 대해 적절한 방법을 제공하지 못한다.
- 가장 이성적인 해법은 null을 파라미터로 받지 못하게 하는 것이다.

```java
// Bad
// Parameter에 null값이 들어오면 NullPointerException 발생.
public class MetricsCalculator { 
  public double xProjection(Point p1, Point p2) { 
    return (p2.x – p1.x) * 1.5; 
  } 
}
```

```java
// Better
public class MetricsCalculator { 
  public double xProjection(Point p1, Point p2) { 
    if(p1 == null || p2 == null){
      throw InvalidArgumentException("Invalid argument for MetricsCalculator.xProjection"); 
    } 
    return (p2.x – p1.x) * 1.5; 
  } 
}
```

```java
// Good
public class MetricsCalculator { 
  public double xProjection(Point p1, Point p2) { 
    assert p1 != null : "p1 should not be null";
    assert p2 != null : "p2 should not be null";
    return (p2.x – p1.x) * 1.5; 
  } 
}
```

## 결론
- 깨끗한 코드는 읽기도 좋아야 하지만 안정성도 높아야 한다. 이 두가지의 목표는 대립되는 목표가 아니다.
