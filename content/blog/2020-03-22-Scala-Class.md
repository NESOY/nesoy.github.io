---
title: Scala의 클래스에 대해
tags:
  - Scala
date: 2020-03-22
aliases: 
  - ../articles/2020-03/Scala-Class
---

![[Assets/logo/scala.png]]

## Class
- Method, value, variables, types, objects, traits, class가 멤버로 존재할 수 있습니다.
- class 이름은 항상 대문자로 시작해야 합니다.

#### Example
```scala
class User

val user1 = new User // new를 하면 기본 생성자가 실행된다.
```

#### Example - 생성자
- 다른 많은 언어들과는 다르게 primary 생성자는 class signature로 선언되는 것을 볼 수 있다.

```scala
class Point(var x: Int, var y: Int) {

  def move(dx: Int, dy: Int): Unit = {
    x = x + dx
    y = y + dy
  }

  override def toString: String =
    s"($x, $y)"
}

val point1 = new Point(2, 3)
point1.x  // 2
println(point1)  // prints (2, 3)
```

#### Example - 기본값 생성자

```scala
class Point(var x: Int = 0, var y: Int = 0)

val origin = new Point  // x and y are both set to 0
val point1 = new Point(1)
println(point1.x)  // prints 1


// 원하는 파라미터에만 값을 넣을 수 있다
class Point(var x: Int = 0, var y: Int = 0)
val point2 = new Point(y=2) // 자바보다 더 유연한 것을 확인할 수 있다
println(point2.y)  // prints 2
```



#### Private Method, Member

```scala
class Point {
  private var _x = 0
  private var _y = 0
  private val bound = 100

  def x = _x
  def x_= (newValue: Int): Unit = {
    if (newValue < bound) _x = newValue else printWarning
  }

  def y = _y
  def y_= (newValue: Int): Unit = {
    if (newValue < bound) _y = newValue else printWarning
  }

  private def printWarning = println("WARNING: Out of bounds")
}

val point1 = new Point
point1.x = 99
point1.y = 101 // prints the warning
```

#### Scala의 Access Modifier
- Java와 매우 비슷하나 새로운 부분이 있어 적습니다.

#### Scope Protection

```scala
package society {
   package professional {
      class Executive {
         private[professional] var workDetails = null // professional package level만 접근이 가능하다.
         private[society] var friends = null // society pacakge level만 접근이 가능하다.
         private[this] var secrets = null

         def help(another : Executive) {
            println(another.workDetails)
            println(another.secrets) //ERROR
         }
      }
   }
}
```

## Reference
- <https://docs.scala-lang.org/tour/classes.html>
