---
layout: post
title: jQuery ready와 load의 차이점
categories: [jQuery]
excerpt: " "
comments: true
share: true
tags: [JQuery,Web]
date: 2017-05-14
---

> read()와 load()의 차이점을 알기 위해선 Browser Process를 이해해야 정확하게 언제 호출되는지 알 수 있기 때문에 먼저 Browser Process에 대해 설명하겠습니다.

## Browser Processing - WebKit

- 가장 먼저 `HTML` 파일을 서버로 부터 네트워크 통신으로 전달 받는다.

![No Image](/assets/posts/20170514/1.PNG)

- `HTML`을 Parser를 통해 `DOM Tree`를 생성한다.
- `DOM Tree` 에는 간략한 정보만 담겨있다.

![No Image](/assets/posts/20170514/2.PNG)

- 그 다음 외부 CSS파일과 함께 포함된 스타일 요소도 파싱한다. `CSS Parser`를 통해 `Style Rules`를 만든다.

![No Image](/assets/posts/20170514/3.PNG)

- 그 다음으로 `DOM`과 `Style Rules`를 결합한 `Render Tree`를 만든다.

![No Image](/assets/posts/20170514/4.PNG)

## ready와 load의 차이점
- `ready` 는 `DOM`이 완성된 이후에 호출되는 callback 함수이다.

``` javascript
$(document).ready(function(){
    alert('READY');
});
```

- `load` 는 `img`와 같은 다른 요소가 모두 load된 이후에 호출되는 callback 함수이다.

``` javascript
$(window).load(function(){
    alert('LOAD');
});
```


## Reference
- <https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/>
- <https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko>
- <http://d2.naver.com/helloworld/59361>
