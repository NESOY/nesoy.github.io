## JVM, JRE, JDK에 대해
## JVM(Java Virtual Machine)
- 컴파일된 자바 바이트 코드(.class)를 OS에 특화된 언어로 변환(인터프리터와 JIT 컴파일러)하여 실행해줍니다.
- 바이트 코드를 실행하는 표준의 의미
    - https://docs.oracle.com/javase/specs/jvms/se11/html/
- 이 표준을 구현한 구현체도 JVM
    - Oracle, [Amazon](https://aws.amazon.com/ko/corretto/), Azul, AdoptOpenJDK
- JVM의 종류는?
    - Hotspot
        - https://openjdk.java.net/groups/hotspot/docs/RuntimeOverview.html
        - <https://www.oracle.com/technetwork/java/whitepaper-135217.html>
        - <https://blog.naver.com/2feelus/220738480797>
        - <https://sehun-kim.github.io/sehun/JVM/>
    - openJ9
        - https://kwonnam.pe.kr/wiki/java/openj9


#### JRE
- 자바 애플리케이션을 실행할 수 있도록 구성된 배포판
- JVM을 포함하는 패키지로 볼 수 있고, JVM뿐만 아니라 자바 런타임 환경에서 사용하는 프로퍼티 세팅이나 리소스 파일을 가지고 있습니다.


#### JDK
- JRE + 개발에 필요한 툴들 포함한 패키지
- 개발툴에는
    - appletviewer
    - apt
    - extcheck
    - javadoc
    - jar
    - javap
    - jconsole
    - <https://docs.oracle.com/javase/8/docs/technotes/tools/windows/toc.html>
    - <https://docs.oracle.com/javase/8/docs/technotes/tools/>
- 자바 9부터 모듈 시스템이 들어와서 이 모듈 시스템을 사용해서 JRE 비슷한 걸 만들 수 있다.(jlink)
- 초보 개발자는 JRE만 받아서 javac를 실행하려는 실수를 한다.

#### JIT Compiler
- Just in time Compiler
- <https://aboullaite.me/understanding-jit-compiler-just-in-time-compiler/>
- <http://cr.openjdk.java.net/~vlivanov/talks/2015_JIT_Overview.pdf>
- <https://www.slipp.net/wiki/display/SLS/%231+Java+Compiler>

## JVM 구조
- 클래스 로더가 바이트 코드를 읽어서 메모리에 배치하고 이 코드가 실행될 때 스레드가 생성됩니다.
- 스레드마다 메모리 자원이 할당되고 할당된 메모리에는 스택, PC, Heap 등이 만들어집니다.
- 실행 엔진을 통해서 메모리에 적재된 내용을 interpreting하는데 하나 하나 하기엔 비효율적이니, JIT나 GC를 통해서 효율적으로 스케줄과 메모리를 관리합니다.
- 이 과정에서 성능을 높이기 위해서 네이티브 메소드 인터페이스 기반 네이티브 메소드 라이브러리를 사용할 수 있습니다.


## 클래스로더 시스템
- .class에서 바이트 코드를 읽고 메모리에 저장
- 로딩: 클래스 읽어오는 과정
- 링크: 레퍼런스를 연결하는 과정
- 초기화: static값들 초기화 및 변수에 할당
- 클래스에는 스태틱한 값들을 할당할 수 있다.

## 메모리
- 메모리는 크게 5개의 영역으로 나눠진다.
- 메모스 영역에는 클래스 수준의 정보(클래스 이름, 부모 클래스 이름, 메소드, 변수) 저장, 공유 자원이다.
- 힙 영역에는 객체를 저장, 공유 자원이다.
- 나머지는 스레드에 국한된다.힙이나 메서드는 다른 스레들끼리 공유 가능하다.
- 스택 영역에는 쓰레드마다 런타임 스택을 만들고, 그 안에 메소드 호출을 스택
- 메서드 호출 스택이 쌓여있다. 에러가 날 때 보이는?
- 프레임이라 부르는 블록으로 쌓는다. 쓰레드 종료하면 런타임 스택도 사라진다.
- PC(Program counter) 레지스터, 쓰레드 마다 쓰레드 내 현재 실행할 스택 프레임을 가리키는 포인터가 생성된다.
- 네이티브 메소드 스택: 쓰레듬마다 생김
- <https://javapapers.com/core-java/java-jvm-run-time-data-areas/#Program_Counter_PC_Register>
    - 네이티브 메서드는 메서드에 네이티브라는 키워드가 붙어있음
    - Thread.currentThread()가 대표적

## 실행 엔진
- 인터프리터 : 바이트 코드를 한줄 씩 실행
- JIT 컴파일러: 인터프리터 효율을 높이기 위해, 인터프리터가 반복되는 코드를 발견하면 JIT 컴파일러로 반복되는 코드를 모두 네이티브 코드로 바꿔둔다.
- 그 다음부터 인터프리터는 네이티브 코드로 컴파일된 코드를 바로 사용한다.
- GC(Garbage Collector) 더 이상 참조되지 않는 객체를 모아서 정리한다.
- GC는 이해하고 선택하고 커스텀도 해야한다. 그래서 중요도가 높다.
- 스로우 풋, 스탑더 월드를 줄이는 GC, 서버 운영 중 많은 객체를 생성하고 응답시간이 굉장히 중요하다. -> 스탑 더 월드를 줄이는게 좋다.

## 클래스 로더
- 로딩
    - BootStrap -> extension -> Application
    - 클래스 로더가 .class 파일을 읽고, 그 내용에 따라 적절한 바이너리 데이터를 만들고 메소드 영역에 저장
    - 이때 메소드 영역에 저장하는 데이터
    - FQCN(Fully Qualified Class Name)
        - 클래스 인터페이스 이늄
        - 메소드와 변수
        - 로딩이 끝나면 해당 클래스 타입의 Class 객체를 생성하여 힙영역에 저장
- 링크
    - Verify, Prepare, Reolve(optional) 세 단계로 나눠져 있다.
    - Verify: .class 파일 형식이 유효한지 체크한다.
    - Preparation: 클래스 변수(static 변수)와 기본값에 필요한 메모리
    - Resolve: 심볼릭 메모리 레퍼런스를 메소드 영역에 있는 실제 레퍼런스로 교체한다. 이 과정은 Optional이다.
- 초기화
    - Static 변수의 값을 할당한다. (static 블럭이 있다면 이때 실행된다.)
- 클래스 로더
    - 클래스 로더는 계층 구조로 이뤄져 있으며 기본적으로 세가지 클래스 로더가 제공된다.
    - 부트 스트랩 클래스 로더 - JAVA_HOME\lib에 있는 코어 자바 API를 제공한다. 최상위 우선순위를 가진 클래스 로더
    - 플랫폼 클래스로더 - JAVA_HOME\lib\ext 폴더 또는 java.ext.dirs 시스템 변수에 해당하는 위치에 있는 클래스를 읽는다.
    - 애플리케이션 클래스로더 - 애플리케이션 클래스패스(애플리케이션 실행할 때 주는 -classpath 옵션 또는 java.class.path 환경 변수의 값에 해당하는 위치)에서 클래스를 읽는다.

## 바이트 코드 조작
- 바이트 코드 조작을 이용하면 컴파일된 코드인 바이트 코드의 내용을 바꿀 수 있습니다.
- 대표적인 예로 코드 커버리지 측정이 있습니다.
- 바이트 코드 조작 라이브러리
    - ASM: https://asm.ow2.io/
    - Javassist: https://www.javassist.org/
    - ByteBuddy: https://bytebuddy.net/#/

## 궁금한거 정리하기
- GraalVM
- Hotspot

## Reference
- <https://howtodoinjava.com/java/basics/jdk-jre-jvm/>
- <https://www.geeksforgeeks.org/jvm-works-jvm-architecture/>
- <https://dzone.com/articles/jvm-architecture-explained>
- <https://blog.jamesdbloom.com/JVMInternals.html>
- <https://engineering.linecorp.com/ko/blog/line-open-jdk/>
- <https://carolchen.me/blog/jits-intro/>
- <https://docs.oracle.com/javase/specs/>