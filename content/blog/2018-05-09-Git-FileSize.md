---
title: Git push 파일 크기 에러 해결하기
tags:
  - Git
date: 2018-05-09
aliases: 
  - ../articles/2018-05/Git-FileSize
---

![[Assets/logo/git.png]]

## 문제
- git push를 하는 도중에 파일 크기가 `1MB`를 넘어선다면 아래와 같은 Error log를 볼 수 있습니다.

```
error: RPC failed; HTTP 403 curl 22 The requested URL returned error: 403 Forbidden fatal: The remote end hung up unexpectedly
```

## 해결 방법
- http.postBuffer 크기를 늘려주면 해결 할 수 있습니다.

```
git config --global http.postBuffer 157286400
```

## Reference
- <https://articles.assembla.com/using-git/git-troubleshooting/git-push-rejected-error-failed-to-push-some-refs>
