---
layout: post
title: Git 커밋(Commit)을 쉽게 다루어 보자
categories: [Git]
excerpt: ' '
comments: true
share: true
tags: [Develop,Git,Github]
date: 2017-03-27
---

> 개발하는 과정에 있어 commit을 잘못하거나, 팀원들의 코드 리뷰를 통해 문제를 수정하고 다시 commit하는 과정에서 불필요한 commit들을 합치는 과정이 필요하다. git의 commit에 대한 명령어에 대해 기억하기 위해 포스팅을 한다.

## Commit 명령어
#### 1. git commit --amend
- 가장 최근의 **commit 내용을 수정을 원할 때** 사용하기 편하다.

```shell
$ git commit --amend
```
#### 2. git revert
- commit 내용을 복구하여 이전상태로 돌리고, **복구내용을 commit 남긴다.**

```shell
$ git revert HEAD
```

```shell
commit 7bcf5e3b6fc47e875ec226ce2b13a53df73cf626
Author: yourname <yourname@yourmail.com>
Date:   Wed Jul 18 15:46:28 2012 +0900

    Revert "pull의 설명을 추가"

    This reverts commit 0d4a808c26908cd5fe4b6294a00150342d1a58be.
```

#### 3. git reset
- commit 내용을 복구하여 이전상태로 돌리고, **복구내용은 남기지 않는다.**
- 조심해서 사용하자. 복구하면 되돌릴 수 없다.

```shell
$ git reset --hard HEAD
```

#### 4. git rebase
- 여러가지의 commit들을 **합치거나 수정할때** 유용하게 사용할 수 있다.

```shell
$ git rebase -i HEAD~commit개수
```

```shell
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
```

#### 5. Excercise - commit 합치기

```shell
$ git rebase -i HEAD~commit개수
```

![No Image](/assets/posts/20170327/1.PNG)

```shell
pick commit번호 commit내용
squash commit번호 commit내용 // 앞부분 원하는 command로 변경하기
```

- 결과 확인하기

![No Image](/assets/posts/20170327/2.PNG)

## Reference
- <https://backlogtool.com/git-guide/kr/stepup/stepup7_1.html>
- <https://cjh5414.github.io/git-rebase/>
