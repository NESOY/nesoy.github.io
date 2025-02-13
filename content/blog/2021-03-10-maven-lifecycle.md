---
title: Maven의 Life Cycle에 대해
tags:
  - Maven
date: 2021-03-10
aliases: 
  - ../articles/2021-03/maven-lifecycle
---

## 들어가며
> 매번 Maven을 사용하지만 언제나 깊게 이해하지 못하고 사용하는거 같아서 정리합니다. :)

## Maven의 Life Cycle에 대해
![[Assets/posts/img/2021-03-10-22-35-14.png]]

- Maven에서는 크게 3가지의 LifeCycle을 제공합니다.
    - Clean
    - Default
    - Site

- 각 Build LifeCycle은 사전에 정의된 작은 Phase들을 가지고 있습니다.
    - Clean - 3개의 Phase
    - Default - 21개의 Phase
    - Site - 4개의 Phase
    - [Reference](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Build_Lifecycle_Basics)

- Phase는 시점을 의미합니다.
    - Phase 순서에 따라 Phase에 바인딩된 Goal이 실행되는 구조를 가지고 있습니다.
    - 각 Phase는 의존관계를 가지고 있으며 순서대로 실행이 됩니다.
    - Phase에 아무런 Goal이 없다면 해당 Phase는 실행이 되지 않습니다.

- Phase에 Goal들을 바인딩하기 위해서는 Plugin을 추가해야 합니다.

#### Example CLI
- `mvn clean dependency:copy-dependencies package`
    - `clean` phase에 바인딩된 Goal을 실행합니다.
    - 그리고 `dependency:copy-dependencies` Goal를 실행합니다.
    - `package` phase에 바인딩된 Goal을 실행합니다.


#### Example pom.xml
- `display:time`이라고 선언하면 해당 Plugin Goal은 `process-test-resources` Phase에 실행이 됩니다.

```xml
 <plugin>
   <groupId>com.mycompany.example</groupId>
   <artifactId>display-maven-plugin</artifactId>
   <version>1.0</version>
   <executions>
     <execution>
       <phase>process-test-resources</phase> // 원하는 Phase에 바인딩 될지 설정.
       <goals>
         <goal>time</goal> // Goal이름
       </goals>
     </execution>
   </executions>
 </plugin>
```

## Reference
- <https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Build_Lifecycle_Basics>
- <https://stackoverflow.com/questions/26607834/maven-lifecycle-vs-phase-vs-plugin-vs-goal/30953905>
- <https://www.baeldung.com/maven-plugin>
