---
title: ScopedValue
description:
aliases: []
date: 2025-09-05
tags: [Java]
comments: true
---
# ScopedValue
- Java 21에서 도입된 ScopedValue는 [[ThreadLocal]]의 대안으로, 특정 스레드 컨텍스트 내에서 안전하게 값을 전달할 수 있도록 설계
- 이는 특히 가변성(mutation) 문제를 피하면서 효율적인 데이터 전달을 가능

## 특징
- Immutability: 한 번 설정되면 변경할 수 없음
- Context Bound: 특정 범위(스코프) 내에서만 유효
- Thread Safety: ThreadLocal과 달리 불변성을 유지하여 동시성 이슈 감소
- GC 친화적: 불필요한 참조를 남기지 않음

## ThreadLocal 차이
|     특징      | [[Scoped Values]] | [[ThreadLocal]] |
| :---------: | :-------------: | :-------------: |
|    변경 여부    |  Immutability   |     Mutable     |
|     GC      |    Scope 종료시    |     명시적 제거      |
| Thread Safe |       없음        |     발생 가능성      |

## Reference
- https://openjdk.org/jeps/506