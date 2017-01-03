---
layout: post
title: Javascript Study2(Editing)
categories: [Javascript]
excerpt: " "
comments: true
share: true 
tags: [Javascript]
date: 2017-01-03
---

# **Javascript**
![No Image](/assets/20161230/javascript.PNG)

## 3. 언어의 기초

- #### ==, === 연산자
  - ##### ==, != 연산자는 비교하기 전에 형변환을 진행한다.
  - ##### false => 0 true => 1 변환한다.
  - ##### "5"와 5 비교한다면 문자열을 숫자로 형변환을 시도.
  - ##### 하나가 객체이고 하나다 객체가 아니면 valueOf() 호출한다.
  - ##### null과 undefined 동일하다.
  - ##### NaN이라면 false를 반환 항상 false를 반환한다.

{% highlight javascript %}
  null == undefined // true
  "NaN" == NaN // false
  NaN == NaN // false
  true == 1 // true
  true == 2 // false
  "5" == 5 //true
{% endhighlight %}

  - ##### ====은 피연산자의 타입을 변환하지 않고 있는 그대로 비교한다.

  {% highlight javascript %}
    var result1 = {"55" == 55}; //true
    var result2 = {"55" === 55}; //false
  {% endhighlight %}

  - ##### <U>==,!=은 타입 변환 때문에 자주 문제가 발생하므로 대신 ===,!==를 자주 사용하자. 데이터 타입을 관리하기 쉬워진다.</U>
