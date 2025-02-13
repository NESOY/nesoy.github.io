---
title: Javascript Study4
tags:
  - Javascript
date: 2017-01-05
aliases: 
  - ../articles/2017-01/javascript-study4
---

# **Javascript**
![[Assets/logo/javascript.png]]

- #### Function 타입
  - 함수는 객체이다.
  - 오버로딩은 없다.
  - 마지막에 정의한 함수가 이전에 정의한 함수를 덮어씀을 쉽게 이해 할 수 있다.

  {% highlight javascript %}
  function addSomeNumber(num){ // 1번
    return num + 100;
  }
  function addSomeNumber(num){ // 2번
    return num + 200;
  }
  var result = addSomeNumber(100); // 300  2번 호출
  {% endhighlight %}

- #### 함수 선언 vs 함수 표현식 (Hoisting)
  - 함수 선언은 어떤 코드도 실행하기 전에 이미 모든 EC에서 접근하고 실행할 수 있다.

  > Hoisting이란 자바스크립트 엔진은 코드를 평가할 때 제일 먼저 함수 선언을 찾은 다음 이들을 맨 위로 올리는 과정을 말한다.

  - 함수 표현식은 코드 실행이 해당 줄까지 진행하기 전에는 사용할 수 없다.

{% highlight javascript %}
alert(sum(10,10));
function sum(num1,num2){ // 함수 선언
  return num1 + num2;
}
{% endhighlight %}

{% highlight javascript %}
alert(sum(10,10)); // error 함수가 정의되어 있지 않다.
var sum = function (num1,num2){ // 함수 표현식
  return num1 + num2;
}
{% endhighlight %}

- #### 값처럼 쓰는 함수

{% highlight javascript %}
// someFunction : 함수매개변수,  someArgument : 콜백 함수에 넘길 값
function callSomeFunction(someFunction, someArgument){
  return someFunction(someArgument);
}
{% endhighlight %}

{% highlight javascript %}
function add10(num){
  return num + 10;
}
var result = callSomeFunction(add10,10);
alert(result); // 20

function getGreeting(name){
  return "Hello " + name;
}
var result2 = callSomeFunction(getGreeting,"NESOY");
alert(result2); // Hello NESOY
{% endhighlight %}

- #### 함수의 내부 구조
  - 함수 내부에는 argument, this 객체가 존재
  - argument의 property에 callee : 객체의 소유자인 함수를 가리키는 포인터
  - caller , callee을 통해 함수와 이름 사이의 의존성을 제거

{% highlight javascript %}
function factorial(num){
  if ( num <= 1){
    return 1;
  } else {
    return num * argument.callee(num-1);
  }
}
{% endhighlight %}

- #### 함수의 프로퍼티와 Method
  - 모든 함수에 length, prototype이 존재
  - length : 함수의 매개변수 갯수
  - prototype : 모든 참조 타입의 인스턴스 메서드가 존재하는 곳
  - apply(), call() 함수 존재

{% highlight javascript %}
  function sum(num1, num2){
    return num1 + num2;
  }
  function callSum1(num1, num2){
    return sum.apply(this, arguments);  // arguments 객체를 넘긴다.
  }
  function callSum2(num1, num2){ //하나 하나 넘겨주어야 한다.
    return sum.call(this, num1, num2);
  }
  alert(callSum1(10,10)); // 10
  alert(callSum2(10,10)); // 10

{% endhighlight %}

  - bind()라는 함수를 통해 this를 교체 할 수 있다.

- #### 내장된 싱글톤 객체
  - encodeURI(), encodeURIComponent()는 브라우저에 전달할 URI를 인코드하는 메서드
  - 유효한 URI는 공백문자 등의 일부 특수 문자를 포함할 수 없다.
  - decodeURI(), decodeURIComponent()도 있다.

  > 일반적으로 말해 베이스 URI뒤에 추가할 쿼리스트링을 인코드하는 경우가 많으므로 encodeURIComponent()를 훨씬 자주 쓰게 된다.

  - eval() : 문자열을 코드로 변환하여 실행한다.

- #### Math 객체
  - min(), max()
  - random()

## 참조
<http://insanehong.kr/post/javascript-function/>
