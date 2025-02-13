---
title: Variance
tags: [language]
date: 2021-05-13
aliases: [../articles/2021-05/variance]
---
## 들어가며
- 제네릭을 다루게 되면 매번봐도 이해가 잘 안되는 단어들이 매번 등장한다.
    - 변성, 공변, 반공변, 그리고 무공변
- 역시 제대로 이해하기 위해 정리합니다 :)


## [가변성(Variance)이란?](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science))
> Variance refers to how subtyping between more complex types relates to subtyping between their components.
- Google Translate
    - Variance는 더 복잡한 유형 간의 하위 유형이 해당 구성 요소 간의 하위 유형과 관련되는 방식을 나타냅니다.
- 역시 이해가 안되니 가장 작은 단어인 subtype에 대해 알아보자.

#### [Subtyping이란?](https://en.wikipedia.org/wiki/Subtyping)
> a subtype is a datatype that is related to another datatype (the supertype) by some notion of substitutability
- A라는 [Data type](https://en.wikipedia.org/wiki/Data_type)이 B라는 Data type을 대체할 수 있을 경우
    - 이때 A는 B의 Subtype이라고 말할 수 있다.
    - B는 A의 Supertype이라고 말할 수 있다.
    - 역할을 대체가 가능한지가 Subtype의 중요한 포인트인거 같다.
    - [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
    - [Category Theory](https://en.wikipedia.org/wiki/Category_theory)


- 간단한 예를 들어보자.

![[Assets/posts/img/2021-05-02-23-54-40.png]]

- bird라는 클래스가 존재하고 하위에 duck, cuckoo, ostrich라는 클래스가 존재한다.
- duck, cuckoo, ostrich는 `bird라는 고유의 특성`을 가지고 있으며 각자의 특성을 가지고 있다.
- 그렇기 때문에 bird와 duck, cuckoo, ostrich는 `supertype - subtype`의 관계를 가지고 있다.
    - 이 관계는 `duck, cuckoo, ostrich <: bird` 로 표기할 수 있다.
    - 여기까지는 이해가 잘 된다.


- 이제 코드를 통해 이해해보자.
    - 아래의 그림은 Java의 Collection Subtyping 관계도를 표현한 것이다.

![[Assets/posts/img/2021-05-13-00-12-00.png]]

- `Cat <: Animal`의 관계일때
    - 그림을 보면 `List<Cat> <: List<Animal>`이 성립하지 않는 것을 확인할 수 있다.

#### 왜 자연스럽지 못하여 이해하기 어려운 것일까?
- 예를 들어 Animal은 여러가지의 Subtype을 가지고 있다고 가정해보자
    - Dog, Cat, Bird와 같은 Subtype이 있다.

- 아래의 코드는 아무 문제가 없다.
    - Animal의 Subtype인 Dog, Cat, Bird는 대체 가능하다.

```java
List<Animal> animals = new ArrayList<>();
animals.add(dog); // dog
animals.add(cat); // cat
animals.add(bird); // bird
```

#### 조금 더 확장해서 `List<Cat>`는 `List<Animal>`의 Subtype인가?
- 즉 `대체가능한가?`라는 관점에서 바라보자

- 아래의 코드는 컴파일 에러가 발생한다.
    - 왜 컴파일 에러가 발생할까?

```java
List<Cat> cats = new ArrayList<>();
cats.add(smallCat);
cats.add(bigCat);

List<Animal> animals = cats // compile error
```

- `List<Cat>`은 배열을 Heap 메모리에 생성하며 주소를 할당받는다.
    - `List<Animal> = List<Cat>`이 가능하게 된다면?
    - 두 개의 `List`는 같은 메모리 주소를 가지게된다.
    - 이때 `List<Animal>`에 `Dog`를 넣게 되면 어떻게 될까?
        - Dog는 Animal의 Subtype이기 때문에 Dog는 `List<Animal>`에 추가가 된다.
        - 같은 주소를 가지고 있던 `List<Cat>`는 엉뚱한 `Dog`가 들어와 Type이 깨지게 되는 상황이 발생한다.
        - 타입 안정성을 위해 Java에서는 공변을 허용하지 않는다.
        - 반대 상황(`List<Animal> <: List<Cat>`)도 허용하지 않는다.
        - [Reference](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html#heap_pollution)

#### 하지만 이런 상황은?
- `List<Animal>`이 단순히 읽기만 한다면?
    - 즉 변경하지 않는 상황이라면 타입 안정성이 깨질 이유가 없지 않을까?
    - 이렇게 사용하면 더 편하지 않을까?
    - Java의 Wildcard를 통해 해결할 수 있다.

#### 가변성(Variance) 종류에 대해
- 공변(Covariant)
    - Subtype은 허용하지만 SuperType은 허용하지 않는 경우
- 반공변(Contravariant)
    - SuperType은 허용하지만 Subtype은 허용하지 않는 경우
- Bivariant
    - SuperType, Subtype 둘 다 허용하는 경우
- 무공변(Invariant)
     - SuperType, Subtype 둘 다 허용하지 않는 경우

## Reference
- <https://asuraiv.tistory.com/17?category=813980>
- <https://cla9.tistory.com/44?category=814455>
- <http://happinessoncode.com/2017/05/22/java-generic-and-variance-2/>
- <https://woowacourse.github.io/javable/post/2020-11-09-generics-basic/>
- <https://medium.com/mj-studio/%EC%BD%94%ED%8B%80%EB%A6%B0-%EC%A0%9C%EB%84%A4%EB%A6%AD-in-out-3b809869610e>
- <https://docs.oracle.com/javase/tutorial/java/generics/inheritance.html>
- <https://docs.oracle.com/javase/tutorial/java/generics/subtyping.html>
- <https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html>
- <https://dzone.com/articles/covariance-and-contravariance>
