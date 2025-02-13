---
title: Scala의 타입에 대해
tags:
  - Scala
date: 2020-03-21
aliases: 
  - ../articles/2020-03/Scala-Type
---

![[Assets/logo/scala.png]]

## Scala Type에 대해
![[Assets/posts/img/2020-03-21-17-36-32.png]]

#### Any
- 모든 타입의 가장 상위 타입을 의미한다.
    - equals, hashCode, toString등을 담고 있다.
    - Java의 Object와 비슷해보인다.
- Any는 AnyVal, AnyRef로 나눠진다.

#### AnyVal
- value Type을 의미 한다.
- scala에는 사전에 미리 정의된 9가지의 value type이 있다.
- 모두 non-nullable하다.
    - Double, Float, Long, Int, Short, Byte, Char, Unit, Boolean
- Unit은 의미가 없음을 의미합니다.
    - Java의 마치 void와 비슷해보인다.


#### AnyRef
- reference Type을 의미 합니다.
- value type이 아닌 타입들이 존재합니다.
- JVM에서 Scala를 사용하는 경우 자바의 `java.lang.Object`와 일치합니다.

#### Example
```scala
val list: List[Any] = List(
  "a string", // -> a string
  732,  // an integer // -> 732
  'c',  // a character
  true, // a boolean value
  () => "an anonymous function returning a string" // -> <function>
)

list.foreach(element => println(element))
```

### Type Casting
- Byte -> Short -> Int -> Long -> Float -> Double
- Char -> Int

#### Example

```scala
val x: Long = 987654321
val y: Float = x  // 9.8765434E8

val face: Char = '😂'
val number: Int = face  // 9786
```

#### Example - not compile
- Float에서 Long으로 Compile이 되지 않는다.
```scala
val x: Long = 987654321
val y: Float = x  // 9.8765434E8
val z: Long = y  // Does not conform
```

### Nothing과 Null
- Nothing
    - 모든 Type의 sub-type입니다.
    - value가 없다라는 것을 의미합니다.
    - 보통 예외를 던지거나 비정상 종료인 경우 Nothing을 반환합니다.
- Null
    - null을 의미하는 Single Value입니다.
    - Null은 주로 다른 JVM 언어와의 호환을 위해 제공됩니다.
    - 스칼라 코드에서는 거의 사용되지 않습니다.


#### 정리하며
- Object로 관리하면 데이터 크기를 어떻게 정할까 했는데
- Java와 동일하게 가져가는 거 같다.
- <https://alvinalexander.com/scala/scala-data-types-bits-ranges-int-short-long-float-double>


## Reference
- <https://docs.scala-lang.org/tour/unified-types.html>
- [Scala API Doc](https://www.scala-lang.org/api/current/scala)
