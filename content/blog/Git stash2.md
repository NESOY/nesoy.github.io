---
title: Git Stash에 대해 알아보자.
description: 
aliases: [/articles/2017-05/git-stash]
date: 2017-05-12
tags: [Git]
comments: false
---
# Git Stash에 대해 알아보자.
> 프로그래밍 작업을 하던 도중에 다른 작업을 하기 위해 commit하지 않고 나중에 다시 돌아와서 작업을 다시 하고 싶을 경우가 있었는데 이 경우에 Git에서 Stashing이란 기능이 있어 기록을 남기기 위해 Posting합니다.

## Git Stash
- `Stash` 명령을 사용하면 Working Directory에서 수정한 파일만 저장한다.

#### 1. 현재 git status

![[assets/posts/20170512/1.PNG]]

#### 2. git stash 사용
- `git stash`

![[assets/posts/20170512/2.PNG]]

#### 3. 깔끔해진 Working Tree

![[assets/posts/20170512/3.PNG]]

#### 4. Stash List 확인하기
- `git stash list`

![[assets/posts/20170512/4.PNG]]

#### 5. Stash List에 저장된 Stash 적용하기
- `git stash apply`
- `git stash apply --index`

![[assets/posts/20170512/5.PNG]]

#### 6. 확인하기

![[assets/posts/20170512/6.PNG]]

#### 7. stash 제거하기
- `stash apply` 은 stack에서 제거되지 않기 때문에 `stash drop`으로 제거할 수 있다.
- `git stash drop`

![[assets/posts/20170512/7.PNG]]

## Reference
- <https://git-scm.com/book/ko/v1/Git-%EB%8F%84%EA%B5%AC-Stashing>
