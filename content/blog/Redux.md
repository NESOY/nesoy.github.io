---
aliases: [/articles/2019-02/Redux]
comments: false
date: 2019-02-26
description: 
tags: [Redux]
title: Redux
---
# Redux
## 왜 Flux가 등장하게 되었을까?
### 기존의 MVC 아키텍처
![[assets/posts/img/2019-02-27-12-27-34.png]]

- Model
- Viewxxs
    - 모델의 변화를 사용자에게 노출하는 역할
- Controller
    - 모델의 데이터를 조회하거나 업데이트 하는 역할

### 기존의 MVC의 한계점은 어떤게 있을까?
![[assets/posts/img/2019-02-27-12-29-54.png]]

- 페이스북과 같은 대규모 애플리케이션에서는 MVC가 너무 빠르게, 너무 복잡해지는 성격을 가지고 있습니다.
- 구조가 너무 복잡하기에 새 기능을 추가하기에 크고 작은 문제 발생.
- 대표적인 예
    - 페이스북 안 읽은 개수 표시
    - 읽음 -> 글을 다루는 Thread 모델 Update
    - 동시에 -> unRead Count 모델 Update

> 즉 하나의 Action이 다양한 모델에 변화를 주는 상황에서 기존의 MVC는 데이터 흐름이 예측하기 어려운 문제를 가져오고 있습니다.

## Flux란?
- 기존의 MVC의 문제를 해결하기 위한 애플리케이션 아키텍처입니다.

### Flux 데이터 흐름
![[assets/posts/img/2019-02-27-12-43-14.png]]

- 단방향 데이터 흐름으로 구성되어 있습니다.

#### 왜 양방향 데이터 바인딩이 아닐까?
- 한 모델을 업데이트 한 뒤 다른 모델을 업데이트 해야하는 순차적인 업데이트가 발생할 수 밖에 없습니다.
- 애플리케이션 크기가 증가할수록 사용자의 인터랙션 결과를 예측하기 어려운 문제.

### Flux 구성요소
#### Dispatcher
- 모든 데이터 흐름을 관리하는 허브 역할
- 액션이 발생하면 Dispathcher로 메시지(액션 객체)가 전달 -> 등록된 콜백 함수를 통해 메시지를 스토어 전달합니다.
- 다른 구성요소와 달리 Dispathcher는 전체 애플리케이션에서 한 개의 인스턴스만 사용합니다.

#### Action
- Dispathcher의 특정 Method를 실행하면 스토어에 변화를 일으킬 수 있는데, Action(데이터 묶음)을 인수로 전달한다.
- 보통 액션 타입 또는 액션 아이디라 부르는 고유한 키와 관련 데이터를 포함하는 객체로 만들어집니다.

#### Store
- 애플리케이션 상태를 저장합니다.
- 애플리케이션의 특정 도메인에 해당하는 상태를 다룬다고 보는 편이 좋습니다.
- Example
    - TimeStore : 시간, 재생상태, 위치
    - ImageStore : 이미지 관련 정보
- Dispatcher로부터 메시지를 수신하기 위해선 먼저 콜백 함수를 Dispatcher에 등록해야 합니다.

#### View
- Store의 변경 사항을 감지할 수 있는 EventListener를 등록해야합니다.
- Store에 변경 사항이 발생하면 이를 View 반영하는 역할입니다.

## 왜 Redux가 등장하게 되었을까?
![[assets/posts/img/2019-02-26-11-16-58.png]]

### Component의 State값이 변경되고 다른 부모를 가진 Component에 이를 반영해야 한다면?
- 상위 Component를 통해 변경사항을 전파를 해야 합니다.
- Component간의 결합도가 매우 높아지는 문제가 발생합니다.
- [React에서 Redux를 시작하기 전 배워야 할 8가지](https://edykim.com/ko/post/learn-react-before-using-redux/)

> 이를 해결하기 위해 Redux라는 상태관리자가 등장하게 됩니다.

## Redux란?
![[assets/posts/img/2019-02-26-11-24-13.png]]
- Redux는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너입니다.

### Redux 구성요소
#### Dispatcher
- Redux는 Dispatcher를 명시적으로 생성하지 않고도 Flux를 구현할 수 있도록 작성되었으므로 Dispatcher를 생략할 수 있다.
- 실제 디스패치 동작은 스토어의 dispatch 메소드를 호출하여 실행한다.
#### Action
- Redux에서 액션은 액션 타입(또는 액션 아이디)을 상수로 작성한 후 액션 생성자 함수를 호출하는 방식으로 작성한다.
#### Reducer
- 리듀서(Reducer)는 Flux에는 없는, Redux에서만 찾을 수 있는 용어이다.
- 액션은 어떤 일이 일어났는지는 알려주지만 애플리케이션의 상태를 어떻게 바꾸어야 할지는 알려주지 않는데, Redux 프레임워크에서는 리듀서가 이 역할을 담당한다.
- Flux 애플리케이션에서 스토어 객체를 업데이트하는 콜백 함수와 하는 역할은 비슷하다.
- 주의할 점.
    - 기존의 state는 수정하면 안된다.
    - 상태를 수정할 때는 반드시 Object.assign 등을 사용하여 새로운 객체를 만들어서 반환해야 한다.
    - default 케이스에서 기존 state를 반환해야 한다.

## Reference
- <https://github.com/reduxjs/redux>
- <https://blog.codecentric.de/en/2017/11/developing-modern-offline-apps-reactjs-redux-electron-part-2-reactjs-basics/>
- <https://taegon.kim/archives/5288>
