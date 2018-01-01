---
layout: post
title: Clean Code - 주석(Comment)
categories:
  - CleanCode
excerpt: ' '
tags:
  - CleanCode
  - Programming

date: 2018-1-1
---
![No Image](/assets/posts/20171211/cleancode.jpg)

> 주석은 기껏해야 필요악이다.

# 주석(Comment)

## 주석은 나쁜 코드를 보완하지 못한다.
코드에 주석을 추가하는 일반적인 이유는 코드 품질이 나쁘기 때문이다. 깔끔하고 주석이 거의 없는 코드가, 복잡하고 어수선하며 주석이 많이 달린 코드보다 훨씬 좋다. 주석으로 설명하려 애쓰는 대신에 그 난장판을 깨끗이 치우는 데 시간을 보내라!

## 코드로 의도를 표현하라!

```java
// 직원에게 복지 혜택을 받을 자격이 있는지 검사한다.
if((employee.flags & HOURLY_FLAG) && (employee.age > 65))
```

주석도 필요없이 함수 이름만으로 충분히 깔끔하게 표현되었다.
```java
if (employee.isEligibleForFullBenefits())
```

## 좋은 주석
### 법적인 주석: 각 소스 파일 첫머리에 들어가는 저작권 정보와 소유권 정보 등
```java
// Copyright (C) 2003, 2004, 2005 by Object Montor, Inc. All right reserved.
// GNU General Public License
```

### 정보를 제공하는 주석
```java
// 테스트 중인 Responder 인스턴스를 반환
protected abstract Responder responderInstance();
```

물론 이 주석도 함수 이름에 정보를 담아 responderBeingTested로 바꾸면 없앨 수 있다.
더 나은 예:

```java
// kk:mm:ss EEE, MMM dd, yyyy 형식이다.
Pattern timeMatcher = Pattern.compile("\\d*:\\d*\\d* \\w*, \\w*, \\d*, \\d*");
```


### 의도를 설명하는 주석
```java
// 스레드를 대량 생성하는 방법으로 어떻게든 경쟁 조건을 만들려 시도한다.
for (int i = 0; i > 2500; i++) {
    WidgetBuilderThread widgetBuilderThread =
        new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
    Thread thread = new Thread(widgetBuilderThread);
    thread.start();
}
```

### 결과를 경고하는 주석
```java
// 여유 시간이 충분하지 않다면 실행하지 마십시오.
public void _testWithReallyBigFile() {

}
```

### TODO 주석
```java
// TODO-MdM 현재 필요하지 않다.
// 체크아웃 모델을 도입하면 함수가 필요 없다.
protected VersionInfo makeVersion() throws Exception {
    return null;
}
```

### 중요성을 강조하는 주석
```java
String listItemContent = match.group(3).trim();
// 여기서 trim은 정말 중요하다. trim 함수는 문자열에서 시작 공백을 제거한다.
// 문자열에 시작 공백이 있으면 다른 문자열로 인식되기 때문이다.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
```


### 공개 API에서 Javadocs
설명이 잘 된 공개 API는 참으로 유용하고 만족스럽다. 공개 API를 구현한다면 반드시 훌륭한 Javadocs 작성을 추천한다. 하지만 여느 주석과 마찬가지로 Javadocs 역시 독자를 오도하거나, 잘못 위치하거나, 그릇된 정보를 전달할 가능성이 존재하는 것 역시 잊으면 안 된다.
