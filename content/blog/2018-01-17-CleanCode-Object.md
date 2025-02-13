---
title: Clean Code - 객체와 자료구조(Object & DataStructure)
tags:
  - CleanCode
date: 2018-01-17
aliases: 
  - ../articles/2018-01/CleanCode-Object
---
![[Assets/posts/20171211/cleancode.jpg]]

# 객체와 자료구조(Object & DataStructure)
## 자료 추상화

```java
// 구체적인 Point 클래스
public class Point{
  public double x;
  public double y;
}

```

아래의 인터페이스는 직교좌표계를 사용하는지 극좌표계를 사용하는지 알 길이 없다. 하지만 자료 구조를 명백하게 표현하고 있다.

```java
// 추상적인 Point 클래스
public interface Point{
  double getX();
  double getY();
  void setCartesian(double x, double y);
  double getR();

}
```

첫번째 `Point`클래스는 구현을 노출하고 있다. 또한 단순히 변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지는 않는다.

> 추상 인터페이스를 제공해 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 의미의 클래스다.

아무 생각 없이 조회/설정 함수를 추가하는 방법은 가장 나쁘다.

## 자료/객체 비대칭
- **객체** 는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다.
- **자료 구조** 는 자료를 그대로 공개하며 별다른 함수는 제공하지 않는다.

```java
//절차적인 도형 (Procedural Shape)
public class Square {
  public Point topLeft;
  public double side;
}

public class Rectangle {
  public Point topLeft;
  public double height;
  public double width;
}

public class Circle {
  public Point center;
  public double radius;
}

public class Geometry {
  public final double PI = 3.141592653589793;

  public double area(Object shape) throws NoSuchShapeException {
    if (shape instanceof Square) {
      Square s = (Square)shape;
      return s.side * s.side;
    } else if (shape instanceof Rectangle) {
      Rectangle r = (Rectangle)shape;
      return r.height * r.width;
    } else if (shape instanceof Circle) {
      Circle c = (Circle)shape;
      return PI * c.radius * c.radius;
    }
    throw new NoSuchShapeException();
  }
}
```

`Square`, `Rectangle`은 아무런 함수를 제공하지 않는 단순 자료구조이다. 도형의 동작하는 방식은 `Geometry` 클래스에서 구현한다.

만약 `Geometry` 클래스에서 `perimeter()`함수를 추가하고 싶다면 도형 클래스는 아무 영향도 받지 않는다.

반면에 새 도형을 추가하고 싶다면 `Geometry`가 속한 함수를 모두 고쳐야 한다.


```java
//다형적인 도형 (Polymorphic Shape)
public class Square implements Shape {
  private Point topLeft;
  private double side;

  public double area() {
    return side * side;
  }
}

public class Rectangle implements Shape {
  private Point topLeft;
  private double height;
  private double width;

  public double area() {
    return height * width;
  }
}

public class Circle implements Shape {
  private Point center;
  private double radius;
  public final double PI = 3.141592653589793;

  public double area() {
    return PI * radius * radius;
  }
}
```

새 도형을 추가해도 기존 함수에 아무런 영향을 미치지 않는다.
하지만 새 함수를 추가하고 싶다면 도형 클래스 전부를 고쳐야 한다.


> (자료 구조를 사용하는) 절차적인 코드는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다. 반면, 객체 지향 코드는 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽다.

반대도 참이다.

> 절차적인 코드는 새로운 자료 구조를 추가하기 어렵다. 그러려면 모든 함수를 고쳐야 한다. 객체 지향 코드는 새로운 함수를 추가하기 어렵다. 그러려면 모든 클래스를 고쳐야 한다.

따라서 상황에 맞게 적절한 객체 또는 자료 구조를 사용하는 것이 좋다.

## 디미터 법칙
디미터 법칙은 잘 알려진 휴리스틱heuristic(경험에 기반하여 문제를 해결하거나 학습하거나 발견해 내는 방법)으로, **모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙** 이다.

좀 더 정확히 표현하자면, 디미터 법칙은 "클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다"고 주장한다.

- 클래스 C
- f가 생성한 객체
- f 인수로 넘어온 객체
- C 인스턴스 변수에 저장된 객체

하지만 위 객체에서 허용된 메서드가 반환하는 객체의 메서드는 호출하면 안 된다. 다시 말해, 낯선 사람은 경계하고 친구랑만 놀라는 의미이다.

### 기차 충돌(train wreck)
일반적으로 조잡하다 여겨지는 방식이므로 피하는 편이 좋다.

