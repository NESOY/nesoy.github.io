---
title: Dependency Mechanism에 대해
tags:
  - Maven
date: 2020-11-02
aliases: 
  - ../articles/2020-11/Dependency-Mechanism
---

## Dependency mechanism에 대해
#### 들어가며
- 하나의 프로젝트의 의존성을 관리하는것은 매우 쉽다.
- 하지만 여러개의 모듈을 가진 프로젝트에서 의존성을 관리하는 일은 어려운 일이다.
- 이런 문제를 해결하기 위해 아래와 같은 전략들이 등장하게 된다.

### Transitive Dependency란?
- 의존성을 추가하면 해당 의존성이 가진 의존성도 함께 포함되어서 가져오게 된다.
- 그렇게 같이 포함되어서 가져오게 된 의존성을 Transitive Dependecy라고 한다.

### Dependency mediation이란?
- 여러가지 의존성을 만나는 경우 어느 의존성을 선택하는지에 대한 전략이라고 볼 수 있다.
- 아래와 같은 의존성 상황을 만났다고 가정해보자

```
  A
  ├── B
  │   └── C
  │       └── D 2.0
  └── E
      └── D 1.0
```

- Maven은 가장 낮은 Depth의 의존성을 채택하는 전략을 선택하고 있다.
    - 그렇기 때문에 Dependency D는 A -> E로 가져오는 방법은 선택하고 1.0을 가져온다.


- 1.0 대신 2.0을 가져오고 싶은 경우에는 어떻게 해야 할까?
    - 다음과 같이 명시적으로 선언하는게 가장 좋은 방법이다.
    - 가장 낮은 Depth의 의존성인 2.0을 선택하고 가져온다.

```
 A
  ├── B
  │   └── C
  │       └── D 2.0
  ├── E
  │   └── D 1.0
  │
  └── D 2.0
```

### Dependency Management이란?
- 다음과 같은 2개의 pom.xml이 있다고 가정해보자.
- 부모의 XML

```xml
<project>
 <modelVersion>4.0.0</modelVersion>
 <groupId>maven</groupId>
 <artifactId>A</artifactId>
 <packaging>pom</packaging>
 <name>A</name>
 <version>1.0</version>
 <dependencyManagement>
   <dependencies>
     <dependency>
       <groupId>test</groupId>
       <artifactId>c</artifactId>
       <version>1.0</version>
       <scope>compile</scope>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>d</artifactId>
       <version>1.2</version>  <!-- 부모는 1.2 Version -->
     </dependency>
   </dependencies>
 </dependencyManagement>
</project>
```

- 부모를 상속받은 자식 XML

```xml
<project>
  <parent>
    <artifactId>A</artifactId>
    <groupId>maven</groupId>
    <version>1.0</version>
  </parent>
  <modelVersion>4.0.0</modelVersion>
  <groupId>maven</groupId>
  <artifactId>B</artifactId>
  <packaging>pom</packaging>
  <name>B</name>
  <version>1.0</version>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>test</groupId>
        <artifactId>d</artifactId>
        <version>1.0</version> <!-- 부모의 Version 대신 직접 버젼을 명시하는 것을 볼 수 있다 -->
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>test</groupId>
      <artifactId>c</artifactId>
      <scope>runtime</scope>
    </dependency>
  </dependencies>
</project>
```

- 부모가 선언한 Dependency D에 대해서 자식은 1.0으로 dependencyManagement를 통해 관리하고 있다.
    - 프로젝트에서 개발자가 직접적으로 버젼을 직접적으로 명시해주는 것이다.

#### [그냥 dependencies에 추가하면 dependency mediation을 통해 해결할 수 있는것이 아닌가?](https://stackoverflow.com/questions/2619598/differences-between-dependencymanagement-and-dependencies-in-maven)
- dependencyManagement와 dependencies 차이점이 존재한다.
    - dependencyManagement는 의존성이 추가되었을 때 수행된다.
    - 즉 자식이 의존성을 상속받아 작성하여도 의존성 영향은 없다.
- dependencies는 자식의 의존성까지 영향을 미치기 때문에 주의해서 사용해야 한다.
    - 상속받는 모든 의존성이 dependencyManagement를 선언해야하는 상황이 오게 된다.


## Reference
- <https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html>
- <https://docs.gradle.org/current/userguide/dependency_management.html>
- <https://docs.gradle.org/current/userguide/dependency_management_for_java_projects.html#sec:configurations_java_tutorial>
- <https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/>
- <https://kwonnam.pe.kr/wiki/gradle/from_maven>


