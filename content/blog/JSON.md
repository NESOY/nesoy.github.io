---
aliases: [/articles/2017-02/JSON]
comments: false
date: 2017-02-08
description: 
tags: [JSON, Web]
title: JSON
---
# JSON
> 지난 번 포스팅에서 Restful API관하여 자세히 알아보다가 공개된 OPEN API 대부분 JSON을 활용하여 데이터를 주고 받는 다는 것을 알았다. 위 포스팅에서는 JSON의 개념과 어떠한 형식에 대해 좀 더 자세히 알아보고 JSON에 관련된 Library가 무엇이 있는지 알아본다.

## 1. JSON(JavaScript Object Notation)이란?
- JSON은 경량(Lightweight)의 DATA-교환 형식
- Javascript에서 객체를 만들 때 사용하는 표현식을 의미한다.
- JSON 표현식은 사람과 기계 모두 이해하기 쉬우며 용량이 작아서, 최근에는 JSON이 XML을 대체해서 데이터 전송 등에 많이 사용한다.
- 특정 언어에 종속되지 않으며, 대부분의 프로그래밍 언어에서 JSON 포맷의 데이터를 핸들링 할 수 있는 라이브러리를 제공한다.

## 2. JSON(JavaScript Object Notation) 형식

### 2.1 Name-value 형식의 쌍(pair)
- 여러 가지 언들에서 object, hashtable, struct로 실현되었다.
- { String key :  String Value}

```json
{
  "firstName": "Kwon",
  "lastName": "YoungJae",
  "email": "kyoje11@gmail.com"
}
```

### 2.2 값들의 순서화된 리스트 형식
- 여러 가지 언어들에서 배열(Array), 리스트(List)로 실현되었다.
- [ value1, value2, ..... ]

```json
{
  "firstName": "Kwon",
  "lastName": "YoungJae",
  "email": "kyoje11@gmail.com",
  "hobby": ["puzzles","swimming"]
}
```

## 3. JSON Library - Jackson(Java) 적용하기
- JSON은 쉽게 객체(Object)로 바꿔주거나 객체(Object)를 JSON으로 바꿔주는 Library가 대부분 언어에서 존재한다.
- Jackson : <https://github.com/FasterXML/jackson>
- **Spring Framework** 를 사용하여 예시를 들어보이겠다.

### 3.1 Maven의 pom.xml의 추가하기
- Jackson이라고 치면 가장 위에 보이는 Jackson Databind를 선택한다.

![[assets/posts/20170208/1.PNG]]

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.5.1</version>
</dependency>
```

### 3.2 @ResponseBody를 사용하여 JSON형태로 응답하기
- Controller를 통해 View로 넘어가지 않고 데이터(*JSON OR XML*)를 넘겨 줄 수 있다.
- Spring 3.1에서부터 <mvc:annotation-driven></mvc:annotation-driven>을 사용하면 HttpMessageConverter가 자동으로 등록된다.
- **@ResponseBody** : Return 값은 View를 통해서 출력되는 것이 아니라 HTTP Response Body에 직접쓰여진다.

- annotation-driven 활성화 하기

```xml
<mvc:annotation-driven></mvc:annotation-driven>
```

- RestfulController의 getUserList 코드

```java
@RequestMapping(value = "/users", method = RequestMethod.GET)
@ResponseBody
public Map getUserList(){
  List<Offer> userList = offersService.getCurrent(); // DB에 등록된 User List를 받아온다.
  Map result = new HashMap();

  result.put("result",Boolean.TRUE);
  result.put("data",userList);

  return result;
}
```

### 3.3 서버를 작동시켜 확인해보기.
- RequestMapping된 주소인 `http://localhost:8080/users` 확인해보자.

- 결과 모습 : 잘 도착했지만 보기가 불편하다.

![[assets/posts/20170208/2.PNG]]


### 3.4 PostMan을 통해 예쁘게 보자.
- Postman이라는 크롬 앱을 통해 예쁘게 볼 수도 있고 다양한 테스트도 가능하다.
- Download : <https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop>
- 결과 모습 : 예쁜 모습으로 볼 수 있다.

![[assets/posts/20170208/3.PNG]]


## Reference
- [JSON과 Payload](https://minieetea.com/2017/03/archives/5001)
- <http://pedrorijo.com/blog/scala-json/>
- <http://blog.naver.com/haengro/220891448970>
