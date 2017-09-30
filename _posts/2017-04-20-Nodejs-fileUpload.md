---
layout: post
title: NodeJs의 파일 업로드(File Upload), Multipart 요청, formidable
categories: [NodeJs]
excerpt: ' '
comments: true
share: true
tags: [NodeJs,Web,Javascript]
date: 2017-04-20
---

![No Image](/assets/posts/20170413/1.PNG)

## Multipart 요청
- ex) 사진 올리기, 글과 사진 올리기
- `Content-type: multipart/form-data; boundary="Boundary"`

### 메시지 바디 내 파트 구성
- 파트 구분자 : `--Boundary`
- 파트 종료 : `--Boundary--` -> 뒤에 `--`이 붙는다.
- 파크 인코딩
- 파트 내 정보

![No Image](/assets/posts/20170420/1.PNG)

### HTML form Tag

``` html
<form method="post" action="upload" enctype="multipart/form-data">
  <input type="text" name="name"/>
  <input type="file" name="poster"/>
</form>
```

### 컨텐츠 타입 분석 코드
- 바디 분석

``` javascript
//Content-type: multipart/form-data; boundary="simple boundary"
var contentType = req.headers['Content-type'];
var elements = contentType.split(';');
var firstElem = elements[0]; //multipart/form-data
var mainContentType = firstElem.split('/')[0]; // multipart

var secondElem = elements[1].trim(); // boundary="simple boundary"
var boundary = secondElem.split('=')[1] // "simple boundary"

var buffer = "";
req.on('data', function(chunk)){
  buffer += chunk.toString();
});
req.on('end',function(){
  //boundary로 각 파트 구분
  var parts = buffer.split('--'+boundary);
  for(var i=0; i<parts.length; i++){
    // 각 파트 별 분석
  }
  res.end('MultiPart EncType message example');
});
```

- 분석의 어려움이 있기에 멀티 파트 분석 모듈을 사용한다.
- 멀티 파트 분석 모듈 : `formidable`, `multer`

## formidable
### Install
- `npm install formidable`

### Class
- `Formidable.IncomingForm` : 요청 분석 클래스
- `Formidable.File` : 업로드 된 파일 정보

### Event
- `field` : 이름/값 도착 이벤트
- `file` : 파일 도착 이벤트
- `aborted` : 요청 중지(클라이언트)
- `end` : 종료

### Property
- `form.uploadDir` : 업로드 디렉토리 경로
- `form.keepExtension` : 확장자 보존
- `form.multiples` : 다중 파일 업로드

### 바디 분석
- `form.parse(req,function(err, fields, files){})`

### Formidable.File
- `file.size`
- `file.path` : 파일 경로
- `file.name` : 파일 이름
- `file.type`
- `file.lastModifiedDate`
- `file.hash`

- 업로드 설정 폴더로 저장(설정 안하면 OS의 임시 폴더)
- 업로드 되었을때 파일 이름이 중복될 수도 있기 때문에 이름을 중복되지 않기 위해 이름 수정
- 파일 이름 변경

- 이름 설정을 안할시 파일 이름

![No Image](/assets/posts/20170420/2.PNG)

### 파일 업로드 서비스
- 파일 업로드(formidable) - 임시 폴더

### 파일 업로드 후
- 파일을 임시 폴더 -> 리소스 저장소로 이동
- 리소스 저장소에서 이름이 충돌되지 않도록 이름 변경
- 날짜, 일련번호, 사용자 계정
- 관리하기가 편하다.

- 관련 코드 : <https://github.com/NESOY/NodeJsStudy/blob/master/ch10/app.js>
