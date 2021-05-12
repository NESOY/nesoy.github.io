## 들어가며
- 제네릭을 다루게 되면 매번봐도 이해가 잘 안되는 단어들이 매번 등장한다.
    - 변성, 공변, 반공변, 그리고 무공변
- 오늘도 역시 제대로 이해하기 위해 정리합니다 :)

## 가변성(variance)이란?
> Variance refers to how subtyping between more complex types relates to subtyping between their components.

- 역시 이해가 안되니 가장 작은 단어인 subtype에 대해 알아보자.

#### [Subtyping이란?](https://en.wikipedia.org/wiki/Subtyping)
> a subtype is a datatype that is related to another datatype (the supertype) by some notion of substitutability
- A라는 [Data type](https://en.wikipedia.org/wiki/Data_type)이 B라는 Data type을 대체할 수 있을 경우
    - 이때 A는 B의 Subtype이라고 말할 수 있다.
    - B는 A의 Supertype이라고 말할 수 있다.
    - 역할을 대체가 가능한지가 Subtype의 중요한 포인트인거 같다.
    - [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

- 간단한 예를 들어보자.

![No Image](/assets/posts/img/2021-05-02-23-54-40.png)


- bird라는 클래스가 존재하고 하위에 duck, cuckoo, ostrich라는 클래스가 존재한다.
- duck, cuckoo, ostrich는 `bird라는 고유의 특성`을 가지고 있으며 각자의 특성을 가지고 있다.
- 그렇기 때문에 bird와 duck, cuckoo, ostrich는 `supertype - subtype`의 관계를 가지고 있다.
    - 이 관계는 `duck, cuckoo, ostrich <: bird` 로 표기할 수 있다.




- 이제 코드의 예를 들어보자.
    - Collection이라는 인터페이스에 add라는 역할이 존재한다.
```java
interface Collection<E> {
    public boolean add(E e);
}
```

- 아래의 코드는 컴파일이 된다.
    - integer, double은 number의 subtype이다.
```java
List<Number> numbers = Arrays.asList(1,2);
numbers.add(1); // integer
numbers.add(4.2) // double
```

- 위 개념을 확장해서 `List<Integer>`는 `List<Number>`의 Subtype인가?
   - 즉 `대체가능한가?`라는 관점에서 바라보자

- 아래의 코드는 컴파일 에러가 발생한다.
    - 왜 발생하는 것인가?

```java
List<Integer> intNumbers = Arrays.asList(1,2);
List<Number> numbers = intNumbers // compile error
```

- List<Intger>은 배열을 Heap 메모리에 생성하며 주소를 할당받는다.
    - `List<Number> = List<Integer>`이 가능하게 된다면?
    - 두개의 List는 같은 메모리 주소를 가지게된다.
    - 이때 List<Number>에 double값을 넣게 되면 어떻게 될까?
        - 가만히 있던 List<Integer>는 엉뚱한 double값이 들어와 Type이 깨지게 되는 상황이 발생한다.
        - 타입 안정성을 위해 Java에서는 이를 허용하지 않는다.

- 반대 상황도 동일하다.

```java
List<Number> numbers = Arrays.asList(3.14, 4.24);
List<Integer> intNumbers = numbers // compile error
```

- numbers는 double값들을 들고 있는 상황
    - `List<Integer>`는 numbers를 대입할 수 없다.
    - 대입하는 순간 타입 안정성이 깨지게 된다.

- 그래서 결론은?
    - List<Number> <: List<Integer> - 성립하지 않음
    - List<Integer> <: List<Number> - 성립하지 않음
    - 따라서 두개의 타입은 Invariant의 관계를 가지고 있다.


#### 하지만 이런 상황은?
- numbers가 단순히 읽기만 한다면?
    - 타입 안정성이 깨질 이유가 없지 않을까?
    - 이렇게 사용하면 더 편하지 않을까?
```java
List<Integer> intNumbers = Arrays.asList(1,2);
List<Number> numbers = intNumbers
```






-------

#### 변성에는 총 4가지의 종류가 존재한다.
- 공변 Covariant if it accepts subtypes but not supertypes
- 반공변 Contravariant if it accepts supertypes but not subtypes
- Bivariant if it accepts both supertypes and subtypes
- 무공변 Invariant does not accept either supertypes nor subtypes

#### SubType과 SubClass에 대해
#### 공변과 반공변성에 대해 // 무공변성
- 공변(covariant)
    - 다른 변인과 함께 변하는, 공변하는


## 와일드카드는 무엇인가?

## 타입소거는 왜 하는가?
- <https://jyami.tistory.com/99>
- <https://docs.oracle.com/javase/tutorial/java/generics/erasure.html>

## Java의 PECS
- 자바의 제네릭은 공변을 지원하지 않는다.
    - 한정적 와일드카드 타입이라는 특수한 타입 파라미터를 활용해야 한다.

## Reference
- <https://edykim.com/ko/post/what-is-coercion-and-anticommunism/>
- <https://medium.com/mj-studio/코틀린-제네릭-in-out-3b809869610e>
- <https://tech.kakao.com/2016/03/03/monad-programming-with-scala-future/>
- <https://www.facebook.com/baekjun.lim/posts/1169171089767945>
- <https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)#Use-site_variance_annotations_.28wildcards.29>
- <https://en.wikipedia.org/wiki/Subtyping>
- <https://wjdtn7823.tistory.com/88>
- <https://sticky32.tistory.com/entry/C-공변성과-반공변성이란> - C#
- <https://partnerjun.tistory.com/78> - Scala
- <https://velog.io/@lsb156/covariance-contravariance>

https://yangbongsoo.gitbook.io/study/super_type_token

## 핵심 Reference
- <https://asuraiv.tistory.com/17?category=813980>
- <https://cla9.tistory.com/44?category=814455>
- <http://happinessoncode.com/2017/05/22/java-generic-and-variance-2/>
- <https://woowacourse.github.io/javable/post/2020-11-09-generics-basic/>
- <https://medium.com/mj-studio/%EC%BD%94%ED%8B%80%EB%A6%B0-%EC%A0%9C%EB%84%A4%EB%A6%AD-in-out-3b809869610e>
- <https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)>