```java
// 기차 충돌
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

```java
// 개선한 코드
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

위 예제가 디미터 법칙을 위반하는지 여부는 위의 변수들이 객체인지 자료 구조인지에 달렸다. 객체라면 내부 구조를 숨겨야 하므로 확실히 디미터 법칙을 위반한다. 반면, 자료 구조라면 당연히 내부 구조를 노출하므로 문제되지 않는다.

하지만 단순한 자료 구조에도 조회 함수와 설정 함수를 정의하라 요구하는 프레임워크와 표준(`Bean`)이 존재한다.

### 잡종 구조
절반은 객체, 절반은 자료 구조인 잡종 구조가 나온다. 잡종 구조는 중요한 기능을 수행하는 함수도 있고, 공개 변수나 공개 get/set 함수도 있다.

이런 구조는 새로운 함수는 물론이고 새로운 자료 구조도 추가하기 어렵다. 양쪽 세상에서 단점만 모아놓은 구조다. 그러므로 되도록 이런 구조는 피하도록 하자. 프로그래머가 함수나 타입을 보호할지 공개할지 확신하지 못해 (더 나쁘게는 무지해) 어중간하게 내놓은 설계에 불과하다.

### 구조체 감추기
`ctxt`가 경로값을 얻어서 아래와 같은 임시 파일을 생성하려고 한다.

```java
String outFile = outputDir + "/" + className.replace('.', '/') + ".class";
FileOutputStream fout = new FileOutputStream(outFile);
BufferedOutputStream bos = new BufferedOutputStream(fout);
```

객체에게 경로값을 얻는 대신 임시 파일을 만들라는 함수를 통해 `ctxt`의 내부 구조를 드러내지 않으면서 여러 객체를 탐색할 필요가 없다. 따라서 디미터 법칙을 위반하지 않는다.

## 자료 전달 객체
- 전형적인 형태는 공개 변수만 있고 함수가 없는 클래스다.
- 자료 전달 객체(Data Transfer Object DTO)라 한다.

### DTO(Data Transfer Object)
- 데이터베이스와 통신하거나 소켓에서 받은 메시지의 구문을 분석할 때 유용하다.
- 데이터베이스에 저장된 가공되지 않은 정보를 애플리케이션 코드에서 사용할 객체로 변환하는 일련의 단계에서 가장 처음으로 사용하는 구조체.

### Bean
- 비공개 변수를 조회/설정 함수로 조작한다.
- 일종의 사이비 캡슐화

```java
public class Address{
  private String street;
  public Address(String street){
    this.street = street;
  }
  public String getStreet(){
    return this.street;
  }
  public void setStreet(String street){
    this.street = street;
  }
}
```

### 활성 레코드
- DTO의 특수한 형태
- 공개 변수가 있거나 비공개 변수에 getter/setter가 있는 자료 구조, 대게 save나 find와 같은 탐색 함수도 제공.
- 활성 레코드는 데이터베이스 테이블이나 다른 소스에서 자료를 직접 변환한 결과다.

불행히도 활성 레코드에 비즈니스 규칙 메서드를 추가해 이런 자료 구조를 객체로 취급하는 개발자가 흔하다. 하지만 이렇게 하게 되면 잡종 구조가 나오게 된다.

해결책은 당연하다. 활성 레코드는 자료 구조로 취급한다. 비즈니스 규칙을 담으면서 내부 자료를 숨기는 객체는 따로 생성한다. (여기서 내부 자료는 활성 레코드의 인스턴스일 가능성이 높다.)

## 결론
객체는 동작을 공개하고 자료를 숨긴다. 그래서 기존 동작을 변경하지 않으면서 새 객체 타입을 추가하기는 쉬운 반면, 기존 객체에 새 동작을 추가하기는 어렵다.
자료 구조는 별다른 동작 없이 자료를 노출한다. 그래서 기존 자료 구조에 새 동작을 추가하기는 쉬우나, 기존 함수에 새 자료 구조를 추가하기는 어렵다.
(어떤) 시스템을 구현할 때, 새로운 자료 타입을 추가하는 유연성이 필요하면 객체가 더 적합하다. 다른 경우로 새로운 동작을 추가하는 유연성이 필요하면 자료 구조와 절차적인 코드가 더 적합하다. 우수한 소프트웨어 개발자는 편견 없이 이 사실을 이해해 직면한 문제에 최적인 해결책을 선택한다.
