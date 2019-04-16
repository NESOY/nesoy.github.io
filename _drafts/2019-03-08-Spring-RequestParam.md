---
layout: post
title: Spring Request Parameter Annotation에 대해
excerpt: ''
categories:
- Spring
tags:
- Spring
date: 2019-03-08
---
![No Image](/assets/logo/spring.png)

### @RequestParam
- 단일 HTTP 요청 파라미터를 메소드 파라미터에 넣어주는 Annotation

### @ModelAttribute
- 도메인 오브젝트나 DTO의 Property에 요청 Parameter를 Binding해서 한번에 받는 역할.
- Validation 작업이 추가로 진행된다.
- [Command Pattern](https://gmlwjd9405.github.io/2018/07/07/command-pattern.html)

#### Example - TestModel의 Field가 추가된다면?
![](/assets/posts/img/2019-03-19-13-44-34.png)

- `@RequestParam`은 API의 Parameter를 추가해야하는 비용이 발생한다.
- `@ModelAttribute`은 Model로 Binding하기 때문에 따로 API에 추가하지 않아도 된다.

#### 그렇다면 Object앞에 Annotation을 제거하면?
![](/assets/posts/img/2019-03-19-13-52-56.png)

- String, int와 같은 타입은 자동으로 `@RequestParam`으로 결정한다.
- 꼭 단순 타입이 아니라고 해서 꼭 @ModelAttribute가 생략됐다고 볼 수는 없다.
- 그렇기에 무조건 Annotation을 생략하는건 위험할 수 있다.


### @RequestBody
-

### 그렇다면 Spring은 어떻게 Model Binding을 할까?
-

## Reference
- <https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html>
- <https://taetaetae.github.io/2017/03/12/spring-parameter/>
- <https://github.com/HomoEfficio/dev-tips/blob/master/Request%20Body%EB%A1%9C%20%EB%B3%B4%EB%82%B4%EC%A7%80%EB%8A%94%20JSON%EC%9D%98%20%ED%96%89%EB%B0%A9%20%EB%B6%88%EB%AA%85.md>
- <https://developer.mozilla.org/ko/docs/Web/HTTP/Messages>