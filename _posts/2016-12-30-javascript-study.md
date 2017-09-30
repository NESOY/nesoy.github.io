---
layout: post
title: Javascript Study
categories: [Javascript]
excerpt: " "
comments: true
share: true
tags: [Javascript]
date: 2016-12-30
---

# **Javascript**
![No Image](/assets/posts/20161230/javascript.PNG)

## 1. Javascript 구성요소
![No Image](/assets/posts/20161230/javascript_element.png)

- #### Core(ECMAScript)
  - ##### 자바스크립트의 기본 문법과 구조, 데이터 타입, 조건문, 반목문, 함수, 기본 라이브러리등이 포함
- #### DOM(Document Object Model)
  - ##### DOM(Document Object Model)은 웹문서를 조작할때 지켜야할 인터페이스를 브라우저 제조사의 자신들만의 기술로 기능을 구현한 것
- #### BOM(Browser Object Model)
  - ##### BOM(Browser Object Model)은 브라우저 창에 접근하고 조작할 수 있게 하는 인터페이스

## 2. HTML 속의 자바스크립트
- #### script 요소
  - ##### async - 스크립트를 즉시 내려받지만 자원을 내려받거나 다른 스크립트를 불러오는 등 다른 페이지 작업을 방해해서는 안된다고 지시. 외부 스크립트 파일을 불러올 때만 유효.
  - ##### charset - src 속성으로 명시한 코드의 문자셋을 지정. 좀처럼 쓰이지 않는다.
  - ##### defer - 문서의 콘텐츠를 완전히 파싱하고 표시할 때까지 스크립트 실행을 지연해도 안전함을 나타낸다.  외부 스크립트 파일을 불러올 떄만 유효
  - ##### src - 실행할 코드를 포함한 외부 파일의 위치를 지정
  - ##### type - language 속성을 대체할 의도로 만들어졌다. Default 값은 text/javascript 이다.
  - ##### 참고사이트 :  [http://www.w3schools.com/tags/tag_script.asp](http://www.w3schools.com/tags/tag_script.asp)

- #### 스크립트 파일을 내려받아 실행하며 인라인 코드는 무시.
{% highlight javascript %}
<script type="text/javascript" src="dummy.js">alert('hello')</script>
{% endhighlight %}

- #### 태그 위치
  - ##### head 태그 안에 쓰는 것이 일반적이었습니다. 하지만 브라우저는 body 태그를 만나면서 페이지 렌더링을 시작하기 때문에 렌더링이 지연될 수 있다.<U> 요즘에는 body 태그 맨 밑쪽에 쓴다.</U>

- #### 비동기 스크립트
  - ##### 아래 코드에서는 example2.js가 example1.js보다 먼저 실행될 수 있으므로 파일 사이에 의존성이 있어서는 안된다.
  - ##### async 목적은 스크립트를 모두 내려받아 실행할 때까지 기다리지 않고 뒤에 있는 스크립트 파일을 내려받아 실행해도 좋다고 명시하는 것 <U>(DOM 조작은 비동기적으로 불러오지 않는 편이 좋다.)</U>
  {% highlight html %}
  <script type="text/javascript" async src="example1.js"></script>
  <script type="text/javascript" async src="example2.js"></script>
  {% endhighlight %}

- #### 외부 스크립트 파일 장점
  - ##### 관리하기 쉽다.
  - ##### 외부에서 연결된 자바스크립트 파일을 모두 캐싱.

## 3. 언어의 기초
- #### "use strict";
  - ##### 기존과는 다른 방식으로 자바스크립트를 파싱하고 실행하라고 지시하는 것이다. 문법은 ECMAScript 3 문법과 호환되도록 만든 것이다. 함수 단 하나만 적용하려면 아래의 코드로 작성.
  {% highlight javascript %}
  function doSomething(){
    "use strict";
    //function
  }
  {% endhighlight %}
- #### 변수
  - ##### var 연산자는 변수를 Local Scope에서 정의한다는 점
  {% highlight javascript %}
  function test(){
    var message = "hi";  // local Scope
  }
  test();
  alert(message); // Error
  {% endhighlight %}

  {% highlight javascript %}
  function test(){
    message = "hi";  //  전역 변수
  }
  test();
  alert(message); // "hi"
  {% endhighlight %}

- #### undefined
  - ##### var를 써서 변수를 정의했지만 초기화하지 않았다면 해당 변수에는 undefined가 할당된다.

- #### Null
  - ##### 빈 객체를 가리키는 포인터
  - ##### 객체를 사용해야 하지만 해당 객체를 이용할 수 없을 때에는 항상 그 자리에 null이 와야 한다.

- #### 숫자 변환
  - ##### Number(), parseInt(), parseFloat() 함수
  {% highlight javascript %}
  var num1 = Number("Hello World"); // NaN
  var num2 = Number(""); // 0
  var num3 = Number("00000011"); // 11
  var num4 = Number(true); // 1
  {% endhighlight %}

  {% highlight javascript %}
  var num1 = parseInt("1234blue"); // 1234
  var num2 = parseInt(""); // NaN
  var num3 = parseInt("0xA"); // 16진수 10
  var num4 = parseInt(22.5); // 22  
  {% endhighlight %}

- #### 문자열 변환
    - ##### Object.toString() , String(Object);
    {% highlight javascript %}
    var value1 = 10;
    var value2 = true;
    var value3 = null;
    var value4;
    alert(String(value1)); // 10
    alert(String(value2)); // true
    alert(String(value3)); // null
    alert(String(value4)); // undefined
    {% endhighlight %}

- #### for - in 반복문
{% highlight javascript %}
//BOM window 객체의 모든 속성을 표시
for (var propName in window){
  document.write(propName);
}
{% endhighlight %}
