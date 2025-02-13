---
title: Refactoring - 예시[Example]
tags:
  - Refactoring
date: 2018-05-25
aliases: 
  - ../articles/2018-05/Refactoring-Example
---

![[Assets/posts/20180503/refactoring.jpg]]

## Extract Method
> 그룹으로 함께 묶을 수 있는 코드 조각이 있으면 코드의 목적이 잘 드러나도록 메소드의 이름을 지어 별도의 메소드로 뽑아낸다.

- <https://refactoring.com/catalog/extractMethod.html>

### 효과
- 메소드가 잘 쪼개져 있을 때 다른 메소드에서 사용될 확률이 높아진다
- 추상화 Level을 적절하게 유지할 수 있어 가독성이 좋아진다.

```java
// Example Code
void printNesoy(String title, int age){
  printTableHead();

  System.out.println( "Nesoy title : " + title );
  System.out.println( "age : " + age );
}
```

```java
// Refactoring Code
void printNesoy(String title, int age){
    printTableHead();
    printNesoyDetail(title, age);
}

void printNesoyDetail(String title, int age){
    System.out.println( "Nesoy title : " + title );
    System.out.println( "age : " + age );
}
```

## Extract Class
> 두 개의 클래스가 해야 할 일을 하나의 클래스가 하고 있는 경우 새로운 클래스를 만들어서 관련 있는 필드와 메소드를 예전 클래스에서 새로운 클래스로 옮겨라.

- <https://refactoring.com/catalog/extractClass.html>

### 효과
- 클래스 하나의 크기가 작아짐으로써 클래스의 역할을 이해하기 쉽다.

```java
// Example Code
class Nesoy {
    private String title;
    private int age;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAge() {
       return age + "나이";
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
// Refactoring Code
class Nesoy {
    private String title;
    private int age;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

class AgeWriter {
    public String getAgeFormat(int age){
       return age + "나이";
    }
}
```


## Inline Class
> 클래스가 하는 일이 많지 않은 경우에는 그 클래스에 있는 모든 변수와 메소드를 다른 클래스로 옮기고 그 클래스를 제거하라.

- <https://refactoring.com/catalog/inlineMethod.html>

### 효과
- 너무 깊은 추상화 Level보단 적절한 추상화 Level을 통해 가독성을 높힌다.


```java
// Example Code
int getRating() {
  return (moreThanFiveLateDeliveries()) ? 2 : 1;
}
boolean moreThanFiveLateDeliveries() {
  return _numberOfLateDeliveries > 5;
}
```

```java
// Refactoring Code
int getRating() {
  return (_numberOfLateDeliveries > 5) ? 2 : 1;
}
```


## Move Method
> 메소드가 자신이 정의된 클래스보다 다른 클래스의 기능을 더 많이 사용하고 있다면 이 메소드를 가장 많이 사용하고 있는 클래스에 비슷한 몸체를 가진 새로운 메소드를 만들어라. 그리고 이전 메소드는 간단한 위임으로 바꾸거나 완전히 제거하라

- <https://refactoring.com/catalog/moveMethod.html>

### 효과
- 역할에 맞는 클래스에 메소드를 옮김으로써 클래스 행위에 대해 이해도를 높힐 수 있다.

```java
// Example Code
class Project {
  Person[] participants;
}

class Person {
  int id;
  boolean participate(Project p) {
    for(int i=0; i<p.participants.length; i++) {
	  if (p.participants[i].id == id) return(true);
    }
    return(false);
  }
}
```

```java
// Refactoring Code
class Project {
  Person[] participants;
  boolean participate(Person x) {
    for(int i=0; i<participants.length; i++) {
	  if (participants[i].id == x.id) return(true);
    }
    return(false);
  }
}

class Person {
  int id;
}
```

## Move Field
> 필드가 자신이 정의된 클래스보다 다른 클래스에 의해 더 많이 사용되고 있다면 타겟 클래스(target class)에 새로운 필드를 만들고 기존 필드를 사용하는 모든 부분을 변경하라

- <https://refactoring.com/catalog/moveField.html>

### 효과
- `Move Method`와 비슷한 맥락이다.


## Introduce Explaining Variable[Extract Variable]
> 조건의 목적을 읽기 쉬운 변수의 이름으로 표현한다.

- <https://refactoring.com/catalog/extractVariable.html>

### 효과
- 메소드로 구현하는 것보다 훨씬 간단하며 가독성면에서 강력하다.

```java
// Example Code
if ( (platform.toUpperCase().indexOf("MAC") > -1) &&
     (browser.toUpperCase().indexOf("IE") > -1) &&
      wasInitialized() && resize > 0 )
```

```java
// Refactoring Code
final boolean isMacOs     = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE")  > -1;
final boolean wasResized  = resize > 0;

if (isMacOs && isIEBrowser && wasInitialized() && wasResized)
```


## Remove Data Value with Object
> 추가적인 데이터나 동작이 필요로하는 데이터 아이템이 있을때는 데이터 아이템을 객체로 바꿔라.

- <https://refactoring.guru/replace-data-value-with-object>

### 효과
- 데이터의 관련된 내용을 하나의 클래스로 작성할 수 있다.

```java
// Example Code
class Order{
    String customer;
}
```

