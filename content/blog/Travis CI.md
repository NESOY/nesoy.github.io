---
title: Travis CI
description: 
aliases: [/articles/2017-01/travis-ci]
date: 2017-01-05
tags: [DevOps, Travis-CI]
comments: true
---
# Travis CI
![[assets/posts/20170105/travis-ci.jpg]]

- Travis-CI는 루비로 작성된 오픈 소스 기반의 CI(Continuous Integration)
- 분산 CI 호스팅 서비스를 제공
- GitHub 아이디의 프로젝트를 연결하여 테스트, 빌드 및 배포 가능

## Getting Started

### 1. 프로젝트 Fork하기

- [https://github.com/plaindocs/travis-broken-example](https://github.com/plaindocs/travis-broken-example)

### 2. Travis-CI 회원가입하기

- <https://travis-ci.org/auth>

![[assets/posts/20170105/travis-ci-signup.PNG]]

### 3. Github Repositories 엑세스 권한 활성화 시키기

- [https://travis-ci.org/profile](https://travis-ci.org/profile)

![[assets/posts/20170105/travis-ci-start1.PNG]]

### 4. .travis.yml 확인하기

{% highlight yml %}
language: php
php:
- 5.5
- 5.4
- hhvm
script: phpunit Test.php
{% endhighlight %}

- .travis.yml을 통해 Travis-CI에게 알려줍니다.
- 프로젝트는 PHP로 작성되었고 PHP versions 5.5, 5.4, HHVM인 phpunit을 통해 Test.php를 테스트를 진행하라고 알려줍니다.

  ![[assets/posts/20170105/travis-ci-start2.PNG]]

### 5. NewUser.txt에 이름 넣고 Push하여 Travis CI 작동시켜보기
- 이름 작성하기

![[assets/posts/20170105/travis-ci-start3.PNG]]

- Git Push 하기

{% highlight git %}
$ git add -A
$ git commit -m 'Testing Travis CI'
$ git push
{% endhighlight %}

![[assets/posts/20170105/travis-ci-start4.PNG]]

> Travis only runs a build on the commits you push after adding the repository to Travis.

- Travis-CI Status 확인하기
  - <https://travis-ci.org/repositories>

![[assets/posts/20170105/travis-ci-start5.PNG]]

  - Travis CI는 Email로 Test 결과물을 보낸다.

![[assets/posts/20170105/travis-ci-start6.PNG]]


### 6. Test.php 수정하고 Push하여 Travis CI 작동시켜보기

- Test.php 수정하기

![[assets/posts/20170105/travis-ci-start7.PNG]]

- Git Push 하기

{% highlight git %}
$ git add -A
$ git commit -m 'Testing Travis CI: fixing the build'
$ git push
{% endhighlight %}

- Travis-CI Status 확인하기
  - [https://travis-ci.org/repositories](https://travis-ci.org/repositories)

![[assets/posts/20170105/travis-ci-start8.PNG]]

## Reference
- http://nnoco.tistory.com/227
- https://docs.travis-ci.com/user/for-beginners
