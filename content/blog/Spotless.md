---
aliases: [/articles/2020-04/Spotless]
comments: false
date: 2020-04-22
description: 
tags: [Java, Spotless]
title: Spotless
---
# Spotless
- Spotless: Keep your code spotless
- Junit5에서 컨벤션을 지키고 쉽게 유지보수하기 위해 사용하는 플러그인
  - [JUnit5](https://github.com/junit-team/junit5/blob/master/CONTRIBUTING.md#code)

## Install Guide
```gradle
plugins {
  id "com.diffplug.gradle.spotless" version "3.28.1"
}
```

## Setting Guide
```gradle
spotless {
    java {
        // 사용하지 않는 import 제거
        removeUnusedImports()
        // 공백 제거
        trimTrailingWhitespace()
        // Tab으로 처리(파라미터에 숫자를 넣으면 )
        indentWithTabs()
        // 끝부분 NewLine 처리
        endWithNewline()

        /**
         * 자동으로 라이센스 추가
         */
        licenseHeader '/* Licensed under Apache Corp */'

        /**
         * import 순서도 정의가 가능하다.
         */
        importOrder 'java', 'javax', 'org', 'com', 'com.diffplug', ''

        /**
         * Google Java Format을 쉽게 적용할 수 있다.
         */
        googleJavaFormat()
    }

    /**
     * 특정 파일에 대해 적용할 수 있다.
     */
    format 'misc', {
        target '**/*.gradle', '**/*.md', '**/.gitignore'

        trimTrailingWhitespace()
        indentWithTabs()
        endWithNewline()
    }
}
```

## Use Guide
- `./gradlew build`
    - 컨벤션이 지켜지지 않으면 build는 실패하게 된다.
- `./gradlew spotlessApply`
    - 정해진 컨벤션을 적용한다.

## 더더더 자동화는 할 수 없을까?
- 매번 호출하기 귀찮다. 나만 설정하면 무슨 의미가 있을까?
- [Git-hook 설정하는 방법](https://github.com/diffplug/spotless/issues/178)
- [Git-hook을 강제로 설치하는 Gradle Task](https://gist.github.com/KenVanHoeylandt/c7a928426bce83ffab400ab1fd99054a)

# Reference
- <https://github.com/diffplug/spotless>