```java
// Refactoring Code
class Order{
    Customer customer;
}
class Customer{
    String name;
}
```

## Replace Array with Object
> 배열 대신 Object를 사용하라.

- <https://refactoring.com/catalog/replaceArrayWithObject.html>

### 효과
- 배열로 접근하여 값을 입력하는 것은 잘못 넣을 위험성이 있다.
- Object를 통해 값을 입력하면 잘못 들어갈 가능성을 없앨 수 있다.

```java
// Example Code
String[] row = new String[3];
row [0] = "Liverpool";
row [1] = "15"
```

```java
// Refactoring Code
Performance row = new Performance();
row.setName("Liverpool");
row.setWins("15");
```


## Replace Magic Number with Symbolic Constant
> Magic Number를 상수로 바꾸자.

- <https://refactoring.guru/replace-magic-number-with-symbolic-constant>

### 효과
- Magic Number는 무엇을 의미하는지 이해하기 힘들다. 하지만 상수로 표현하면 이해하기 쉽다.
- Magic Number는 변경하기도 어렵다. 하지만 상수로 관리하면 변경하기 쉽다.

```java
// Example Code
double potentialEnergy(double mass, double height) {
  return mass * height * 9.81;
}
```

```java
// Refactoring Code
static final double GRAVITATIONAL_CONSTANT = 9.81;

double potentialEnergy(double mass, double height) {
  return mass * height * GRAVITATIONAL_CONSTANT;
}
```


## Encapsulate Collection
> Collection을 직접 반환하지마라.

- <https://refactoring.guru/encapsulate-collection>

### 효과
- 변경될 수 있는 약점에 대해 보호할 수 있다.
- 요소를 추가하거나 삭제하는 작업은 있어야 한다.

```java
// Example Code
getCourses(): Set
setCourses(:Set)
```

```java
// Refactoring Code
getCourses(): UnmodifiableSet
addCourse(:Course)
removeCourse(:Course)
```

## Rename Method
> 메소드의 이름을 적절하게 바꿔라.

- <https://refactoring.guru/rename-method>


## Introduce Parameter Object
> 많은 매개변수를 하나의 매개변수 객체로 바꾸어라.

- <https://refactoring.guru/introduce-parameter-object>

### 효과
- 읽기 더 편하다.

```java
// Example Code
amountInvoicedIn (start : Date, end : Date)
amountReceivedIn (start : Date, end : Date)
amountOverdueIn (start : Date, end : Date)
```

```java
// Refactoring Code
amountInvoicedIn (: DateRange)
amountReceivedIn (: DateRange)
amountOverdueIn (: DateRange)
```

## Remove Setting Method
> 필요없는 setter는 제거해라.

- <https://refactoring.guru/remove-setting-method>

## Replace Constructor with Factory Method
> 생성자 대신 Factory Method를 사용해라.

- <https://refactoring.guru/replace-constructor-with-factory-method>

```java
// Example Code
class Employee {
  Employee(int type) {
    this.type = type;
  }
  //...
}
```

```java
// Refactoring Code
class Employee {
  static Employee create(int type) {
    employee = new Employee(type);
    // do some heavy lifting.
    return employee;
  }
  //...
}
```

## Pull Up/Down Field / Pull Up/Down Method
> 공통으로 쓰는 필드,메소드는 상위 클래스로 특정한 필드,메소드는 특정한 클래스로

### Field
- Pull Up : <https://refactoring.com/catalog/pullUpField.html>
- Pull Down : <https://refactoring.com/catalog/pushDownField.html>

### Method
- Pull Up : <https://refactoring.com/catalog/pullUpMethod.html>
- PUll Down : <https://refactoring.com/catalog/pushDownMethod.html>

## Extract Subclass/Superclass
> 특징들을 상/하위 클래스로 분리하라.

- Subclass : <https://refactoring.com/catalog/extractSubclass.html>
- Superclass : <https://refactoring.com/catalog/extractSuperclass.html>

## Extract Interface
> 인터페이스로 분리하라.

- Interface : <https://refactoring.com/catalog/extractInterface.html>

## Split Temporary Variable
### Motivate
- 임시 변수는 반복하서 다양하게 쓰일 수 있지만 하나의 목적에 맞게 변수는 존재해야 한다.
- ex) for loop의 i변수
- 두 가지 용도로 사용하면 코드를 보는 사람이 매우 혼란스러울 수 있다.

```java
// Example Code
double temp = 2 * (height + width);
System.out.println(temp);
temp = height * width;
System.out.println(temp);

// Refactoring Code
double perimeter = 2 * (height + width);
System.out.println(perimeter);
double area = height * width;
System.out.println(area);
```

## Hide Delegate
- 캡슐화는 객체에서 가장 중요한 개념 가운데 하나이다.
- 시스템의 다른 부분에 대해 좀 적게 알아도 된다는 것을 의미한다.
- 캡슐화가 되어 있는 경우 클래스가 변경되었을 때 시스템의 다른 부분이 영향을 덜 받으므로, 결과적으로 변경을 좀 더 쉽게 할 수 있다.


### Reference
- <https://wikidocs.net/597>
- <https://refactoring.com/catalog/>
- <https://refactoring.guru/>
