---
aliases: [/articles/2017-03/Selenium]
comments: false
date: 2017-03-31
description: 
tags: [Selenium, Spring, Testing, Web]
title: Selenium을 이용하여 스프링(Spring) Test하기
---
# Selenium
> Web Page를 작성하였지만 실제로 하나하나 테스트를 하기엔 많은 시간과 노력이 필요하다. Testing을 쉽게 도와주는 프레임워크인 Selenium을 통해 여러가지 기능 테스트를 작성하여 쉽고 빠르게 기능테스트를 할 수 있다. 이번 포스트에서는 Selenium설치과정과 SpringBoot에 적용하는 방법을 설명하겠다.

![[assets/posts/20170331/1.jpg]]

## Selenium(셀레늄)이란?
- Selenium은 웹 어플리케이션을 위한 테스팅 프레임워크로 자동화 테스트를 위한 여러가지 강력한 기능을 지원해준다.
- C#, Groovy, Java, Perl, PHP, Python, Ruby and Scala등 다양한 언어를 지원한다.

### Selenium 설치하기
- Maven, Gradle에 추가하기 : <http://www.mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java>

- Maven : Version 3.3.1

```xml
<!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>3.3.1</version>
</dependency>
```

- Gradle : Version 3.3.1

```xml
// https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java
compile group: 'org.seleniumhq.selenium', name: 'selenium-java', version: '3.3.1'
```

### WebDriver 다운받기
- Test하고 싶은 브라우저(Browser)를 선택하여 다운로드 받기
- WebDriver 자료 : <http://docs.seleniumhq.org/download/>
- 저는 ChromeDriver를 사용하여 진행하였습니다.

![[assets/posts/20170331/2.PNG]]

## SpringBoot에 Selenium(셀레늄)을 활용하여 Test하기

### Test Code 작성하기
- Junit에 대해 알면 더욱 좋습니다. 관련 글 : <https://nesoy.github.io/articles/2017-02/JUnit>
- Selenium Documentation : <http://www.seleniumhq.org/docs/index.jsp>
- 다운받은 ChromeDriver 위치를 넣어줍니다.
- 간단한 Title 확인 Test 코드

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class HomePageTest {
    private WebDriver driver;
    @Before
    public void setUp(){
        System.setProperty("webdriver.chrome.driver", "src/test/driver/chromedriver"); // 다운받은 ChromeDriver 위치를 넣어줍니다.
        driver = new ChromeDriver(); // Driver 생성
    }
    @After
    public void tearDown(){
        driver.quit();  // Driver 종료
    }

    @Test
    public void test_title(){ //타이틀 확인하는 테스트 코드
        driver.get("Test URL입력"); // URL로 접속하기
        WebElement coolestWidgetEvah = driver.findElement(By.id("coolestWidgetEvah")); //id로 Element 가져오기
        WebElement cheese = driver.findElements(By.className("cheese")); //클래스이름으로 Element 가져오기
        WebElement iframe = driver.findElement(By.tagName("iframe")); //태그이름으로 Element 가져오기
        Assert.assertThat(driver.getTitle(),is("URL의 Title")); // Title 확인 작업
    }
}
```

### Test 결과확인하기
- 성공시 결과화면

![[assets/posts/20170331/3.PNG]]

- 실패시 결과화면

![[assets/posts/20170331/4.PNG]]

### Conclusion
> 다양한 Selenium(셀레늄)의 기능들을 활용하여 많은 Test를 작성하여 시간과 노력을 절약할 수 있다.

## Reference
- <https://en.wikipedia.org/wiki/Selenium>
- <http://wiki.gurubee.net/pages/viewpage.action?pageId=6259762>
