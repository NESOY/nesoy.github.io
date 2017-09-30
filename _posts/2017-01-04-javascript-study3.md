---
layout: post
title: Javascript Study3
categories: [Javascript]
excerpt: " "
comments: true
share: true
tags: [Javascript]
date: 2017-01-04
---

# **Javascript**
![No Image](/assets/posts/20161230/javascript.PNG)

## 5. 참조 타입
- #### 객체 리터럴 표기법
  - ##### Property가 여러 개 쓸 때 가독성을 확보하는 용도로 사용

{% highlight javascript %}
var person = {
  name : "NESOY",
  age : 29
}
{% endhighlight %}

- #### Array 타입
  - ##### 배열 리터럴은 Array 생성자를 호출 X
  - ##### 배열 감지 함수 Array.isArray(배열);

{% highlight javascript %}
//Array 생성자
var colors = new Array();
var colors = new Array(20); // Length => 20

//배열 리터럴
var colors = [];
var colors = ["red","blue","black"];

//Array.isArray();
var result = Array.isArray(colors); // true;
{% endhighlight %}

- #### 변환 메서드
  - ##### toString(), toLocaleString(), valueOf()

  {% highlight javascript %}
  var colors = ["red","blue","green"];
  alert(colors.toString()); // red,blue,green
  alert(colors.toLocaleString()); // red,blue,green
  alert(colors); // red,blue,green
  {% endhighlight %}

  - ##### toLocaleString()은 toString(), valueOf()와 다른 결과를 보일 수 도 있다.
  {% highlight javascript %}
  var person1 = {
    toLocaleString : function{
      return "NESOY";
    },
    toString : function{
      return "Young Jae";
    }
  };
  {% endhighlight %}

  - ##### join()을 통해 구분자를 지정할 수 있다.
  {% highlight javascript %}
  var colors = ["Red","blue","green"];
  alert(colors.join(",")); red,blue,green
  alert(colors.join("||")); red||blue||green
  {% endhighlight %}

- #### Stack
{% highlight javascript %}
var colors = new Array(); // 배열 생성
var count = colors.push("red","green"); // 색깔 2개 추가
alert(count); // 2

count = colors.push("black");
alert(count); // 3

var item = colors.pop();  // item 꺼냄
alert(item);  // black
alert(colors.length); //2
{% endhighlight %}

- #### Queue
{% highlight javascript %}
var colors = new Array(); // 배열 생성
var count = colors.push("red","green"); // 색깔 2개 추가
alert(count); // 2

count = colors.push("black");
alert(count); // 3

var item = colors.shift();  // item 꺼냄
alert(item);  // red
alert(colors.length); //2
{% endhighlight %}

- #### Sort
  - ##### reverse()와 sort()는 모두 자신을 호출한 배열에 대한 참조를 반환한다. 즉 체인형태로 사용가능 ex) array.sort(compare).reverse();
{% highlight javascript %}
var values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
{% endhighlight %}

{% highlight javascript %}
var values = [5, 3, 4, 1, 2];
values.sort();
alert(values); // 1,2,3,4,5
{% endhighlight %}

- #### 조작 Method
  - ##### concat()
  {% highlight javascript %}
  var colors = ["Red","blue","green"];
  var colors2 = colors.concat("yellow",["black,"brown"]);
  alert(colors); // Red,blue,green
  alert(colors2); // Red,blue,green,yellow,black,brown
  {% endhighlight %}

  - ##### slice()
  {% highlight javascript %}
  var colors = ["Red","blue","green","yellow","black"];
  var colors2 = colors.slice(1);
  var colors3 = colors.slice(1,4);

  alert(colors2); // blue,green,yellow,black
  alert(colors3); // blue,green,yellow
  {% endhighlight %}  

  - ##### splice() = 삽입, 삭제, 대체 가능 (startIndex, deleteCount, item1,.....)
  {% highlight javascript %}
  var colors = ["red","green","blue"];
  var removed = colors.splice(0,1); // 첫 번째 데이터 제거
  alert(colors); // green,blue
  alert(removed); // red

  removed = colors.splice(1, 0, "yellow", "orange"); // 인덱스 1에 데이터 2개 추가
  alert(colors); // green, yellow, orange, blue
  alert(removed); // 빈 배열

  removed = colors.splice(1, 1, "red", "purple"); //데이터2개추가 1개 제거
  alert(colors); // green,red,purple,orange,blue
  alert(removed); // yellow
  {% endhighlight %}  

- #### 위치 Method
  - ##### indexOf(), lastIndexOf() = str.indexOf(searchValue[, fromIndex])

  {% highlight javascript %}
  'Blue Whale'.indexOf('Blue');     // returns  0
  'Blue Whale'.indexOf('Blute');    // returns -1
  'Blue Whale'.indexOf('Whale', 0); // returns  5
  'Blue Whale'.indexOf('Whale', 5); // returns  5
  'Blue Whale'.indexOf('', 9);      // returns  9
  'Blue Whale'.indexOf('', 10);     // returns 10
  'Blue Whale'.indexOf('', 11);     // 전체 문자열의 길이가 10이므로, 10을 반환
  {% endhighlight %}  

- #### 반복 Method
  - ##### every() : 배열의 모든 데이터에서 콜백 함수를 호출하고 값이 전부 true이면 true 반환
  - ##### filter() : 배열의 모든 데이터에서 콜백 함수를 호출하고 반환 값이 true인 데이터를 새 배열에 저장하여 반환
  - ##### some() : 배열의 모든 데이터에서 콜백 함수를 호출하고 값이 하나가 true이면 true 반환
  - ##### forEach() : 배열의 모든 데이터에서 콜백 함수를 호출하고 반환값 없음
  - ##### map() : 배열의 모든 데이터에서 콜백 함수를 호출하고 새 배열에 저장하여 반환
  {% highlight javascript %}
    var numbers = [1,2,3,4,5,4,3,2,1];

    var everyResult = numbers.every(function(item, index, array){
      return (item > 2);
      })
    alert(everyResult); // false

    var someResult = numbers.some(function(item, index, array){
      return (item > 2);
      })
    alert(someResult); // true

    var filterResult = numbers.filter(function(item, index, array){
      return (item > 2);
      })
    alert(filterResult); // 3,4,5,4,3

    var mapResult = numbers.map(function(item, index, array){
        return item * 2;
      })
    alert(mapResult); // 2,4,6,8,10,8,6,4,2
  {% endhighlight %}  

- #### Regular Expression
  - ##### 패턴을 찾는데 정규표현식을 사용하면 간편하게 처리할 수 있다.
  {% highlight javascript %}
  var myRegExp = /regexr/i;
  {% endhighlight %}
  ![No Image](/assets/posts/20170104/regExp.PNG)

  - ##### 참고 사이트
    [http://poiemaweb.com/js-regexp](http://poiemaweb.com/js-regexp)


## 참조

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)


[http://poiemaweb.com/js-regexp](http://poiemaweb.com/js-regexp)
