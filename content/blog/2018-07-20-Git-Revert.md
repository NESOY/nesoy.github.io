---
title: Git Revert란?
tags:
  - Git
date: 2018-07-20
aliases: 
  - ../articles/2018-07/Git-Revert
---

![[Assets/logo/git.png]]

## 들어가며
> commit을 하고 push한 이후 작업이 잘못되었음을 깨닫고 원래 상태로 돌아가고 싶은 경우, local에서는 reset 사용하면 해결되지만 이미 remote repository에 반영된 경우에 충돌을 피하기 위해 revert라는 기능을 알게 되어 정리합니다.


## How to use
> git revert [돌아가고 싶은 commit 번호]

## Example
#### 1. Source 모습
![[Assets/posts/20180720/1.png]]

#### 2. 내용 추가합니다.
![[Assets/posts/20180720/2.png]]

#### 3. Commit Log를 확인하고 push 했는데..
![[Assets/posts/20180720/3.png]]

#### 4. 뭔가 잘못되었다.. 아.. Second Commit 상태로 돌아가고 싶다.
![[Assets/posts/20180720/4.png]]

#### 5. git revert가 반영된 Commit Log
![[Assets/posts/20180720/5.png]]

#### 6. revert가 반영된 Source 모습
![[Assets/posts/20180720/6.png]]

### 대만족 :)
![[assets/emoticon/satisfy.jpg]]

## Git Reset과 Revert의 차이점에 대해
### git reset
- commit과 내용을 아예 Rollback하는 경우에 사용.
    - `--soft` : Rollback 내용을 Stage에 유지.
    - `--hard` : Rollback 내용을 날려버림.
- Local에서만 적용된 commit을 Rollback하기 좋은 명령어

### git revert
- commit을 유지하면서 내용을 Rollback하는 경우에 사용.
- commit이 유지되기 때문에 Remote Repository 충돌이 적게 난다.



## Reference
- <https://blog.outsider.ne.kr/1166>

