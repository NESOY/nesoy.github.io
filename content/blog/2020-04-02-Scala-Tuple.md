---
title: Scala의 Tuple에 대해
tags:
  - Scala
date: 2020-04-02
aliases: 
  - ../articles/2020-04/Scala-Tuple
---

![[Assets/logo/scala.png]]

## Tuple란?
- 고정된 크기의 elements를 포함하는 value라고 표현한다.
- immutable한 성격을 가지고 있다.

```scala
// Tuple2[String, Int]
val ingredient = ("Sugar" , 25) // String, Int 포함하고 있다.
```

#### Example
- 멤버 접근하는 방식은 `_1`, `_2`로 접근한다.
- index가 0부터 아니라 1부터 시작한다.

```scala
println(ingredient._1) // Sugar
println(ingredient._2) // 25
```

- Tuple 내부에 Tuple도 가능하다.

```scala
val inception = ("Scala", "Nesoy", ("Scala", "Nesoy"))
inception._3._1
```

- Tuple을 활용한 Pattern Matching

```scala
val (name, quantity) = ingredient
println(name) // Sugar
println(quantity) // 25
```

- for-each Example

```scala
val planets =
  List(("Mercury", 57.9), ("Venus", 108.2), ("Earth", 149.6), ("Mars", 227.9), ("Jupiter", 778.3))

planets.foreach{
    // Java에서는 힘든 표현이다.
  case ("Earth", distance) => println(s"Our planet is $distance million kilometers from the sun")
  case _ =>
}
```

- for-loop Example

```scala
val numPairs = List((2, 5), (3, -7), (20, 56))
for ((a, b) <- numPairs) {
    println(a * b)
}
```

## Tuples 그리고 case classes
- Tuple과 `case classes` 둘 중에 선택하는게 힘든 상황이 온다.
- `case class`는 다음과 같이 타입이 담겨져 있어 가독성이 좋다.
```scala
case class Planet(name: String, distance: Double)
```

## 그렇다면 List와는 무슨 차이가 있는걸까?
- Python에서도 Tuple이 존재한다.
    - Python의 List는 값의 변경이 가능하다.
    - Python의 Tuple은 값의 변경이 불가능하다.
- Scala에서의 List는 값의 변경이 불가능하다.
    - 그렇다면 Tuple도 불가능한데.. 무슨 차이가 있는걸까?
    - 리스트와는 다르게 다른 타입의 원소를 넣을 수 있다.


## Reference
- <https://docs.scala-lang.org/tour/tuples.html>
- <https://docs.scala-lang.org/tour/case-classes.html>
- [Python Tuple](https://wikidocs.net/15)
