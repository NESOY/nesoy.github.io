---
title: 객체 지향 프로그래밍(Object-Oriented Programming)이란?
tags:
  - Programming
date: 2018-05-24
aliases: 
  - ../articles/2018-05/Object-Oriented-Programming
---

![[Assets/logo/oop.png]]

## 객체 지향 프로그래밍(Object-Oriented Programming)이란?
### 추상화(Abstraction)
추상화는 주제 영역(Subject Domain Area)내에서 시스템에 참여 시키고자 하는 대상에 대한 관심점(a point of concern)의 표현방법이다. 다만, **있는 그대로 풀어내는 것이 아니라, 모듈의 단위를 결정하기 위한 '단어'를 정하는 것**이다. 추상화 단계에서 속성(attribute)과 행위(Behavior)를 분리해 내는 방식은 추상화 혼란을 일으키기 쉽기 때문에, 명백하다 생각되는 경우를 제외하고는 관계(relation)를 통해 속성과 행위를 찾아내는 방식을 선호한다.

> 현실 세계에 존재하는 모델의 정보를 모두 표현하기 보다는 요구 사항에 따라 모델의 필요한 정보와 행위만 추려 모델링하는 과정을 추상화라고 할 수 있다.

### 캡슐화(Encapsulation)
추상화의 목적이 대상에 대한 관심 영역의 시야 한정(limitation of view)이라고 한다면, 캡슐화는 정보의 영역의 한정(limitation of information area)이 목적이다. 정보(Information, 혹은 Data)를 객체 안에 포함시키고, **그 정보에 대한 직접 접근은 허용하지 않는 대신, 필요에 따라 확인할 수 있는 접근점(인터페이스)을 외부에 공개하는 방식이다.** 가끔, 캡슐화와 정보은닉(Information Hiding)에 대해서 혼란을 겪을 수 있는데, 캡슐화는 모듈화(modularity)의 의미가 더 강하고, 정보 은닉은 '대상에 대한 정보를 묻지(Query) 않으면 알 수 없게 만든다'는 의미를 갖는다. 따라서, 잘 된 캡슐화는 정보 은닉의 내용을 포함한다.

> 단순히 Variable을 private으로 선언하고 getter/setter로 Encapsulation하는 행위는 좋지 않다. 조금 더 의미있는 Method로 Encapsulation하도록 노력하자.


### 상속(Inheritance)
상속은 추상화와 캡슐화가 이루어진 모듈에 대한 세분화된 체계(Datailed Category)이다. 따라서, 얼마만큼 세분화(=상속)할 것인가는 설계자의 의지에 달려있다. 흔히 상세(Detail)와 복잡(Complextity)은 비례하기 때문에, 현대 프로그래밍에서는 **상속은 최소한으로 한정 할 것**을 권장하고 있다.

> 작은 프로젝트가 아닌 대규모 크기의 프로젝트에서는 다중 상속이나 상속의 상속은 복잡도가 높아지기 때문에 최소한으로 상속을 지키려 노력하자.

### 다형성(Polymorphism)
다형성은 모듈이 갖고 있는 자아 정체성(Identity)과 그 것의 표현 방식을 의미한다. 말하자면, 학생은 모두 공부를 해야 하지만, 공부하는 방식은 각자가 다 다르며, 그로 인해 각각의 학생은 구별된다. **다형성을 극대화 하기 위해 우리는 종종 추상 클래스(Abstract class)나 인터페이스(Interface, Pure Virtual Function)를 이용**한다.

> 인터페이스를 사용하게 된다면 매우 쉽게 확장성있는 구조로 만들 수 있다. 하지만 인터페이스가 앞으로 변할 가능성이 있는지 고려하여 적절하게 인터페이스를 분리하는 것도 좋은 방법이다.


## Update 2018.11.10 - 객체지향의 사실과 오해
- 객체지향 설계라는 예술은 적절한 객체에게 적절한 책임을 할당하는 것에서 시작된다.
- 시스템의 행위를 구현하기 위해 다른 객체와 협력한다. 각 객체는 협력 내에서 정해진 역할을 수행하며 역할은 관련된 책임의 집합이다.
- 객체는 다른 객체와 협력하기 위해 메시지를 전송하고, 메시지를 수신한 객체는 메시지를 처리하는 데 적합한 메서드를 자율적으로 선택한다.
- 객체의 역할, 책임, 협력에 집중하라. 중요한 건 클래스를 지향하는 것이 아니다.

## Reference
- <http://blog.doortts.com/67>
- <http://woowabros.github.io/study/2016/07/07/think_object_oriented.html>

