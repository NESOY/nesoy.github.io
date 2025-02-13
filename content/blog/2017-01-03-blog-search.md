---
title: 검색엔진에 블로그 내용 올리기
tags:
  - Jekyll
  - Github
date: 2017-01-03
aliases: 
  - ../articles/2017-01/blog-search
---

# **구글 네이버에 블로그 글 등록하기**

## 1. Jekyll Sitemap 만들기
- #### /sitemap.xml 만들기

![[Assets/posts/20170103/1.png]]

#### Github Sitemap.xml 확인하기
  ![[Assets/posts/20170103/sitemap.PNG]]

#### Local Sitemap.xml (127.0.0.1:4000/sitemap.xml) 확인하기
  ![[Assets/posts/20170103/sitemap2.PNG]]

## 2. Robots.txt 만들기
- #### /robots.txt 만들기

```
User-agent: *
Allow: /

Sitemap: http://nesoy.github.io/sitemap.xml
```

## 3. Google Search Console 등록
- ##### [https://www.google.com/webmasters/#?modal_active=none](https://www.google.com/webmasters/#?modal_active=none)

- #### Search Console 들어가기
![[Assets/posts/20170103/googleSearch.PNG]]

- #### 속성추가하기
![[Assets/posts/20170103/googleSearch2.PNG]]

- #### Blog URL입력하기
![[Assets/posts/20170103/googleSearch3.PNG]]

- #### HTML 다운받아서 Github에 올려서 인증받기
![[Assets/posts/20170103/googleSearch4.PNG]]

- #### Sitemap 추가하기
![[Assets/posts/20170103/googleSearch5.PNG]]

## 4. Naver 등록하기
- #### [http://webmastertool.naver.com/](http://webmastertool.naver.com/)
- #### 위에 방법과 비슷하게 진행한다.


## Reference
- <http://dveamer.github.io/homepage/SubmitSitemap>
