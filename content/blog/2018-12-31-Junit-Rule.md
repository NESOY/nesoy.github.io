---
title: JUnit의 Rule이란?
tags:
  - Testing
  - JUnit
date: 2018-12-31
aliases: 
  - ../articles/2018-12/Junit-Rule
---

![[Assets/logo/JUnit.png]]


## JUnit의 Rule이란?
- Rule은 테스트 클래스에서 동작 방식을 재정의 하거나 쉽게 추가하는 것을 가능하게 합니다.
- 사용자는 기존의 Rule을 재사용하거나 확장하는 것이 가능합니다.


## 어떤 Rule이 있을까?
### TemporaryFolder Rule
- 임시폴더, 파일들을 생성할 수 있습니다.
- 테스트가 모두 끝난 후 삭제합니다.
- 기본적으로 resource를 삭제하기 못하는 경우 어떠한 exception도 반환하지 않습니다.

```java
public static class HasTempFolder {
  @Rule
  public final TemporaryFolder folder = new TemporaryFolder();

  @Test
  public void testUsingTempFolder() throws IOException {
    File createdFile = folder.newFile("myfile.txt");
    File createdFolder = folder.newFolder("subfolder");
    // ...
  }
}
```

- 임시 장소에 저장되는 것을 확인할 수 있습니다.

![[Assets/posts/20181231/1.png]]

### ExternalResources Rule
- 외부 Resource(DB Connection, File, Socket) 초기화 / 반환을 관리합니다.
- 특정 자원을 다른 테스트 케이스에서 재사용할 때 유용합니다.

```java
public static class UsesExternalResource {
  Server myServer = new Server();

  @Rule
  public final ExternalResource resource = new ExternalResource() {
    @Override
    protected void before() throws Throwable {
      myServer.connect();
    };

    @Override
    protected void after() {
      myServer.disconnect();
    };
  };

  @Test
  public void testFoo() {
    new Client().run(myServer);
  }
}
```

### ErrorCollector Rule
- 에러가 발생하더라도 지속적으로 테스트를 진행하게 도와주는 Rule입니다.

```java
public static class UsesErrorCollectorTwice {
  @Rule
  public final ErrorCollector collector = new ErrorCollector();

  @Test
  public void example() {
    collector.addError(new Throwable("first thing went wrong"));
    collector.addError(new Throwable("second thing went wrong"));
  }
}
```

- Test를 진행하면서 발생했던 모든 Error 결과를 받아 볼 수 있습니다.

![[Assets/posts/20181231/2.png]]

### Verifier Rule
- 테스트 자체를 검증하는 assert와는 다르게, 테스트 케이스 실행 후 만족해야하는 환경조건이나 Global조건(객체들의 종합 상태)을 검사하는데 사용됩니다.

```java
public static class UsesVerifier {

  private static String sequence;

  @Rule
  public final Verifier collector = new Verifier() {
    @Override
    protected void verify() {
      sequence += "verify ";
    }
  };

  @Test
  public void example() {
    sequence += "test ";
  }

  @Test
  public void verifierRunsAfterTest() {
    sequence = "";
    assertThat(testResult(UsesVerifier.class), isSuccessful());
    assertEquals("test verify ", sequence);
  }
}
```

### TestWatcher
- 테스트 Interceptor (starting, succeeded, failed, finished…)
- AOP와 비슷한 역할을 하는 것으로 보입니다.


```java
import org.junit.AfterClass;
import org.junit.AssumptionViolatedException;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

import static org.junit.Assert.fail;

public class WatchermanTest {
	private static String watchedLog = "";

	@Rule
	public final TestRule watchman = new TestWatcher() {
		@Override
		public Statement apply(Statement base, Description description) {
			return super.apply(base, description);
		}

		@Override
		protected void succeeded(Description description) {
			watchedLog += description.getDisplayName() + " " + "success!\n";
		}

		@Override
		protected void failed(Throwable e, Description description) {
			watchedLog += description.getDisplayName() + " " + e.getClass().getSimpleName() + "\n";
		}

		@Override
		protected void skipped(AssumptionViolatedException e, Description description) {
			watchedLog += description.getDisplayName() + " " + e.getClass().getSimpleName() + "\n";
		}

		@Override
		protected void starting(Description description) {
			super.starting(description);
		}

		@Override
		protected void finished(Description description) {
			super.finished(description);
		}
	};

	@AfterClass
	public static void teardown(){
		System.out.println(watchedLog);
	}

	@Test
	public void fails() {
		fail();
	}

	@Test
	public void test_success() {
	}
}
```

- 테스트 정보를 남기는 코드를 분리하여 기록할 수 있습니다.

![[Assets/posts/20181231/3.png]]

### TestName
- 테스트 메소드명을 얻을 수 있습니다.

```java
public class NameRuleTest {
  @Rule
  public final TestName name = new TestName();

  @Test
  public void testA() {
    assertEquals("testA", name.getMethodName());
  }

  @Test
  public void testB() {
    assertEquals("testB", name.getMethodName());
  }
}
```
### Timeout
- 하나의 테스트가 통과하기 위한 timeout 설정할 수 있습니다. (vs @Timeout)

```java
public static class HasGlobalTimeout {
  public static String log;

  @Rule
  public final TestRule globalTimeout = Timeout.millis(20);

  @Test
  public void testInfiniteLoop1() {
    log += "ran1";
    for(;;) {}
  }

  @Test
  public void testInfiniteLoop2() {
    log += "ran2";
    for(;;) {}
  }
}
```

### ExpectedException
- 예외 직접 확인할 수 있습니다. (vs @Expected)
- Error 메시지도 검증이 가능합니다.

```java
public static class HasExpectedException {
  @Rule
  public final ExpectedException thrown = ExpectedException.none();

  @Test
  public void throwsNothing() {

  }

  @Test
  public void throwsNullPointerException() {
    thrown.expect(NullPointerException.class);
    throw new NullPointerException();
  }

  @Test
  public void throwsNullPointerExceptionWithMessage() {
    thrown.expect(NullPointerException.class);
    thrown.expectMessage("happened?");
    thrown.expectMessage(startsWith("What"));
    throw new NullPointerException("What happened?");
  }
}
```

### ClassRule
- TestSuite의 클래스마다 적용할 수 있는 Rule입니다.

```java
@RunWith(Suite.class)
@SuiteClasses({A.class, B.class, C.class})
public class UsesExternalResource {
  public static final Server myServer = new Server();

  @ClassRule
  public static final ExternalResource resource = new ExternalResource() {
    @Override
    protected void before() throws Throwable {
      myServer.connect();
    };

    @Override
    protected void after() {
      myServer.disconnect();
    };
  };
}
```

### RuleChain
- 여러개의 Rule chaining으로 적용할 수 있습니다.

```java
public class UseRuleChain {
    @Rule
    public final TestRule chain = RuleChain
                           .outerRule(new LoggingRule("outer rule"))
                           .around(new LoggingRule("middle rule"))
                           .around(new LoggingRule("inner rule"));

    @Test
    public void example() {
        assertTrue(true);
    }
}
```

### Custom Rule
- Custom한 Rule도 사용할 수 있습니다.
- <https://github.com/junit-team/junit4/wiki/Rules#custom-rules>

### System Rule
- <https://stefanbirkner.github.io/system-rules/>

## Reference
- <https://github.com/junit-team/junit4/wiki/Rules>
- <http://kwonnam.pe.kr/wiki/java/junit/rule>
- <http://redutan.github.io/2016/07/18/junit-rule>
