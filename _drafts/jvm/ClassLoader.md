## Java ClassLoader에 대해
> ClassLoader는 클래스들을 동적으로 메모리에 로딩할 책임을 가지고 있다.

### ClassLoader 과정에 대해
#### Loading
> 클래스 로더가 .class 파일을 읽고, 그 내용에 따라 적절한 바이너리 데이터를 만들고 메소드 영역에 저장하는 행위

#### ClassLoader 종류
- 클래스 로더는 계층 구조로 이뤄져 있으며 기본적으로 세가지 클래스 로더가 제공된다.
- Bootstrap ClassLoader
    - 최상위 우선순위를 가진 클래스 로더
    - jre/lib/rt.jar을 로딩한다.
        - 네이티브 코드로 구현되어 있다.
- Extension ClassLoader
    - jre/lib/ext에 포함된 클래스 파일을 로딩한다.
- Application ClassLoader
    - 애플리케이션 클래스패스(애플리케이션 실행할 때 주는 -classpath 옵션 또는 java.class.path 환경 변수의 값에 해당하는 위치)에서 클래스를 읽는다.

- 이때 메소드 영역에 저장하는 데이터
- FQCN(Fully Qualified Class Name)
    - 클래스 인터페이스 ENUM
    - 메소드와 변수
    - 로딩이 끝나면 해당 클래스 타입의 Class 객체를 생성하여 힙영역에 저장

#### Principle
- Delegation
    - 클래스로딩 작업을 상위 클래스로더에 위임한다.
- Visibility
    - 하위 클래스로더는 상위 클래스로더의 내용을 볼 수 있지만 반대로는 볼 수 없다.
- Uniquesness
    - 하위 클래스로더는 상위 클래스로더가 로딩한 클래스를 다시 로딩하지 않게 해서 로딩된 클래스의 유일성을 보장한다.


#### Linking
- 총 세 단계로 나눠져 있다.
- Verify
    - JVM에서 사용이 가능한 형태인지를 검증하는 작업
- Preparation
    - Type이 필요로 하는 Memory를 할당해 주는 작업
- Resolution
    - 심볼릭 메모리 레퍼런스를 메소드 영역에 있는 실제 레퍼런스로 교체한다. 이 과정은 Optional이다.
    - Constant Pool의 Symbolic Reference를 Direct Reference, 즉 실제 메모리 주소 값으로 변경해 주는 작업을 의미

#### Initialization
- Static 변수의 값을 할당한다. (static 블럭이 있다면 이때 실행된다.)
- SuperClass 초기화를 진행한다.
- SuperClass를 초기화한 후 해당 Class의 초기화를 진행한다.


#### Class Load 방식에 대해
- Load Time Dynamic Loading
    - 하나의 클래스를 로딩하는 과정에서 필요한 다른 클래스를 한번에 로딩하는 것을 말한다.
- Run Time Dynamic Loading
    - Reflection과 같은 실제로 메소드가 실행될때 로딩하는 것을 말한다.

#### 왜 클래스 로더들은 여러개여야 하는가?
- 클래스 네임 + 패키지 네임 + 클래스 이름
- 단일 클래스 로더면 왜 안되는거지? 굳이 왜 여러개를 나눠서 역할을 나누는걸까?
    - 예를 들어 같은 이름의 클래스 User라는게 존재한다.
        - A라는 라이브러리에 User클래스, B라는 라이브러리에도 User클래스가 있다고 가정해보자
        - 정말 우연의 일치로 패키지와 클래스이름까지 겹치는 상황
        - 이를 하나의 클래스 로더를 통해 메모리에 올릴려면 마지막에 로드된 클래스가 Overwrite된다.
        - 그럼 기존의 클래스의 메소드와 정보는 날아가게된다.
        - 이를 해결하기 위해 여러개의 클래스로더가 존재한다.
        - Dependency Hell(JAR HELL)
- 그렇다면.. 하나의 라이브러리에는 하나의 클래스로더가 존재하는가?
    - Tomcat ServletClassLoader

## Reference
- <https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html>
- <https://homoefficio.github.io/2018/10/13/Java-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%A1%9C%EB%8D%94-%ED%9B%91%EC%96%B4%EB%B3%B4%EA%B8%B0/>
- <https://javacan.tistory.com/entry/1>
- <https://mia-dahae.tistory.com/97>
- <https://futurists.tistory.com/43>
- <https://www.slipp.net/wiki/pages/viewpage.action?pageId=8880262>
- <https://www.artima.com/insidejvm/ed2/security2.html>