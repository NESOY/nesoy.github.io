---
title: Gradle Empty directory 제외하기
tags:
  - gradle
date: 2020-03-18
aliases: 
  - ../articles/2020-03/grdle-filter-subproject
---

## 들어가며
- Gradle로 Multi Module 프로젝트를 구성하며 겪은 문제입니다.
- `subprojects`를 사용하면 하위 모든 프로젝트에 적용하는데 비어있는 Directory에도 적용되어 빌드가 안되는 문제점이 있습니다.

```gradle
subprojects {
    /**
     * 내부에서 plugins 동작하지 않는 이슈
     */
    apply plugin: 'java'
    apply plugin: 'org.springframework.boot'
    apply plugin: 'io.spring.dependency-management'

    repositories {
        jcenter()
        mavenCentral()
    }

    sourceCompatibility = 1.8

    dependencies {
    }
}
```

- Multi Module 프로젝트의 구성은 아래와 같습니다.
```
├── build.gradle
├── module-admin
│   ├── build
│   ├── build.gradle
│   └── src
├── module-api
│   ├── build
│   ├── build.gradle
│   └── src
├── module-clients <- subprojects에 포함되기 때문에 빌드가 진행되지 않는 문제
│   └── module-aws-client
│   │   ├── build
│   │   ├── build.gradle
│   │   └── src
├── module-common
│   ├── build
│   ├── build.gradle
│   └── src
└── settings.gradle
```

#### 해결 방법은 다음과 같습니다.
- 기본적인 설정값은 없는거 같고 `subprojects`을 통해 특정 조건으로 찾을 수 있습니다.

```gradle
def javaProjects() {
  return subprojects.findAll { new File(it.projectDir, "src").exists() }
}

configure(javaProjects()) {
  apply plugin: 'java'
}
```


## Reference
- <https://stackoverflow.com/questions/11151971/gradle-multi-project-build-with-empty-projects>
