---
title: GRASP Pattern이란?
tags:
  - Design Pattern
date: 2019-05-10
aliases: 
  - ../articles/2019-05/GRASP-Pattern
---

![[Assets/logo/design-pattern.jpg]]


## GRASP Pattern이란?
- General Responsibility Assignment Software Patterns
- Object-Oriented 디자인의 핵심은 각 객체에 책임을 부여하는 것.
- 책임을 부여하는 원칙들을 말하고 있는 패턴.
- 구체적인 구조는 없지만, 철학을 배울 수 있다.
- 총 9가지의 원칙을 가지고 있다.

#### Information Expert
- 책임을 수행할 수 있는 데이터를 가지고 있는 객체에 책임을 부여하는 것.
- 객체는 데이터와 처리로직이 함께 묶여 있는 것.
- [정보 은닉](https://en.wikipedia.org/wiki/Information_hiding)을 통해 자신의 데이터를 감추고 오직 Method로만 데이터를 처리하고, 외부에는 그 기능(책임)만을 제공한다.

#### Creator
- 객체의 생성은 생성되는 객체의 컨텍스트를 알고 있는 다른 객체가 있다면, 컨텍스트를 알고 있는 객체에 부여.
- A 객체와 B 객체의 관계의 관계가 다음 중 하나라면 A의 생성을 B의 책임로 부여.
    - B 객체가 A 객체를 포함하고 있다.
    - B 객체가 A 객체의 정보를 기록하고 있다.
    - A 객체가 B 객체의 일부이다.
    - B 객체가 A 객체를 긴밀하게 사용하고 있다.
    - B 객체가 A 객체의 생성에 필요한 정보를 가지고 있다.
- [Factory Pattern](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming))

#### Controller
- 시스템 이벤트(사용자의 요청)를 처리할 객체를 만들자.
- 만약 어떤 서브시스템안에 있는 각 객체의 기능을 직접 사용한다면?
    - 직접적으로 각 객체에 접근하게 된다면 서브시스템과 외부간의 Coupling이 증가되고
    - 서브시스템의 어떤 객체를 수정할 경우, 외부에 주는 충격이 크게 된다.
    - 서브시스템을 사용하는 입장에서 보면, 이 Controller 객체만 알고 있으면 되므로 사용하기 쉽다.

![[Assets/posts/img/2019-05-09-20-58-44.png]]

#### [Low Coupling](https://en.wikipedia.org/wiki/Loose_coupling)
- 객체들간, 서브 시스템들간의 상호의존도가 낮게 책임을 부여.
- Low Coupling은 각 객체, 서브시스템의 재 사용성을 높이고, 시스템 관리에 편하게 한다.
- Object-Oriented 시스템은 각 객체들간의 Communication을 통하여 비즈니스를 완성시킴.
    - 각 객체들 사이에 Coupling이 존재하지 않을 수는 없다.

> 이 패턴은 요구사항은 충족시키면서도 각 객체들, 각 서브시스템 간의 Coupling를 낮은 수준으로 유지하는 방향으로 디자인.


#### [High Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science))
- 각 객체가 밀접하게 연관된 책임들만 가지도록 구성.
- 한 객체, 한 시스템이 자기 자신이 부여받은 책임만을 수행하도록 짜임새 있게 구성되어 있다면?
    - 자신이 부여 받은 책임을 충족시키기 위해 다른 객체나 시스템을 참조하는 일이 적으며 자연스럽게 Low Coupling이 된다.

#### [Polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
- 객체의 종류에 따라 행동양식이 바뀐다면, Polymorphism 기능을 사용하자.
- 만약 객체의 종류에 따라 행동이 바뀐다면 객체의 종류를 체크하는 조건문을 사용하지 말고
    - Object-Oriented 시스템의 Polymorphism 기능을 사용하라.

#### Pure Fabrication
- 도메인에 관련된 문제를 대표하는 것이 아니라면 기능적인 책임을 별도로 한 곳으로 관리하는 객체를 만들자.
    - 데이터베이스 정보를 저장하거나, 로그 정보를 기록하는 책임에 대해 생각해 보자. 각 정보는 각각의 객체들이 가지고 있을 것이다.
    - Information Expert 패턴을 적용하면?
        - 각 객체들이 정보를 저장하고, 로그를 기록하는 책임을 담당해야 하지만, 실제로 그렇게 사용하는 사람들은 없다.
- 시스템 전반적으로 사용하고 있는 기능을 변경한다면?
    -  모든 객체를 수정해야 하는 결과를 가져온다.
    - 즉 Low Coupling의 원칙이 깨어지게 된다.
        - 이럴 경우에는 공통적인 기능을 제공하는 책임을 한 곳으로 모아서 가상의 객체, 서브시스템을 만들어라.

#### Indirection
- 두 객체 사이의 직접적인 Coupling을 피하고 싶으면, 그 사이에 다른 매개체를 통해 전달하는 것.
- 주로 다른 매개체는 인터페이스인 경우가 많다.
    - 그런 특별한 경우는 아래에 설명된 Protected Variations 패턴이라고 부를 수 있다.

#### Protected Variations
- 변경될 여지가 있는 곳에 안정된 인터페이스를 정의해서 사용하자.

### 생각 정리
- [Refactoring](https://nesoy.github.io/articles/2018-05/Refactoring-Example)에서 많이 배운 기법들이 GRASP Pattern을 잘 지키기 위한 방법으로 보인다.


## Reference
- [GRASP 패턴 - 김대곤님](http://www.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS8586826397)
