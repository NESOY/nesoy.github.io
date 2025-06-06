---
aliases: [/articles/2018-09/Mockito]
comments: false
date: 2018-09-17
description: 
tags: [Mockito]
title: Mockito란?
---
# Mockito란?
- 단위 테스트를 위한 Java mocking framework입니다.

## How to install? 🧐
- [Mockito Maven](https://mvnrepository.com/artifact/org.mockito/mockito-all/1.10.19)

```xml
<!-- https://mvnrepository.com/artifact/org.mockito/mockito-all -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-all</artifactId>
    <version>1.10.19</version>
    <scope>test</scope>
</dependency>
```

- [Junit Maven](https://mvnrepository.com/artifact/junit/junit/4.12)

```xml
<!-- https://mvnrepository.com/artifact/junit/junit -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

## How to use? 🎮

### mock(), @Mock, @InjectMocks
- @Mock
    - mock 객체를 만들어서 반환합니다.
- @InjectMocks
    - @Mock이나 @Spy 객체를 자신의 멤버 클래스와 일치하면 주입시킵니다.

```java
// static으로 import를 하게 되면 조금 더 깨끗하게 볼 수 있습니다.
import static org.mockito.Mockito.*;

// mock 처리를 합니다.
// Annotation, mock() Method 같은 표현입니다.
@Mock
List annotationMockedList
List mockedList = mock(List.class);


//using mock object
mockedList.add("one");
mockedList.clear();

//검증 - 성공
verify(mockedList).add("one"); // add("one")가 호출되었는지 검증합니다.
verify(mockedList).clear(); // clear()가 호출되었는지 검증합니다.
//검증 - 실패
verify(mockedList).add("two"); // add("two")이 호출이 되지 않았기에 실패합니다.
```

### stubbing

```java
// 구체적인 클래스를 mock 처리합니다.
LinkedList mockedList = mock(LinkedList.class);

//stubbing
when(mockedList.get(0)).thenReturn("first"); // get(0)이 호출되면 "first"를 반환합니다.
when(mockedList.get(1)).thenThrow(new RuntimeException()); // get(1)이 호출되면 RuntimeException 에러를 발생합니다.

System.out.println(mockedList.get(0)); // "first"
System.out.println(mockedList.get(1)); // RuntimeException()
System.out.println(mockedList.get(999)); // 999에 대한 stub 처리를 하지 않았기 때문에 null값이 return됩니다.
```


### 매개변수 검증

```java
// 모든 Integer 타입 매개변수를 받을 경우 "element"를 돌려줍니다.
when(mockedList.get(anyInt())).thenReturn("element");

//커스텀 Matcher를 사용하여 stubing합니다.
when(mockedList.contains(argThat(isValid()))).thenReturn("element");

// "element"
System.out.println(mockedList.get(999));

// 검증 - Integer 타입 매개변수를 받으며 호출되었는지 검증합니다.
verify(mockedList).get(anyInt());
// 검증 - argument matchers
verify(mockedList).add(argThat(someString -> someString.length() > 5));

// 값을 검증할때에는 eq()로 감싸야 호출해야 합니다.
verify(mock).someMethod(anyInt(), anyString(), eq("third argument"));
// 그렇지 않을 경우 실패하게 됩니다.
verify(mock).someMethod(anyInt(), anyString(), "third argument");
```


### 호출횟수, 호출시간 검증
- times(1)은 기본값입니다.

```java
//using mock
mockedList.add("once");

mockedList.add("twice");
mockedList.add("twice");

mockedList.add("three times");
mockedList.add("three times");
mockedList.add("three times");

// 검증 방법에는 아래와 같이 2가지 방법이 있습니다.
verify(mockedList).add("once");
verify(mockedList, times(1)).add("once");


// 아래와 같이 2, 3번도 검증이 가능합니다 :D
verify(mockedList, times(2)).add("twice");
verify(mockedList, times(3)).add("three times");

// 한번도 호출되지 않는 경우 never()같이 표현할 수 있습니다 ::= times(0)
verify(mockedList, never()).add("never happened");

// 적어도 한번, 적어도 x번, 최대 x번
verify(mockedList, atLeastOnce()).add("three times");
verify(mockedList, atLeast(2)).add("three times");
verify(mockedList, atMost(5)).add("three times");

// 시간에 대한 검증
verify(mockedList, timeout(100)).add("three times");

// 시간 & 횟수 검증
verify(mock, timeout(100).times(2)).someMethod();
verify(mock, timeout(100).atLeast(2)).someMethod();
```

### Stubbing void Method

```java
// mockedList의 clear를 호출하였을때 RunTimeException을 반환하게 됩니다.
doThrow(new RuntimeException()).when(mockedList).clear();

// RuntimeException
mockedList.clear();
```

### 순서에 대한 검증

```java
List singleMock = mock(List.class);

singleMock.add("was added first");
singleMock.add("was added second");

// 중위 순회 Case
InOrder inOrder = inOrder(singleMock);

// "was added first"부터 검증후 "was added second"를 검증하여 순서에 대한 검증을 진행합니다.
inOrder.verify(singleMock).add("was added first");
inOrder.verify(singleMock).add("was added second");
```

### 아무일이 일어나지 않는 mock에 대한 검증

```java
// mockOne만 add를 호출합니다.
mockOne.add("one");

// 일반적인 검증입니다.
verify(mockOne).add("one");
verify(mockOne, never()).add("two");

// 나머지 mock은 아무 일이 발생하지 않았기 때문에 그 부분에 대한 검증입니다.
verifyZeroInteractions(mockTwo, mockThree);
```

### 연속적인 Stubbing

```java
when(mock.someMethod("some arg"))
.thenThrow(new RuntimeException()) // 첫번째 Return
.thenReturn("foo");                // 두번째 Return

//첫번째 call: throws runtime exception:
mock.someMethod("some arg");

//두번째 call: "foo"
System.out.println(mock.someMethod("some arg"));

//가장 마지막 Stubbing한 값을 Return 합니다.
System.out.println(mock.someMethod("some arg"));

// 호출한 순서대로 결과값을 Return 합니다.
when(mock.someMethod("some arg"))
.thenReturn("one", "two", "three");
```

### Spying, @Spy
- Spy를 통해 실제 객체를 생성하고 필요한 부분에만 mock처리하여 검증을 진행할 수 있습니다.

```java
List list = new LinkedList();
List spy = spy(list);

// Method에 대한 stubbing
when(spy.size()).thenReturn(100);

// 실제 객체의 Method를 호출합니다.
spy.add("one");
spy.add("two");

// "one"
System.out.println(spy.get(0));

// Stubbing된 Method의 결과 : 100
System.out.println(spy.size());


// Spy의 주의할 점.
List list = new LinkedList();
List spy = spy(list);

// 실제 객체에 아무것도 없기때문에 when을 호출하게 되면 IndexOutofBoundsException이 발생합니다.
when(spy.get(0)).thenReturn("foo");

// 그렇기 때문에 doReturn으로 stubbing을 진행합니다.
doReturn("foo").when(spy).get(0);
```


## Reference
- <http://static.javadoc.io/org.mockito/mockito-core/2.22.0/org/mockito/Mockito.html>
- <https://jdm.kr/blog/222>
