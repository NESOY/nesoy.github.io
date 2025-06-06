---
aliases: [/articles/2017-01/TDD]
comments: false
date: 2017-01-31
description: 
tags: [JUnit, TDD, Testing]
title: TDD(Test-driven Development) 테스트 주도 개발방법론
---
# TDD(Test-driven Development) 테스트 주도 개발방법론

> 각종 Community에서 개발 프로세스가 TDD가 언급이 되었고 예전에 소프트웨어 개발 프로세스 중에 배웠던 TDD에 대해 깊이 있게 몰랐기 때문에 명확하게 정의를 하고 앞으로 개발 방법을 TDD로 바꾸려고 노력하기 위해 Posting을 해보려고 한다.

## 1. TDD(Test-driven Development)이란?

- #### 일반적인 개발 프로세스
  - 일반적으로 개발 절차는 먼저 어떻게 개발할지 디자인하고 디자인을 바탕으로 실제 코드를 작성하고 최종적으로 테스트를 작동시켜보면서 해보는 과정이었다.

![[assets/posts/20170131/1.PNG]]

- #### TDD(Test-driven Development)
  - 정확한 프로그래밍 목적을 디자인 단계에서 반드시 미리 정의해야만 하고 또 무엇을 미리 정의해야한다.
  - **RED** : 실패하는 테스트를 만들기.
  - **GREEN** : 테스트에 통과할 만한 작은 코드를 작성하기.
  - **REFACTOR** : 반복되는 코드, 긴 메소드, 큰 클래스, 긴 매개변수 목록 등등 코드를 좀 더 효율적으로 바꾸기.

![[assets/posts/20170131/2.gif]]

  - *개발하는 과정에서 Test Script를 작성하고 코드를 Refactoring 했다는 점이 중요하다.*

## 2. TDD 따라하기 (JUnit)

**목표 : Movie라는 클래스에 등급을 부여하고 Averaging Rate구하기**

### 1) JUnit이란?
- 범용적으로 사용되는 단위 테스트 Framework
- Java 언어의 단위 테스트를 위해 사용된다.
- 더 자세한 내용은 JUnit Post <https://nesoy.github.io/articles/2017-02/JUnit>를 참고하면 된다.

### 2) pom.xml JUnit & Hamcrest 추가 코드

```xml
<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.8.2</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.hamcrest</groupId>
			<artifactId>hamcrest-all</artifactId>
			<version>1.1</version>
			<scope>test</scope>
		</dependency>
</dependencies>
```

### 3) JUnit 실행

```java
package movie;

import org.junit.Test;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void foo(){

    }
}
```

Test 결과화면

![[assets/posts/20170131/3.PNG]]

### 4) Failing Test 코드 작성

```java
/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void canCreateMovie(){
        Movie movie = new Movie();
    }
}
```

### 5) Test를 통과하기 위한 소량의 코드 추가

```java
package movie;

/**
 * Created by NESOY on 2017-01-31.
 */
public class Movie {
}
```

Test 결과화면

![[assets/posts/20170131/4.PNG]]

### 6) Averaging Rating Test Case만들기 - 가장 초기 모델이므로 Rate점수가 없다. -> 0점.

```java
package movie;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void canCreateMovie(){
        Movie movie = new Movie();
        assertThat(movie.averageRationg(),is(0));
    }
}
```

### 7) Test를 통과하기 위한 소량의 코드 추가

```java
package movie;

/**
 * Created by NESOY on 2017-01-31.
 */
public class Movie {
    public Integer averageRationg() {
        return 0;
    }
}
```

Test 결과화면

![[assets/posts/20170131/5.PNG]]

### 8) Refactoring하기 - Method 이름 바꾸기

```java
package movie;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void should_return_0_when_just_created(){
        Movie movie = new Movie();
        assertThat(movie.averageRationg(),is(0));
    }
}
```

### 9) Averaging Rating Test Case만들기 -> 1을 주었을때 Average Rate가 1이 나와야한다.

```java
package movie;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void should_return_0_when_just_created(){
        Movie movie = new Movie();
        assertThat(movie.averageRationg(),is(0));
    }

    @Test
    public void should_return_1_when_was_rated(){
        Movie movie = new Movie();
        movie.rate(1);
        assertThat(movie.averageRationg(),is(1));
    }
}
```

