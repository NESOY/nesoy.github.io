---
title: Intellij Setting 동기화하기
tags:
  - Intellij
date: 2019-08-16
aliases: 
  - ../articles/2019-08/Intellij-Setting-Sync
---

![[Assets/logo/Intellij.png]]

## 들어가며
> 회사 컴퓨터, 개인 컴퓨터의 설정이 매번 달라 동기화하는 방법이 필요해서 기록합니다.

### 주의👹
- IntelliJ 계정으로 Sync를 진행하고 있다면 `Settings Repository`가 안보이는 경우가 있습니다.
- Github로 동기화를 원하시면 IntelliJ Sync를 Off하고 진행하시면 됩니다. 🙌
- IntelliJ Global Data Source로 설정할시 DB 접속정보(host, port)가 노출될 수 있으니 주의바랍니다.
- Github private Repository으로 진행하는 것을 추천합니다.

#### Settings repository 시작하기
- `CMD + SHIFT + A`를 통해 `Settings repository`를 시작합니다.

![[Assets/posts/img/2019-08-16-20-41-09.png]]


#### 설정 내용을 저장할 장소를 추가합니다.

![[Assets/posts/img/2019-08-16-20-42-49.png]]

#### Github Token을 추가합니다.

![[Assets/posts/img/2019-08-16-20-43-41.png]]


#### Github - Settings - Personal Access Tokens을 발급받습니다.

![[Assets/posts/img/2019-08-16-20-44-30.png]]


#### repo 관련 모든 권한을 부여합니다.

![[Assets/posts/img/2019-08-16-20-44-53.png]]


#### Github Repo 결과 화면
![[Assets/posts/img/2019-08-16-20-50-47.png]]


#### Settings Repository가 없다면 Plugin에 다운을 받습니다.

![[Assets/posts/img/2019-08-16-20-51-44.png]]

## Reference
- <https://www.jetbrains.com/help/idea/sharing-your-ide-settings.html#settings-repository>
- <https://kwonnam.pe.kr/wiki/intellij_idea/config>
