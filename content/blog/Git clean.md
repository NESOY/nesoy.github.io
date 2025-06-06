---
aliases: [/articles/2018-10/Git-clean]
comments: false
date: 2018-10-18
description: 
tags: [Git]
title: Git clean이란?
---
# Git clean이란?
### 🔥주의🔥
- 해당 명령어를 실행하면 삭제된 파일들을 되돌릴 수 없습니다.
- 그러니 명령어를 사용하시기 이전에 한번 더 고민해보는 것을 추천합니다. :)
- 조금 더 안전한 [git stash](https://nesoy.github.io/articles/2017-05/git-stash)를 확인해보시면 좋을 것 같습니다.

## git clean이란?
- 작업하고 있던 파일을 Stash 하지 않고 단순히 그 파일들을 삭제하고 싶은 경우에 사용하는 명령어입니다.
- 추적되고 있지 않는(unstage)경우의 파일이 삭제되는 경우입니다.

![[assets/posts/20181018/1.png]]

### Example
- test.txt라는 파일을 만들고 `git init`으로 초기화를 합니다.
- 그리고 `git status`로 상태를 본다면 아래와 같이 결과가 나옵니다.

![[assets/posts/20181018/2.png]]

#### git clean으로 삭제될 대상들을 미리 확인하려면?
```shell
$ git clean -d -n
```

- `test.txt`은 추적되지 않는 파일이기 때문에 삭제될 예정입니다.

![[assets/posts/20181018/3.png]]


#### 그렇다면 `git add test.txt`하여 stage로 올리게 된다면?
- `test.txt`는 이제 stage로 변경되었기 때문에 더 이상 지워야할 목록에서 제외됩니다.

![[assets/posts/20181018/4.png]]


### .gitignore로 무시되는 파일들도 지우고 싶다면?
- `-x`옵션을 추가하여 명령어를 실행해주시면 됩니다.
- [.gitignore 반영하기](https://nesoy.github.io/articles/2017-01/Git-Ignore)
```shell
$ git clean -d -x
```

## Reference
- <https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Stashing%EA%B3%BC-Cleaning>

