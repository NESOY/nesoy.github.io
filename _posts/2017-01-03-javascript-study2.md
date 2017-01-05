---
layout: post
title: Javascript Study2
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

- #### Switch 문
  - ##### ===로 값을 비교하므로 타입 변환은 일어나지 않는다. ex) "10"과 10은 서로 다르다.

- #### Overloading 없음

## 4. 변수와 스코프, 메모리
- #### ECMAScript의 변수는 원시 값과 참조 값 두가지 타입의 데이터를 저장할 수 있다.
  - ##### 원시 값 : undefined, Null, Boolean, 숫자, 문자열
  - ##### 참조 값 : Reference 공유

  {% highlight javascript %}
    // 참조 값
    var person = new Object();
    person.name = "Young Jae";
    alert(person.name); //Young Jae

    // 원시 값
    var name = "Young Jae";
    name.age = 27;
    alert(name.age); // undefined

    // 값 복사
    var obj1 = new Object();
    var obj2 = obj1;
    obj1.name = "Young Jae";
    alert(obj2.name); // Young Jae
  {% endhighlight %}

- #### 매개변수 전달은 값이 복사하는 것과 똑같다.

{% highlight javascript %}
function addTen(num){ // num => local Variable
  num += 10;
  return num;
}
var count = 20;
var result = addTen(count);
alert(count); // 20
alert(result); // 30
{% endhighlight %}

- #### obj는 힙에 존재하는 전역 객체를 참조

{% highlight javascript %}
function setName(obj){
  obj.name = "NESOY"
}
var person = new Object();
setName(person);
alert(person.name); // NESOY
{% endhighlight %}

- #### 함수에 값을 전달했기 때문에 함수 내부에서 매개변수의 값이 바뀌었음에도 불구하고 원래 객체에 대한 참조를 그대로 유지.

{% highlight javascript %}
function setName(obj){
  obj.name = "NESOY"
  obj = new Object();
  obj.name = "Cola";
}
var person = new Object();
setName(person);
alert(person.name); // NESOY
{% endhighlight %}

- #### Execution Context(EC)
  - ##### 자바스크립트 엔진은 코드를 실행하기 위해 필요한 여러가지 정보를 관리하기 위한 객체가 Execution Context다.
  - ##### 변수
    - ##### 함수 내부에서만 접근할 수 있는 지역변수
    - ##### this로 접근 가능한 Property
  - ##### 매개변수
  - ##### 함수 선언
  - ##### Scope
  - ##### this

  {% highlight javascript %}
  var x = 'xxx';

  function foo () {
    var y = 'yyy';

    function bar () {
      var z = 'zzz';
      console.log(x + y + z); //xxxyyyzzz
    }
    bar();
  }
  foo();
  {% endhighlight %}

![No Image](/assets/20170103/execution-context.PNG)

  - ##### Global Execution Context 생성
  - ##### 함수가 호출 될때마다 Stack의 모양으로 쌓인다.
  - ##### 함수가 종료되면 해당 함수의 EC 없어지고 이전 Context로 돌아온다.

  - ##### Scope Chain(SC)
    - ##### List 형태를 띄고 있다.
    - ##### SC의 목적은 Execution Context가 접근할 수 있는 모든 변수와 함수에 순서를 정의하는 것이다.
    - ##### Scope Chain의 앞쪽은 항상 코드가 실행되는 컨텍스트의 변수 객체이다.

- #### Javascript에는 블록 레벨 스코프가 없다.
  - ##### var를 사용해 선언한 변수는 자동으로 가까운 컨텍스트에 추가된다.
  - ##### 선언하지 않으면 자동으로 전역 컨텍스트에 추가된다.

  {% highlight javascript %}
  // var로 선언
  function add(num1,num2){
    var sum = num1 + num2;  
    return sum;
  }
  var result = add(10, 20); //30
  alert(result);  // Error


  // 그냥 선언
  function add(num1,num2){
    sum = num1 + num2;
    return sum;
  }
  var result = add(10, 20); //30
  alert(result);  // 30
  {% endhighlight %}

## 참조

<http://poiemaweb.com/>

<http://www.nextree.co.kr/p7363/>
