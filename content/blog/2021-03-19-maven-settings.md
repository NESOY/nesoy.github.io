---
title: Maven의 Settings에 대해
tags:
  - Maven
date: 2021-03-19
aliases: 
  - ../articles/2021-03/maven-settings
---

## 들어가며
- Maven에서 자주 마주치는 설정 파일인 `settings.xml`이 있습니다.
- 무슨 역할을 가지고 있는지 어떻게 사용하는지 정리합니다.

### settings.xml은 무슨 설정을 위한 파일일까?
- Maven 실행에 필요한 설정들을 정의하는 파일입니다.
- 그럼 왜 `pom.xml`에 안 넣고 settings.xml을 따로 만들었을까?
    - 특정 프로젝트에 종속되는 정보가 아니다.


### settings.xml은 어디곳에 있을까?
- `${user.home}/.m2/settings.xml`
    - default path
- `${maven.home}/conf/settings.xml`
- 명령어를 통해 custom settings.xml을 적용할 수 있습니다.
    -  `mvn package -s ./setting/settings.xml`


### settings.xml은 무슨 정보를 가지고 있을까?

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <localRepository/>
    <interactiveMode/>
    <offline/>
    <pluginGroups/>
    <servers/>
    <mirrors/>
    <proxies/>
    <profiles/>
    <activeProfiles/>
</settings>
```

#### Simple Values
- localRepository
    - maven 로컬 저장소 위치
- interactiveMode
    - 사용자의 input에 움직있는 모드로 변경
    - default true
- offline
    - remote 저장소에 연결하지 않고 빌드를 하기 위한 옵션
    - default false

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository>${user.home}/.m2/repository</localRepository>
  <interactiveMode>true</interactiveMode>
  <offline>false</offline>
  ...
</settings>
```

#### Plugin Groups
- `pom.xml`에 groupId가 설정되어 있지 않을 때 선언된 GroupId로 플러그인을 탐색
    - plugin에 groupId를 표시했다면 아무 기능도 하지 않음.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <pluginGroups>
    <pluginGroup>org.eclipse.jetty</pluginGroup>
  </pluginGroups>
  ...
</settings>
```

#### Servers
- 저장소 서버에 관련된 설정
  - 저장소(nexus)의 인증하는 방법을 제공합니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <servers>
    <server>
      <id>server001</id>
      <username>my_login</username>
      <password>my_password</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <passphrase>some_passphrase</passphrase>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
  ...
</settings>
```

#### Mirros
- 저장소에 대한 다운로드 mirror를 설정하는 속성
- 왜 Mirror가 필요할까?
  - 지리적으로 가깝워 속도가 빠르게 동기화할 수 있기 때문입니다.
  - <https://maven.apache.org/guides/mini/guide-mirror-settings.html>

- 아래의 예는 `https://repo.maven.apache.org/maven2/`로 등록된 plugin들을 `planetmirror.com`으로 mirror합니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <mirrors>
    <mirror>
      <id>planetmirror.com</id>
      <name>PlanetMirror Australia</name>
      <url>http://downloads.planetmirror.com/pub/maven2</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  ...
</settings>
```
#### Proxies
- 방화벽이나 SSL 이슈를 해결하기 위해 Proxy 설정을 합니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <proxies>
    <proxy>
      <id>myproxy</id>
      <active>true</active>
      <protocol>http</protocol>
      <host>proxy.somewhere.com</host>
      <port>8080</port>
      <username>proxyuser</username>
      <password>somepassword</password>
      <nonProxyHosts>*.google.com|ibiblio.org</nonProxyHosts> // 해당 도메인은 Proxy 적용이 되지 않습니다.
    </proxy>
  </proxies>
  ...
</settings>
```
#### Profiles
- JDK 버젼, OS에 맞게 빌드 구성을 다르게 설정할 수 있습니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <profiles>
    <profile>
      <id>test</id>
      <activation>
        <activeByDefault>false</activeByDefault>
        <jdk>1.5</jdk>
        <os>
          <name>Windows XP</name>
          <family>Windows</family>
          <arch>x86</arch>
          <version>5.1.2600</version>
        </os>
        <property>
          <name>mavenVersion</name>
          <value>2.0.3</value>
        </property>
        <file>
          <exists>${basedir}/file2.properties</exists>
          <missing>${basedir}/file1.properties</missing>
        </file>
      </activation>
      ...
    </profile>
  </profiles>
  ...
</settings>
```

#### Active Profiles
- 위에 선언한 Profile을 정의하면 해당 Profile로 빌드가 됩니다.
- 여러 Profile을 선언하면 순서대로 빌드가 됩니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <activeProfiles>
    <activeProfile>env-test</activeProfile>
  </activeProfiles>
</settings>
```

## Reference
- <https://maven.apache.org/settings.html#Introduction>
