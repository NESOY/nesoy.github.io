---
title: Java 정규식 표현(Regular Expression)에 대해
tags:
  - Java
date: 2018-06-01
aliases: 
  - ../articles/2018-06/Java-RegExp
---

![[Assets/logo/Java.jpg]]

# 정규식 표현(Regular Expression)이란?

## 문법

| 표현식 | 설명 |
|:-:|:--|
| ^ | 문자열 시작 |
| $ | 문자열 종료 |
| . | 임의의 문자 [단 '\'는 넣을 수 없습니다.] |
| * | 앞 문자가 0개 이상의 개수가 존재할 수 있습니다. |
| + | 앞 문자가 1개 이상의 개수가 존재할 수 있습니다. |
| ? | 앞 문자가 없거나 하나 있을 수 있습니다. |
| [] | 문자의 집합이나 범위를 표현합니다. -기호를 통해 범위를 나타낼 수 있습니다. ^가 존재하면 not을 나타냅니다. |
| {} | 횟수 또는 범위를 나타냅니다. |
| () | 괄호안의 문자를 하나의 문자로 인식합니다. |
| `|` | 패턴을 OR 연산을 수행할 때 사용합니다. |
| \s | 공백 문자 |
| \S | 공백 문자가 아닌 나머지 문자 |
| \w | 알파벳이나 문자 |
| \W | 알파벳이나 숫자를 제외한 문자 |
| \d | [0-9] 숫자 |
| \D | 숫자를 제외한 모든 문자 |
| (?i) | 대소문자를 구분하지 않습니다. |


## 어디에 사용될까요?
- 텍스트 처리 작업에 매우 유용합니다.
- 데이터 검증(주민번호, 휴대폰 번호등등)에 사용되기도 합니다.

### UserName
- 소문자. 숫자. _-포함
- 3글자 이상 16글자 이하

```
/^[a-z0-9_-]{3,16}$/
```

### Password
- 소문자. 숫자. _-포함
- 6글자 이상 18글자 이하

```
/^[a-z0-9_-]{6,18}$/
```

### Email
- 소문자. 숫자. _-포함
- @
- 소문자와 . 2글자 이상 6글자이하

```
/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
```

## Example - Java

```java
public class RegExpTest {
	public static void main(String[] args) {
		String value = "[2018-01-01] [ERROR] [Nesoy Log Time : 50]";

    Pattern infoPattern = Pattern.compile("([A-Z*]{1,5})");
		Matcher infoMatcher = infoPattern.matcher(value);
		if(infoMatcher.find()){ // find가 group보다 선행되어야 합니다.
			System.out.println(infoMatcher.group()); // ERROR
		}

    Pattern datePattern = Pattern.compile("([0-9-*]{10})");
		Matcher dateMacher = datePattern.matcher(value);
		if(dateMacher.find()){
			System.out.println(dateMacher.group()); // 2018-01-01
		}

    Pattern logTimePattern = Pattern.compile("Nesoy Log Time : ([0-9*]{1,10})");
		Matcher logTimeMatcher = logTimePattern.matcher(value);
		if(logTimeMatcher.find()){
			//가장 첫번째 감지하는 부분이 Group이 아니기에 1번째로 지정합니다.
			System.out.println(logTimeMatcher.group(1)); // 50
		}
	}
}
```


## Reference
- <https://regexr.com/>
- <https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149>
