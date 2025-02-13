---
title: 왜 비즈니스 로직은 Model(Domain)에 가까울수록 좋은가?
tags:
  - Design Pattern
date: 2018-04-14
aliases: 
  - ../articles/2018-04/why-close-to-domain
---
# 들어가며
> MVC는 알고 있었지만 Service에 대한 존재의 이유. 비즈니스 로직이 Model(Domain)에 가까울 수록 좋다고 듣기는 했지만 왜 그런지에 대해 이해하기 힘들었습니다. '자바 웹 프로그래밍 Next Step'이라는 책을 통해 이해를 하였고 정리하기 위해 블로그를 씁니다.

# 왜 비즈니스 로직은 Domain에 가까울수록 좋은가?
> 로그인 과정을 예시로 설명해보겠습니다.

## 일반 사용자 로그인에 대한 요구사항
- `/login`이라는 Request가 들어오게 되면 `userLoginController`가 요청을 받아 `User` 모델을 읽어 id와 비밀번호를 확인하는 작업을 Controller에 작성했습니다.

![[Assets/posts/20180414/2.png]]

## 관리자 로그인에 대한 요구사항
- 로그인의 서비스가 필요한 Controller가 관리자 로그인[`/admin`]에서도 필요한 것 같습니다. 그래서 로그인 하는 로직을 `adminController`에서도 작성을 합니다.

![[Assets/posts/20180414/3.png]]

## Login 로직의 중복
- `userLoginController`과 `adminController`에서도 로그인하는 로직이 중복되는 것을 확인할 수 있습니다. 그렇기 때문에 `LoginService`를 만들어 각 Controller에 있는 로그인 로직을 추출하여 Service로 이동시킵니다.

![[Assets/posts/20180414/4.png]]

## 블랙유저 리스트에 대한 요구사항
- 블랙유저 리스트를 로그인에서 제외하고 싶은 요구사항이 생겼습니다. 로그인하는 로직에 `BlackUser`의 모델을 읽어 로그인에서 제외하고 싶은 로직을 추가하였습니다.

![[Assets/posts/20180414/5.png]]

## Vip유저에 대한 요구사항
- Vip유저를 로그인에서 정보를 추가하고 싶은 요구사항이 생겼습니다. 로그인하는 로직에 `VipUser`의 모델을 읽어 로그인에서 `isVip=true`를 추가해서 넘겨줍니다.

![[Assets/posts/20180414/6.png]]

위의 과정에서 볼 수 있듯이 Service Layer는 다양한 Model(Domain)을 읽어 제공합니다. 복잡한 서비스는 더 많은 Model을 읽어 서비스를 제공하기 때문에 Service 로직의 복잡도가 매우 높아집니다. 복잡도가 증가하면 유지보수와 테스트하기 힘든 상황이 발생하고 결국엔 유연하지 못한 Software가 됩니다.

이런 로직의 복잡도를 최대로 낮추기 위해 최대한 비즈니스 로직을 Model(Domain)쪽으로 이동시킵니다. 비즈니스 로직이 Model(Domain)에 가까울 수록 Service의 복잡도를 낮추는 효과를 얻을 수 있습니다. 복잡도를 낮춤으로써 유지보수와 테스트하기 쉬운 코드가 생기고 결국엔 유연한 Software를 얻을 수 있습니다.

그러면 Model(Domain)의 복잡도가 증가하면 어떻게 해야할까요? 제 생각에는 Model(Domain)의 복잡도가 증가하면 적절하게 Model(Domain)의 역할을 나눠야하는 과정이 필요할 것 같습니다.

### Update. 2018.11.09 - 객체지향의 사실과 오해
- 안정적인 도메인 모델을 기반으로 시스템의 기능을 구현할 경우 시스템의 기능이 변경되더라도 비즈니스의 핵심 정책이나 규칙이 변경되지 않는 한 전체적인 구조가 한 번에 흔들리지는 않는다.


## 계층형 패턴(Layered Pattern)이란?
> 위의 그림을 이해하는 데 도움이 될 계층형 패턴(Layered Pattern)입니다.

![[Assets/posts/20180414/1.png]]

- Component를 추상화 수준에 따라 계층단위로 분류하고 각 계층의 Component는 상위 계층의 Component에 의해 사용되는 패턴입니다.
- `프레젠테이션 계층 (Presentation layer)` - UI 계층 (UI layer)
- `애플리케이션 계층 (Application layer)` - 서비스 계층 (Service layer)
- `비즈니스 논리 계층 (Business logic layer)` - 도메인 계층 (Domain layer)
- `데이터 접근 계층 (Data access layer)` - 영속 계층 (Persistence layer)


## Reference