### 10) Compile 통과하기 위한 소량의 코드 추가

```java
package movie;

/**
 * Created by NESOY on 2017-01-31.
 */
public class Movie {
    public Integer averageRationg() {
        return 0;
    }

    public void rate(int rate) {

    }
}
```

Test 결과화면

![[assets/posts/20170131/6.PNG]]

> averageRationg Return 값이 어떠한 상황에서도 0이다. 고쳐서 Test를 통과시키자.

```java
package movie;

/**
 * Created by NESOY on 2017-01-31.
 */
public class Movie {
    private int sumOfRate = 0;
    private int countOfRate = 0;

    public Integer averageRationg() {
        return sumOfRate/ countOfRate;
    }

    public void rate(int rate) {
        this.sumOfRate += rate;
        this.countOfRate++;
    }
}
```

Test 결과화면

![[assets/posts/20170131/7.PNG]]

> countOfRate가 0일 경우에 0으로 나누었을 경우 Exception 발생 -> 0일때 예외처리

```java
package movie;

/**
 * Created by NESOY on 2017-01-31.
 */
public class Movie {
    private int sumOfRate = 0;
    private int countOfRate = 0;

    public Integer averageRationg() {
        return countOfRate == 0 ? 0 : sumOfRate/ countOfRate;
    }

    public void rate(int rate) {
        this.sumOfRate += rate;
        this.countOfRate++;
    }
}
```

Test 결과화면

![[assets/posts/20170131/8.PNG]]

### 11) Refactoring - TestCase의 중복되는 부분 제거하기

```java
package movie;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {
    @Test
    public void should_return_0_when_just_created(){
        Movie movie = new Movie(); // 중복
        assertThat(movie.averageRationg(),is(0));
    }

    @Test
    public void should_return_1_when_was_rated(){
        Movie movie = new Movie(); // 중복
        movie.rate(1);
        assertThat(movie.averageRationg(),is(1));
    }
}
```

> Tips : Intellj Refactor - Field - Setup Method 자동으로 해준다.

![[assets/posts/20170131/9.PNG]]

```java
package movie;

import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by NESOY on 2017-01-31.
 */
public class MovieTest {

    private Movie movie;

    @Before
    public void setUp() throws Exception {
        movie = new Movie();
    }

    @Test
    public void should_return_0_when_just_created(){
        Movie movie = this.movie; // 불필요하므로 제거한다.
        assertThat(movie.averageRationg(),is(0));
    }

    @Test
    public void should_return_1_when_was_rated(){
        Movie movie = this.movie; // 불필요하므로 제거한다.
        movie.rate(1);
        assertThat(movie.averageRationg(),is(1));
    }
}
```

### 12) Averaging Rating Test Case만들기 -> 3,5을 주었을때 Average Rate가 4이 나와야한다.

```java
@Test
   public void should_return_4_when_3_and_5_were_rated(){
       movie.rate(3);
       movie.rate(5);
       assertThat(movie.averageRationg(),is(4));
   }
```

Test 결과화면

![[assets/posts/20170131/10.PNG]]


## 3. 실제로 해본 TDD 장점
- 디버깅 시간의 단축이 매우 단축되는 걸 느낄 수 있다.
- 추가 구현이 매우 쉽고 간단하다.
- 리팩토링 과정에서 지속적으로 코드를 개선하기 때문에 재설계 시간의 단축된다.

> 결론 : 매우 좋다. 앞으로 습관들여야겠다.




## Intellj 단축키
- 화면 나누기 : Ctrl + Shift + A + Split Vertical
- Refactoring Field : Ctrl + Shift + A + Field  ( Ctrl + Alt + F)


## Books
- 테스트 주도 개발 - 켄트 벡
<iframe src="https://coupa.ng/bgK1em" width="120" height="240" frameborder="0" scrolling="no"></iframe>


## Reference
- <http://www.hoons.net/Lecture/View/644>
- <http://huns.me/development/716>
- <https://www.youtube.com/watch?v=wmHV6L0e1sU>
- <https://github.com/msbaek/clean-coders-2013>
- <http://www.nextree.co.kr/p11104/>
- <http://huns.me/development/716>
