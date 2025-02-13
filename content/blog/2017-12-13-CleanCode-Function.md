---
title: Clean Code - Function
tags:
  - CleanCode
date: 2017-12-13
aliases: 
  - ../articles/2017-12/CleanCode-Function
---
![[Assets/posts/20171211/cleancode.jpg]]

# 함수(Function)

## 작게 만들기.

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
    boolean isTestPage = pageData.hasAttribute("Test");
    if (isTestPage) {
        WikiPage testPage = pageData.getWikiPage();
        StringBuffer newPageContent = new StringBuffer();
        includeSetupPages(testPage, newPageContent, isSuite);
        newPageContent.append(pageData.getContent());
        includeTeardownPages(testPage, newPageContent, isSuite);
        pageData.setContent(newPageContent.toString());
    }
    return pageData.getHtml();
}
```

위 코드도 길다. 되도록 한 함수당 3~5줄 이내로 줄이는 것을 권장한다

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData))
        includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```


### 블록과 들여쓰기
중첩구조(if/else, while문 등)에 들어가는 블록은 한 줄이어야 한다. 각 함수 별 들여쓰기 수준이 2단을 넘어서지 않고, 각 함수가 명백하다면 함수는 더욱 읽고 이해하기 쉬워진다.

## 한 가지만 해라
> 함수는 한가지를 해야 한다. 그 한가지를 잘 해야 한다. 그 한가지만을 해야 한다.
지정된 함수 이름 아래에서 추상화 수준이 하나인 단계만 수행한다면 그 함수는 한 가지 작업만 하는 것이다.

### 함수 내 섹션
함수를 여러 섹션(선언, 초기화 등등)으로 나눌 수 있다면 그 함수는 여러작업을 하는 셈이다.

## 함수 당 추상화 수준은 하나로 하기
함수가 ‘한가지’ 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 된다.
만약 한 함수 내에 추상화 수준이 섞이게 된다면 읽는 사람이 헷갈린다.

### 위에서 아래로 코드 읽기:내려가기 규칙
코드는 위에서 아래로 이야기처럼 읽혀야 좋다.
함수 추상화 부분이 한번에 한단계씩 낮아지는 것이 가장 이상적이다.(내려가기 규칙)

## Switch문
### Bad Example
```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return calculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```
- 함수가 길다. (새 직원 유형을 추가하면 더 길어진다.)
- `한 가지`작업만 수행하지 않는다.
- SRP(Single Responsibility Principle)를 위반한다. (코드를 변경할 이유가 여럿이기 때문이다.)
- OCP(Open Closed Principle)를 위반한다.(새 직원 유형을 추가할 때마다 코드를 변경하기 때문이다.)

### Good Example
```java
public abstract class Employee {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}
-----------------
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
-----------------
public class EmployeeFactoryImpl implements EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
        switch (r.type) {
            case COMMISSIONED:
                return new CommissionedEmployee(r) ;
            case HOURLY:
                return new HourlyEmployee(r);
            case SALARIED:
                return new SalariedEmploye(r);
            default:
                throw new InvalidEmployeeType(r.type);
        }
    }
}
```
switch문은 작게 만들기 어렵지만(if/else의 연속 도 마찬가지!), 다형성을 이용하여 switch문을 abstract factory에 숨겨 다형적 객체를 생성하는 코드 안에서만 switch를 사용하도록 한다.

## 서술적인 이름을 사용하기
> 이름이 길어도 괜찮다. 겁먹을 필요없다. 길고 서술적인 이름이 짧고 어려운 이름보다 좋다.

## 함수 인수
함수에서 이상적인 인수 개수는 0개(무항). 인수는 코드 이해에 방해가 되는 요소이므로 최선은 0개이고, 차선은 1개뿐인 경우이다. 출력인수(함수의 반환 값이 아닌 입력 인수로 결과를 받는 경우)는 이해하기 어려우므로 왠만하면 쓰지 않는 것이 좋겠다.

### 단항 형식
- 인수에 질문을 던지는 경우 : `boolean fileExists(“MyFile”);`
- 인수를 뭔가로 변환해 결과를 변환하는 경우 : `InputStream fileOpen("MyFile");`
- 이벤트 함수일 경우 (이 경우에는 이벤트라는 사실이 코드에 명확하게 드러나야 한다.)

### 플래그 인수
플래그 인수는 추하다. 쓰지마라. bool 값을 넘기는 것 자체가 그 함수는 한꺼번에 여러가지 일을 처리한다고 공표하는 것과 마찬가지다.

