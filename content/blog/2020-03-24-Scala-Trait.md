---
title: Scala의 Trait에 대해
tags:
  - Scala
date: 2020-03-24
aliases: 
  - ../articles/2020-03/Scala-Trait
---

![[Assets/logo/scala.png]]

## Traits이란?
- 인터페이스와 필드를 공유하는데 사용됩니다.
- 마치 Java의 interface와 비슷합니다.
    - Class, Object로 확장 가능합니다.
    - 하지만 단독으로 인스턴스화 시킬 수 없습니다.

#### Example
```scala
trait HairColor // Normal Case
```

#### Example - Generic Type
```scala
trait Iterator[A] { // Generic Type
  def hasNext: Boolean
  def next(): A
}
```

#### Example
- extends 키워드를 사용해서 Class에 확장한다.

```scala
trait Iterator[A] {
  def hasNext: Boolean
  def next(): A
}

class IntIterator(to: Int) extends Iterator[Int] {
  private var current = 0
  override def hasNext: Boolean = current < to // override가 꼭 없어도된다.
  override def next(): Int = {
    if (hasNext) {
      val t = current
      current += 1
      t
    } else 0
  }
}


val iterator = new IntIterator(10)
iterator.next()  // returns 0
iterator.next()  // returns 1
```


#### Subtyping
- Pet을 구현한 구현체만 넣을 수 있고
- Pet을 넣을 수는 없다.

```scala
import scala.collection.mutable.ArrayBuffer

trait Pet {
  val name: String
}

class Cat(val name: String) extends Pet
class Dog(val name: String) extends Pet

val dog = new Dog("Harry")
val cat = new Cat("Sally")

val animals = ArrayBuffer.empty[Pet] // Java Type Casting와 비슷해보인다.
animals.append(dog)
animals.append(cat)
animals.foreach(pet => println(pet.name))  // Prints Harry Sally
```

## Reference
