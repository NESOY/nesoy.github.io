---
layout: post
title: Spring Request Parameter Annotation에 대해
excerpt: ''
categories:
- Spring
tags:
- Spring
date: 2019-04-04
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

-------

## 생각 정리
## What is Problem?
- FE Json Data -> BE API Mapping이 제대로 동작하지 않는 문제점
- FE content-type: application/json
- @ModelAttribute로 하니까 안되고.. @RequestBody로 진행하니까 잘 되네요?
- @RequestBody, @ModelAttribute는 어떤 차이가 있을까?
- @ModelAttribute는 어떻게 Data Binding이 될까?
    - Http -> Controller
        - PropertyEditor로 바인딩
        - @ModelAttribute에서 모델 이름, 모델 타입 정보를 가져온다.
        - 모델 이름과 동일한 것이 있다면 HTTP 세션 체크
        - WebDataBinder에 등록된 Property Editor, Conversion Service
        - WebDataBinder에 등록된 검증기
        - ModelAndView의 모델 맵
        - Controller Method와 BindingResult 파라미터
    - Controller -> View
        - ModelAndView의 모델 맵
        - WebDataBinder에 기본적으로 등록된 MessageCodeResolver
        - MessageSource와 LocalResolver
        - @SessionAttribue 세션 저장 대상 모델 이름
        - 뷰의 EL과 스프링 태그 또는 매크로

- @RequestBody는 어떻게 Data Binding이 될까?
    - Http -> Controller
        - @RequestBody가 붙은 파라미터에는 HTTP 요청의 본문 부분이 그대로 전달된다.
        - 일반적인 GET/POST의 요청 파라미터라면 @RequestBody를 사용할 일이 없을 것이다.
        - 반면에 XML이나 JSON 기반의 메시지를 사용하는 요청의 경우에는 이 방법이 매우 유용
        - AnnotationMethodHandlerAdapter에는 HttpMessageConverter 타입의 메시지 변환기가 여러 개 등록되어 있다.
        - HTTP 요청의 미디어 타입과 파라미터의 타입을 먼저 확인한다.
        - View로 가는게 아니라 MessageConverter를 통해 바로 Response
    - Controller -> View


## HTTP -> Controller -> View
- HTTP Message
    - String -> Object 변환
    - PropertyEditor 이건 어디서 호출하지?