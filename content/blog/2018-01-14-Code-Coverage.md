---
title: 코드 커버리지(Code Coverage)란?
tags:
  - Testing
date: 2018-01-14
aliases: 
  - /articles/2018-01/Code-Coverage
---

> Testing shows the presence, not the absence of bugs

# Code Coverage
- 소프트웨어의 테스트를 논할 때 얼마나 테스트가 충분한가를 나타내는 지표중 하나.
- 소프트웨어 테스트를 진행했을 때 코드 자체가 얼마나 실행되었는지 숫자로 볼 수 있다.

## 블랙박스 테스트(Black box test)
- 테스트 시 객체 내부에 무엇이 들어 있는지 알 수 없거나 알지 않아도 된다는 것을 가정하여 테스팅하는 방법.
- 객체 내부가 어떻게 변하던 상관없이 입력을 주었을때 원하는 결과값이 나오면 테스트는 통과하게 된다.

## 화이트박스 테스트(White box test)
- 객체 내부를 확인하고 검증하는 테스트이다.
- 쓰이지 않은 변수는 없는지..? 특정 범위만 받는 함수가 있는지..? 이런 부분을 확인하는 과정이다.
- 코드 커버리지(Code Coverage)는 화이트박스 테스트의 일부이다.

## 코드 커버리지 기준
### 구문 (Statement Coverage)
- 코드 한 줄이 한번 이상 실행된다면 충족된다.

```java
int foo (int x, int y)
{
    int z = 0;
    if ((x > 0) && (y > 0))
    {
        z = x;
    }
    return z;
}
```

`foo(1,1)`을 호출하게 되면 `(x>0)`과 `(y>0)` 조건 둘 다 만족하므로 `z=x;`를 실행하여 모든 Line을 실행하게 됩니다.
그러므로 테스트 `foo(1,1)`는 `Statement Coverage`에 만족한다고 할 수 있습니다.
반대로 `foo(0,1)`은 if문 만족하지 못하기 때문에 `Statement Coverage`에 만족한다고 할 수 없습니다.

### 결정 (Decision Coverage)(Branch Coverage)
- 전체적인 결과가 참/거짓이면 충족된다.

```java
int foo (int x, int y)
{
    int z = 0;
    if ((x > 0) && (y > 0))
    {
        z = x;
    }
    return z;
}
```

`foo(1,1)`, `foo(0,1)`은 결정 Coverage에 만족합니다. 첫번 째의 `foo(1,1)`은 if문을 통과하여 `z=x`가 실행됩니다.
하지만 두번 째의 `foo(0,1)`은 `(x>0)`이라는 조건에 만족하지 않기 때문에 `z=x`가 실행되지 않습니다.
그러므로 `foo(1,1)`, `foo(0,1)`을 실행하였을 때 if문 전체 결과가 `참/거짓`을 만족하기 때문입니다.

### 조건 (Condition Coverage)
- 각 내부 조건이 참/거짓을 가지게 되면 충족된다.

```java
int foo (int x, int y)
{
    int z = 0;
    if ((x > 0) && (y > 0))
    {
        z = x;
    }
    return z;
}
```
`foo(1,0)`과 `foo(0,1)`는 조건 Coverage에 만족합니다.
`(x>0)`에서 `foo(1,0)`에서 `True`이지만 `foo(0,1)`은 `False`입니다.
반대로 `(y>0)`에서 `foo(1,0)`에서 `False`이지만 `foo(0,1)`은 `True`입니다.

그러므로 if문안의 각각 조건을 `true/false`를 둘 다 수행했기 때문에 `조건 (Condition Coverage)`를 만족합니다.


## Reference
- <https://en.wikipedia.org/wiki/Code_coverage>
- <http://blog.naver.com/genycho/60068626587?viewType=pc>
- <https://blog.outsider.ne.kr/954>
- <https://brunch.co.kr/@leehosung/43>
