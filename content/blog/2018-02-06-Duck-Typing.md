---
title: 덕 타이핑(Duck Typing)이란?
tags:
  - Programming
date: 2018-02-06
aliases: 
  - ../articles/2018-02/Duck-Typing
---

> 만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리를 낸다면 나는 그 새를 오리라고 부를 것이다.

# 덕 타이핑(Duck Typing)이란?
- 사람이 오리처럼 행동하면 오리로 봐도 무방하다라는게 덕 타이핑(Duck Typing)이다.
- 타입을 미리 정하는게 아니라 실행이 되었을 때 해당 Method들을 확인하여 타입을 정한다.
- 장점
    - 타입에 대해 매우 자유롭다.
    - 런타임 데이터를 기반으로 한 기능과 자료형을 창출하는 것
- 단점
    - 런타임 자료형 오류가 발생할 수 있다 런타임에서, 값은 예상치 못한 유형이 있을 수 있고, 그 자료형에 대한 무의미한 작업이 적용된다. 
    - 이런 오류가 프로그래밍 실수 구문에서 오랜 시간 후에 발생할 수 있다 
    - 데이터의 잘못된 자료형의 장소로 전달되는 구문은 작성하지 않아야 한다. 이것은 버그를 찾기 어려울 수도 있다.

## Example Code
```python
class Parrot:
    def fly(self):
        print("Parrot flying")

class Airplane:
    def fly(self):
        print("Airplane flying")

class Whale:
    def swim(self):
        print("Whale swimming")

def lift_off(entity):
    entity.fly()

parrot = Parrot()
airplane = Airplane()
whale = Whale()

lift_off(parrot) # prints `Parrot flying`
lift_off(airplane) # prints `Airplane flying`
lift_off(whale) # Throws the error `'Whale' object has no attribute 'fly'`
```

## 사례
- 스몰토크, 루비, 파이썬에서 덕 타이핑은 매우 많이 쓰이고 있다.

## 결론
- 동적으로 정형된 언어의 개발은 자주 `단위 테스트`와 같은 프로그래밍 정책에 의해 지원된다. 
- 테스트는 전문 소프트웨어 개발에서 핵심 방법이고, 동적으로 정형된 언어의 경우에 특히 중요하다.
- 실제로, 올바른 프로그램이 작동을 보장하기 위해 했던 테스트는 정적 자료형 검사보다 훨씬 넓은 오류 범위를 감지할 수 있지만, 반대로 정적 자료형 검사가 감지할 수 있는 오류를 종합적으로 검색할 수 없다.

## Reference
- <https://en.wikipedia.org/wiki/Duck_typing>
- <https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84>
