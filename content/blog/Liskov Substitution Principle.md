---
aliases: [/articles/2018-03/LSP]
comments: false
date: 2018-03-06
description: 
tags: [DesignPattern]
title: Liskov Substitution Principle
---
# 리스코프 치환 원칙(Liskov Substitution Principle)
> 자식 클래스는 최소한 자신의 부모 클래스에서 가능한 행위는 수행할 수 있어야 한다.

## Example
아래는 높이와 너비를 가지는 `Rectangle` 클래스 입니다.

```java
class Rectangle {
    private int width;
    private int height;

    public void setHeight(int height) {
        this.height = height;
    }

    public int getHeight() {
        return this.height;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getWidth() {
        return this.width;
    }

    public int area() {
        return this.width * this.height;
    }
}
```

`Rectangle`을 상속받고 있는 `Square`라는 클래스입니다. `setHight(int value)`와 `setWidth(int value)`를 Override하고 있습니다.

```java
class Square extends Rectangle {
    @Override
    public void setHeight(int value) {
        this.width = value;
        this.height = value;
    }

    @Override
    public void setWidth(int value) {
        this.width = value;
        this.height = value;
    }
}
```

테스트 코드를 볼까요?

높이 4, 너비 5로 설정하여 넓이를 구하고 확인하는 함수입니다. 부모 클래스인 `Rectangle`은 결과 값을 true를 확인 할 수 있지만 `Square`는 false로 확인 할 수 있습니다.

```java
class Test {
    static boolean checkAreaSize(Rectangle r) {
        r.setWidth(5);
        r.setHeight(4);

        if(r.area() != 20 ){ // Error Size
            return false;
        }

        return true;
    }
    public static void main(String[] args){
        Test.checkAreaSize(new Rectangle()); // true
        Test.checkAreaSize(new Square()); // false
    }
}
```

위의 예시는 `LSP`를 위반한 하나의 예제로 볼 수 있습니다. 자식 클래스 `Square`는 부모 클래스 `Rectangle`의 `area()` 기능을 제대로 하지 못하고 있습니다.

그러면 과연 `Square`는 `Rectangle`의 자식이 맞을까라는 의심을 해봐야 합니다. 자식 클래스는 최소한 자신의 부모 클래스에서 가능한 행위는 수행할 수 있어야 하기 때문입니다.

## 해결 방법
- 상속의 관계를 제거하는 방법.
- 기능을 제대로 하지 못하는 `area()`를 자식 클래스로 이동시키는 방법.

## Result
- LSP를 통해 자식 클래스가 부모 클래스의 역할을 충실히 하면서 확장해나가야 한다는 것을 알게 되었다.


## Reference
- <https://code.tutsplus.com/tutorials/solid-part-3-liskov-substitution-interface-segregation-principles--net-36710>
