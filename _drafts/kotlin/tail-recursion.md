## 왜 Tail Recursion이 등장하게 되었을까?
- 재귀 함수를 구현하는 경우 [Memoization](https://en.wikipedia.org/wiki/Memoization)을 활용해 재귀 함수의 호출을 줄이고 성능을 개선할 수 있었다.
- 하지만 함수형 프로그래밍 관점에서는 외부 저장소를 활용하기 때문에 Side Effect가능성이 존재한다.
    - 이를 해결하기 위해 tail recursion이 등장하게 되었다.

```java
private Map<Integer, Integer> memoizeTable = new HashMap<>(); // Side Effect

public int fibonacciMemoize(int n){
    if( n == 0 ) return 0;
    if( n == 1 ) return 1;

    if( this.memoizeTable.containsKey(n) ) {
        return this.memoizeTable.get(n);
    }

    int result = fibonacciMemoize(n-1)+ fibonacciMemoize(n-2);
    this.memoizeTable.put(n, result);

    return result;
}
```

## Tail Recursion이란?
- 자기 자신을 호출하면서도 그 호출이 마지막 연산인 경우를 말한다.
- 일반적인 재귀 호출이 많아지면 Stack overflow가 발생한다.
    - 그러나 tail recursion인 경우 stack frame을 재사용할 수 있다.

#### headRecursion, tailRecursion
- 되도록이면 tailRecursion으로 작성

## Reference
- <https://kotlinlang.org/docs/functions.html#tail-recursive-functions>
- <https://en.wikipedia.org/wiki/Mutual_recursion>
- <https://en.wikipedia.org/wiki/Trampoline_(computing)>