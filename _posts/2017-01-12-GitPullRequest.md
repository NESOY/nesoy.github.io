---
layout: post
title: GitHub Pull Request 따라하기
categories: [Github]
excerpt: " "
comments: true
share: true
tags: [Git,Github]
date: 2017-01-12
---

# **GitHub Pull Request 따라하기**

### 1. 원하는 Project Fork하기
- #### 프로젝트의 저장소를 본인 계정의 저장소로 Fork 합니다.

![No Image](/assets/posts/20170112/1.PNG)

### 2. 본인 계정으로 와서 Project 확인하기

![No Image](/assets/posts/20170112/2.PNG)

### 3. fork한 Project Clone하기
- #### fork한 Project URL 복사하기

![No Image](/assets/posts/20170112/3.PNG)

- #### 로컬로 복사해오기

```shell
$ git clone https://github.com/본인아이디/GitTraining.git
```

![No Image](/assets/posts/20170112/4.PNG)

### 4. 작업할 (꼭) Branch 만들기
- #### 작업단위는 Branch로 진행한다.

```shell
$ git checkout -b Branch이름
```

![No Image](/assets/posts/20170112/6.PNG)

### 5. Project 수정하기
- #### 간단하게 README.md 수정하기

![No Image](/assets/posts/20170112/7.PNG)

### 6. Git Status 상태 확인하기

```shell
$ git status
```

![No Image](/assets/posts/20170112/8.PNG)

### 7. add & Commit 하기
- #### 변경된 파일을 Add & Commit 하기

```shell
$ git add add할 파일
$ git commit -m "Commit Message"
```

![No Image](/assets/posts/20170112/9.PNG)

### 8. 변경된 Project push하기
- #### 현재 진행중인 Branch Push하기

```shell
$ git push orign pullTest
```

![No Image](/assets/posts/20170112/10.PNG)

### 9.Github에 가서 확인하기
- #### branch 확인하기

![No Image](/assets/posts/20170112/5.PNG)

![No Image](/assets/posts/20170112/11.PNG)

### 10. pullRequest 보내기
- #### 메세지 내용을 작성하여 보내기

![No Image](/assets/posts/20170112/12.PNG)

### 11. pullRequest 확인하기
- #### fork 한 프로젝트의 저장소에 가서 확인하기

![No Image](/assets/posts/20170112/13.PNG)


## 참조
<http://www.slideshare.net/jungseobshin/github-pull-request>
