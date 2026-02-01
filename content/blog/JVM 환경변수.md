---
title: JVM 환경변수
description:
aliases: []
date: 2025-11-19
comments: true
category:
  - "[[Java]]"
  - "[[JVM]]"
---
# JVM 환경변수
## JAVA_HOME
- This variable indicates the directory where the Java Development Kit (JDK) software is installed.[^1]

## JAVA_TOOL_OPTIONS
- This environment variable allows you to specify the initialization of tools, specifically the launching of native or Java programming language agents using the `-agentlib` or `-javaagent` options.[^2]

## JAVA_OPTS
- [[Tomcat|Apache Tomcat]]이나 다른 앱에서 사용 중인 환경 변수
- Oracle 가이드 문서에 없다.

## Reference
- https://stackoverflow.com/questions/3933300/difference-between-java-opts-and-java-tool-options

[^1]: https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/envvars001.html#CIHEEHEI
[^2]: https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/envvars002.html