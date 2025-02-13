---
title: Github Action 시작하기
tags:
  - Github
date: 2019-12-23
aliases: 
  - ../articles/2019-12/Github-Actions
---
## [Github Action이란?](https://blog.outsider.ne.kr/1412)
- 개발과정에서 발생하는 워크플로우를 자동화할 수 있는 도구
- 빌드 / 테스트 / 커버리지 / 배포까지 진행할 수 있다.

## How to use?
- `.github/workflows` 아래에 action이 작성된 yml 파일을 추가하면 된다.

#### Github의 Tab에 Action으로 확인할 수 있다.
![[Assets/posts/img/2019-12-22-21-50-46.png]]

#### 다양한 예제가 있어 참고하기 좋다.
![[Assets/posts/img/2019-12-22-21-54-24.png]]

#### [Event 지원](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)
```yml
on:
  # Push 될때마다 돌기
  push:
    branches:
    - master
    - release/*
  # PR 조건 걸기
  pull_request:
    branches:
    - master
  # 스켸줄링도 가능
  schedule:
  - cron: "0 2 * * 1-5"
```

#### [다양한 OS 환경 지원한다](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners)

|Virtual environment | YAML workflow label |
| --- | --- |
| Windows Server 2019 | windows-latest |
| Ubuntu 18.04 | ubuntu-latest or ubuntu-18.04 |
| Ubuntu 16.04 | ubuntu-16.04 |
| macOS Catalina 10.15	| macos-latest |

```yml
jobs:
  my_job:
    name: deploy to staging
    runs-on: ubuntu-18.04
```

#### [외부 Actions도 재사용 가능하다](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsuses)
- <https://github.com/actions/>

```yml
- name: Setup Node
  uses: actions/setup-node@v1
  with:
    node-version: '10.x'
```

#### 변수 행렬화하여 사용 가능하다.
- [JUnit5 Cross-version CI Example](https://github.com/junit-team/junit5/blob/master/.github/workflows/cross-version.yml)

```yml
jobs:
  test:
    name: Test on node ${{ matrix.node_version }} and ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node_version: ['8', '10', '12']
        os: [ubuntu-latest, windows-latest, macOS-latest]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node_version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node_version }}

    - name: npm install, build and test
      run: |
        npm install
        npm run build --if-present
        npm test
```

#### [Secret Key 사용 방법](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
- `Settings - Secret`에 등록하여 사용하면 된다.
![[Assets/posts/img/2019-12-22-22-11-13.png]]

```yml
coverage:
    name: 'Coverage'
    needs: linux
    steps:
    - name: Upload to Codecov.io
      shell: bash
      env:
        CODECOV_TOKEN: # ${{secrets.CODECOV_TOKEN}}로 사용하면 된다
      run: |
        bash <(curl -s https://codecov.io/bash)
```

#### [Badge 생성하기](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository)
- `https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_NAME>/badge.svg`
- 특정 branch의 상태를 조건으로 걸 수 있다.
  - `?branch=master`

## Example
#### Gradle로 작성된 프로젝트 빌드하기
![[Assets/posts/img/2019-12-22-21-55-31.png]]

```yml
name: Java CI

on: [push] # 조건

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - name: Build with Gradle
      run: ./gradlew build
```


## Reference
