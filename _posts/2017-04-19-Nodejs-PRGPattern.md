---
layout: post
title: NodeJs의 Post요청, PRG 패턴
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript,Design-Pattern]
date: 2017-04-19
---

![No Image](/assets/posts/20170413/1.PNG)

## Post 요청
- 메시지 바디(entity)로 요청 정보 전달
- 바디 분석 필요

### form-urlencoded 방식
- 이름=값 방식으로 작성. 쿼리 문자열
- `form` Tag의 default 값
- HTTP Header

```
POST HTTP/1.0
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded

home=Cosby&favorite=flies
```

### multipart 방식
- 파일, 글자 등 여러 데이터 전송
- HTML Tag

``` html
<form method="post" action="upload" enctype="multipart/form-data"></form>
```

- HTTP Header

```
From: Nathaniel Borenstein
To: Ned Freed
Date: Sun, 21 Mar 1993 23:56:48 -0800 (PST)
Subject: Sample message
MIME-Version: 1.0
Content-type: multipart/mixed; boundary="simple boundary"

This is the preamble. It is to be ignored, though it
is a handy place for composition agents to include an
explanatory note to non-MIME conformant readers.

--simple boundary                                           --------------- ①
This is implicitly typed plain US-ASCII text.
It does NOT end with a linebreak.

--simple boundary
Content-type: text/plain; charset=us-ascii

This is explicitly typed plain US-ASCII text.
It DOES end with a linebreak.

--simple boundary--                                         --------------- ②
This is the epilogue. It is also to be ignored.
```

## PRG Pattern(Post-Redirect-Get)
- 특정 중복되는 폼을 요청하는 것을 피하기 위해 사용하는 패턴
- POST 요청 처리 후 redirect 응답
- Refresh - Get 요청 중복(OK)

- `form` 요청 후 성공 코드를 보내면 다시 `form` 요청하여 중복되는 요청 문제가 발생

![No Image](/assets/posts/20170419/1.PNG)

- `form` 요청 후 `redirect`로 `GET`으로 다시 웹페이지를 받으면 중복되는 요청 문제를 해결

![No Image](/assets/posts/20170419/2.PNG)

- `Nodejs` Example Code

``` javascript
req.on('end',function(){
  // Post 요청 메세지 바디 분석/처리
  res.statusCode = 302;
  res.setHeader('Location',URL);
  res.end();
});
```

## Reference
- <http://egloos.zum.com/tequiero35/v/2094266>
- <https://en.wikipedia.org/wiki/Post/Redirect/Get>
