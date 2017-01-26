---
layout: post
title: Git .gitignore 적용하기
categories: [Github]
excerpt: " "
comments: true
share: true
tags: [Git,Github]
date: 2017-01-26
---

# **Git .gitignore File 적용하기**
![No Image](/assets/20170126/GitLogo.PNG)

## .gitignore이란?
> Project에 원하지 않는 Backup File이나 Log File , 혹은 컴파일 된 파일들을 Git에서 제외시킬수 있는 설정 File이다.

## 1. .gitignore 파일 만들기

- 항상 최상위 Directory에 존재해야한다.

- Ex) 예시

![No Image](/assets/20170126/1.PNG)

- 문법

```shell
# : comments

# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

## 2. 적용하기

- 적용하는 방법은 어렵지 않다. .gitignore File을 같이 Push하면 된다.
- 기존에 있던 Project에 .gitignore File이 적용이 안되는 경우에는 git Repository에서 적용해보고 다시 Push해보기 바란다.

```shell
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

## 3. 확인해보기

![No Image](/assets/20170126/2.PNG)

- Local에서는 ignoreFile이 사라지지 않았지만 Remote에 Push가 될때에는 적용되어 올라간 모습을 볼 수 있다.


## 참고

<https://www.git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository>

<https://www.gitignore.io/>

<http://stackoverflow.com/questions/11451535/gitignore-not-working>
