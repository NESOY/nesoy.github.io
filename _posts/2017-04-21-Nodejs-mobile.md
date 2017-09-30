---
layout: post
title: NodeJs의 Json, XML
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript,JSON]
date: 2017-04-21
---

![No Image](/assets/posts/20170413/1.PNG)

## Mobile Server
- 웹 + 모바일 지원 서비스 만들기
- 모바일 앱 : `api.nelp.kr/path`
- HTML 기반의 서비스 : `www.nelp.kr/path`

## Json
- JSON이란? : <https://nesoy.github.io/articles/2017-02/JSON>

### NodeJs에서 Json 다루기
- V8 내장 클래스 이므로 별도의 모듈 로딩이 필요없다.
- `JSON.stringfy()` : JSON 생성
- `JSON.parse()` : JSON 파싱

``` javascript
var entry = {
  profile:{
      name : "권영재"
      job : "Programmer"
  }
};

var jsonStr = JSON.stringfy(entry);
console.log('Stringfy', jsonStr);

var parsed = JSON.parse(jsonStr);
var profile = parsed.profile;
console.log('name', profile.name);
console.log('job', profile.job);
```

- entry Obejct를 출력한 결과

![No Image](/assets/posts/20170421/1.PNG)

- JSON으로 변환후 출력한 결과

![No Image](/assets/posts/20170421/2.PNG)

- JSON을 파싱한 결과를 출력

![No Image](/assets/posts/20170421/3.PNG)

## XML
- eXtensible Markup Language
- Meta data를 포함한 언어

### 구성요소
- XML 선언 : `<?xml version="1.0", encoding="UTF-8" ?>`
- Tag
  -  Start-Tag : `<section>`
  -  End-Tag : `</section>`
- Element : XML 구성 단위, Start Tag와 End Tag로 구성
  - `<section> Hello World </section>`
- Attribute : Tag 내부에 Attribute 추가를 할 수 있다.
  - `<step number="3">Attribute Test</step>`
- Markup, Value : 이러한 내용을 메타 데이터로 동작한다.

### XML Parser Module
- `libxmljs`, `xml-stream`, `xmldoc`

### XML Response Module
- `jstoxml`
- `npm install jstoxml`
- `Content-type: application/xml`

### Paser 방식
- DOM Parser
- SAX Parser
- PULL Parser

### DOM Parser
- XML문서를 DOM 구조로 변환하고, DOM 구조를 이용해서 문서의 내용에 접근, 트리 형태로 작성
- `getChildNode`, `getParentNode`, `getSibilingNode`,`getNodeName`,`getNodeValue`
