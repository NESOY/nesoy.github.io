---
layout: post
title: Intellij Git 연동하기
categories: [Intellij]
excerpt: " "
comments: true
share: true
tags: [Intellij,Git,Github]
date: 2017-01-14
---

# **Intellij Git 연동하기**

Intellij에서 해당 Project를 Version 관리를 위해 Git을 연동하는 과정을 설명하겠습니다.

### 1. Git.exe 실행파일 찾기

```bash
C:\Program Files\Git\cmd
```

![No Image](/assets/20170114/1.PNG)

### 2. Git.exe를 환경변수인 Path에 추가하기

![No Image](/assets/20170114/2.PNG)

### 3. File - Setting 을 들어가서 Git Test를 해본다.

![No Image](/assets/20170114/3.PNG)

![No Image](/assets/20170114/4.PNG)

### 4. Github에 Id와 Pw를 입력한다. Test하여 결과 확인

![No Image](/assets/20170114/5.PNG)

### 5. VCS - Import into Version Control - Share Project on Github를 누른다.

![No Image](/assets/20170114/6.PNG)

### 6. Github에 올라갈 Repository 이름을 정한다.

![No Image](/assets/20170114/7.PNG)

### 7. Commit Message와 올라갈 File을 확인한다.

![No Image](/assets/20170114/8.PNG)

### 8. Push후 Github가서 확인하기

![No Image](/assets/20170114/9.PNG)
