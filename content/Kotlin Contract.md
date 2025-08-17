---
title: Kotlin Contract
description:
aliases: []
date: 2025-08-17
tags: [Kotlin]
comments: true
---
# Kotlin Contract
## 배경
```
// 문자열이 유효한지 (null도 아니고 비어있지도 않은지) 검사하는 함수
fun isValid(value: String?): Boolean {
    return value != null && value.isNotEmpty()
}

fun printVerifiedLength(text: String?) {
    // isValid 함수로 text가 유효한지 검사
    if (isValid(text)) {
        // 컴파일 에러 발생
        // println(text.length)
    }
}
```
- 컴파일러는 함수 내부까지 이해하지 않기 때문에, `isValid` 내부에서 value가 null-safe한지 모른다.
- 그렇기 때문에 text.length를 호출하면, 컴파일러는 컴파일 에러를 반환하게 된다.
- 이런 문제를 해결하기 위해 Kotlin Contract 탄생하게 되었다.

## How to use
```
fun isValid(value: String?): Boolean {
	contract {  
	    returns(true) implies (value != null)  
	}
	return value != null && value.isNotEmpty() 
}
```
- 결과값을 true로 반환하면, value가 null이 아니라는 정보를 [[Compiler]]에게 전달한다.

## 쓰임새
```
fun runBlock(block: () -> Unit) {
	// '이 블록은 여기서, 정확히 한 번 실행된다'고 계약
	contract { 
		callsInPlace(block,InvocationKind.EXACTLY_ONCE) 
	} 
	block() 
}
```
- 함수 호출 보증도 계약을 할 수 있다.

## Reference
- https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.contracts/
- https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.contracts/-contract-builder/
- https://www.baeldung.com/kotlin/contracts