### 이항 함수
단항 함수보다 이해하기가 어렵다. Point 클래스의 경우에는 이항 함수가 적절하다.
2개의 인수간의 자연적인 순서가 있어야함  무조건 나쁜 것은 아니지만, 인수가 2개이니 만큼 이해가 어렵고 위험이 따르므로 가능하면 단항으로 바꾸도록

- 자연스러운 이해 : `assertEquals(expected, actual)`, `Point p = new Point(x,y);`

### 삼항 함수
이해하기 훨씬 어려우므로 최대한 자제하자.  삼항 함수를 만들 때는 신중히 고려하라.

### 인수 객체
개념을 표현하기.

```java
Circle makeCircle(double x, double y, double radius); // bad
Circle makeCircle(Point center, double radius); // good
```

### 인수 목록
때로는 String.format같은 함수들처럼 인수 개수가 가변적인 함수도 필요하다. String.format의 인수는 List형 인수이기 때문에 이항함수라고 할 수 있다.


### 동사나 키워드
단항 함수는 함수와 인수가 동사/명사 쌍을 이뤄야한다.
```java
write(name); // bad
writeField(name); // good
```

함수이름에 키워드(인수 이름)을 추가하면 인수 순서를 기억할 필요가 없어진다.
```java
assertEquals(expected, actual);
assertExpectedEqualsActual(expected, actual);
```

## 부수 효과를 일으키지 말기
### Bad Example
```java
public class UserValidator {
    private Cryptographer cryptographer;
    public boolean checkPassword(String userName, String password) {
        User user = UserGateway.findByName(userName);
        if (user != User.NULL) {
            String codedPhrase = user.getPhraseEncodedByPassword();
            String phrase = cryptographer.decrypt(codedPhrase, password);
            if ("Valid Password".equals(phrase)) {
                Session.initialize(); // 기능
                return true;
            }
        }
        return false;
    }
}
```

비밀번호를 확인하는 Method에 Session 초기화하는 포함되어있다.
한 Method에 두가지 기능을 하고 있다. 좋지 못한 함수이다.

### 출력인수
일반적으로 출력 인수는 피해야 한다.
함수에서 상태를 변경해야 한다면 함수가 속한 객체 상태를 변경하는 방식을 택하라.


## 명령과 조회를 분리하라
`public boolean set(String attribute, String value);` : 두가지 기능을 하고 있다. 설정하는 것과 설정이 성공했는지 실패했는지.
`if(set(“username”, “unclebob”))...` : 이상한 함수의 모습을 볼 수 있다.

## 오류 코드보다 예외를 사용하라.
장황한 `if`을 통해 코드의 가독성과 이해도가 떨어진다.

### Bad Example
```java
if (deletePage(page) == E_OK) {
    if (registry.deleteReference(page.name) == E_OK) {
        if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
            logger.log("page deleted");
        } else {
            logger.log("configKey not deleted");
        }
    } else {
        logger.log("deleteReference from registry failed");
    }
} else {
    logger.log("delete failed"); return E_ERROR;
}
```

오류 코드 대신 예외를 사용하면 오류 처리 코드가 원래 코드에서 분리되므로 코드가 깔금해진다.

### Good Example
```java
try{
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}catch(Exception e){
  logger.log(e.getMessage());
}
```

### Try/Catch 뽑아내기
`Try/Catch` 블록을 별로 함수로 뽑아내는 편이 좋다.

### Best Example
```java
public void delete(Page page) {
    try {
        deletePageAndAllReferences(page);
      } catch (Exception e) {
          logError(e);
      }
}

private void deletePageAndAllReferences(Page page) throws Exception {
    deletePage(page);
    registry.deleteReference(page.name);
    configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
    logger.log(e.getMessage());
}
```

### 오류 처리도 한가지 작업이다.
```java
public enum Error {
    OK,
    INVALID,
    NO_SUCH,
    LOCKED,
    OUT_OF_RESOURCES,     
    WAITING_FOR_EVENT;
}
```
오류 코드가 정의되어있다면 새 오류 코드를 추가하기 힘들고 재컴파일/재배치가 번거롭다.
기존의 `java Exception`을 사용하게된다면 재컴파일/재배치 없이도 새 예외 클래스를 추가할 수 있다.


## 반복하지 마라!
중복은 모든 소프트웨어에서 모든 악의 근원이므로 늘 중복을 없애도록 노력해야한다.

## 구조적 프로그래밍
> 함수는 return문이 하나여야 되며, 루프 안에서 break나 continue를 사용해선 안된며 goto는 절대로, 절대로 사용하지 말자.
