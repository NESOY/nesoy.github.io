## 실행 엔진
- 인터프리터 : 바이트 코드를 한줄 씩 실행
- JIT 컴파일러: 인터프리터 효율을 높이기 위해, 인터프리터가 반복되는 코드를 발견하면 JIT 컴파일러로 반복되는 코드를 모두 네이티브 코드로 바꿔둔다.
- 그 다음부터 인터프리터는 네이티브 코드로 컴파일된 코드를 바로 사용한다.
- GC(Garbage Collector) 더 이상 참조되지 않는 객체를 모아서 정리한다.
- GC는 이해하고 선택하고 커스텀도 해야한다. 그래서 중요도가 높다.
- 스로우 풋, 스탑더 월드를 줄이는 GC, 서버 운영 중 많은 객체를 생성하고 응답시간이 굉장히 중요하다. -> 스탑 더 월드를 줄이는게 좋다.

## 바이트 코드 조작
- 바이트 코드 조작을 이용하면 컴파일된 코드인 바이트 코드의 내용을 바꿀 수 있습니다.
- 대표적인 예로 코드 커버리지 측정이 있습니다.
- 바이트 코드 조작 라이브러리
    - ASM: https://asm.ow2.io/
    - Javassist: https://www.javassist.org/
    - ByteBuddy: https://bytebuddy.net/#/

#### JIT Compiler
- Just in time Compiler
- <https://aboullaite.me/understanding-jit-compiler-just-in-time-compiler/>
- <http://cr.openjdk.java.net/~vlivanov/talks/2015_JIT_Overview.pdf>
- <https://www.slipp.net/wiki/display/SLS/%231+Java+Compiler

## Reference
- <https://howtodoinjava.com/java/basics/jdk-jre-jvm/>
- <https://www.geeksforgeeks.org/jvm-works-jvm-architecture/>
- <https://dzone.com/articles/jvm-architecture-explained>
- <https://blog.jamesdbloom.com/JVMInternals.html>
- <https://engineering.linecorp.com/ko/blog/line-open-jdk/>
- <https://carolchen.me/blog/jits-intro/>
- <https://docs.oracle.com/javase/specs/>
- <https://medium.com/javarevisited/java-concurrency-java-memory-model-96e3ac36ec6b>
- <https://mihaimoldovan.com/download/Inside-Java-Virtual-Machine.pdf>
- <https://www.youtube.com/watch?v=UzaGOXKVhwU>
- <https://performeister.tistory.com/75>
- <https://www.slipp.net/wiki/display/java/Java+Performance+Fundamental>