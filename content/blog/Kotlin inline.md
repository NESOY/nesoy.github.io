---
title: Kotlin inline
description:
aliases: []
date: 2025-09-02
category: "[[Kotlin]]"
comments: true
---
# Kotlin inline
## 배경
- [[고차 함수]]를 사용하면 특정한 런타임 페널티가 발생할 수 있다.
	- 각 함수는 객체이며, [[Closure]]를 캡처하기 때문이다.
	- 함수 객체와 클래스에 대한 메모리 할당, 그리고 가상 호출은 런타임에서 오버헤드를 유발한다.
- 그렇기 때문에 이런 오버헤드는 **람다 표현식을 인라인 처리함으로써 제거할 수 있다.**

## 예시
```kotlin
# 함수형으로 선언된 예시
lock(l) { foo() }

# 컴파일가 아래 형태로 최적화한 예시
l.lock() 
try { 
	foo() 
} finally { 
	l.unlock() 
}
```
- 코틀린에서 `inline` 키워드를 사용하면 실제로 호출 지점에 **직접 삽입(inline)** 한다. 
- 그렇지만 너무 큰 함수에 inline을 사용하는건 성능상으로 이득을 볼 수 없는 주의해야 한다.

## See Also
- [[Kotlin reified type parameter]]

## Reference
- https://kotlinlang.org/docs/inline-functions.html

