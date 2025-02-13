---
title: Jekyll Github에 올리기 & 테마 적용하기
tags:
  - Jekyll
  - Github
date: 2016-12-29
aliases: 
  - ../articles/2016-12/github-Jekyll 1
---
> 아래 포스팅을 따라 하기 전에 Window에 Jekyll 설치하기에 관한 Posting을 읽어보시면 좋을 듯 합니다.

Window에 Jekyll설치하기 : <https://nesoy.github.io/articles/2016-12/Install-Jekyll>

# **Jekyll Github에 올리기**

![[Assets/posts/20161228/jekyll_logo.png]]

## 1. Github Repository 생성

- #### Github아이디.github.io

![[Assets/posts/20161229/github_repository.PNG]]

## 2. Jekyll Blog 디렉토리에서 Git 명령어

```shell
 $ git init
 $ git add .
 $ git commit -m "Initial Commit"
 $ git remote add origin "https://github.com/username/username.github.io.git"
 $ git push origin
```

## 3. 접속해보기
  - #### http://Github아이디.github.io

![[Assets/posts/20161229/github_nesoy.PNG]]


# **Jekyll 테마적용하기**

## 1. Jekyll Theme Site

- #### [http://jekyllthemes.org/](http://jekyllthemes.org/)

![[Assets/posts/20161229/jekyll_themes.PNG]]

## 2. 원하는 Theme 고르기

- #### 테마 다운로드

![[Assets/posts/20161229/jekyll_themes2.PNG]]

## 3. 압축풀고 Jekyll Github에 올리기

- #### 위에 과정을 반복한다.

## 4. 접속해보기
  - #### http://Github아이디.github.io

## 참조
  - #### 동영상 <https://www.youtube.com/watch?v=T_ZhqkshtKk>
