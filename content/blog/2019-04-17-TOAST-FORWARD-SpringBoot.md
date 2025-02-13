---
title: TOAST FORWARD - "Spring Framework 애플리케이션 개발자를 위한 Spring Boot"
tags:
  - Review
  - Spring
date: 2019-04-17
aliases: 
  - ../articles/2019-04/TOAST-FORWARD-SpringBoot
---

## Spring Framework 애플리케이션 개발자를 위한 Spring Boot
### Spring Boot의 시작과 목표
- JIRA : <https://github.com/spring-projects/spring-framework/issues/14521>
- 모든 Spring 기술에 대해 빠르고 광범위한 시작환경을 제공
- 별도의 설정 없이 바로 사용가능(out of the box)을 지향하지만, 기본 설정을 변경해야 할 경우에는 빠르게 변경가능
- 대규모 시스템의 다양한 비기능적 기능을 제공
    - 비기능적 기능 : 임베디드 서버, 보안, 모니터링 지표, 헬스 체크 등등
- 코드 생성, XML 설정 할 필요가 없다.

### Spring Boot의 기능 및 특징
- 단독으로 실행 가능한 Spring 애플리케이션 생성
- 내장형 WAS
    - Tomcat, Jetty, Undertow
- 기본 설정된 Starter 컴포넌트
- 상용화에 필요한 통계, 상태 점검 및 외부설정을 제공

> Spring Framework를 대체하는 기술이 아니라 애플리케이션을 쉽게 개발하는 새로운 방법

### Spring Boot가 해 주는 것
- 최적의 Dependency(라이브러리, 버젼) 관리
- 관례에 따른 기본 Bean 설정 (@Configuration)을 미리 제공



### Spring Framework -> Spring Boot로 변경하기 위해선?
- System 설정부터 일단 만족해야 한다.
    - [1.5.17 RELELASE](https://docs.spring.io/spring-boot/docs/1.5.17.RELEASE/reference/html/getting-started-system-requirements.html)
    - [2.0.6 RELELASE](https://docs.spring.io/spring-boot/docs/2.0.6.RELEASE/reference/html/getting-started-system-requirements.html)
    - [2.1.3 RELELASE](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/getting-started-system-requirements.html)
- ApplicationContext -> SpringApplication으로 생성하도록 수정
- static Resource Path 변경
- `Servlet`, `Filter`를 `ServletRegistrationBean`, `FilterRegistrationBean`으로 사용
- Servlet 3.0+ 에 web.xml 없는 프로젝트 라면 `WebApplicationInitializer` 을 `SpringBootServletInitializer` 으로 변경

### Spring Boot의 장단점은?
- 장점
    - Spring Framework의 설정과 구성을 간편하게 적용할 수 있다.
    - MSA 구현에 최적화 되어 있다.
    - 보안, 모니터링 구현을 프레임워크 레벨에서 지원한다.
- 단점
    - @AutoConfiguration이 어떤 일을 하는지 잘 모르겠다.
    - 내가 제어할 수 없는 설정이 미리 되어있을거 같다.


### Spring Boot 실행

```shell
# 1
mvn spring-boot:run
# 2
mvn clean package
java -jar target/edu-springboot-simpleweb-application-2.1.3-SNAPSHOT.jar
# jar 파일 기준으로 앞쪽은 JVM Option, 뒤쪽은 Application Parameter로 동작
```

### Spring Boot 의존성 관리는 어떻게 할까?
- spring-boot-starter-parent
    - spring-boot-dependencies를 상속
- [spring-boot-dependencies](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-dependencies/pom.xml)
    - Spring Boot 버전별로 지원하는 라이브러리 의존성 목록(Bills of Materials)
    - Spring Boot 버전을 업그레이드하면 라이브러리 의존성도 모두 업그레이드
- [spring-boot-starter-web](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-starters/spring-boot-starter-web/pom.xml)
    - spring-core
    - spring-web
    - spring-webmvc
    - 내장 tomcat 서버 및 관련 라이브러리

### Spring Boot 설정 및 인자
- [application propreties 설정](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#common-application-properties)
#### Maven
- Spring Boot 1.X : `mvn spring-boot:run -Drun.arguments="--server.port=9000"`
- Spring Boot 2.X : `mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9000"`
#### Jar
- `java -jar webapp-sample-1.0-SNAPSHOT.jar --server.port=9010`


### @EnableAutoConfiguration
- Spring Boot의 자동 구성을 위한 메타 어노테이션
- 애플리케이션에서 필요한 Bean을 유추해서 구성해 주는 기능을 담당
- @SpringBootApplication에 포함
- Spring Boot VER 2.1.2

![[Assets/posts/img/2019-04-17-15-38-14.png]]

- `@Import(AutoConfigurationImportSelector.class)`를 통해 자동설정을 찾고 설정한다.

- SpringFactoriesLoader를 통해 loadFactoryNames 메서드로 Configuration 후보 반환을 한다.
```java
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata,
			AnnotationAttributes attributes) {
		List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
				getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());
		Assert.notEmpty(configurations,
				"No auto configuration classes found in META-INF/spring.factories. If you "
						+ "are using a custom packaging, make sure that file is correct.");
		return configurations;
	}
```

- `META-INF/spring.factories` 파일 위치
    - Spring Boot가 애플리케이션 타입을 유추할때 사용할 @Configuration 클래스를 spring.factories 파일에 정의해 둔 것

![[Assets/posts/img/2019-04-17-15-41-33.png]]

- SpringFactoriesLoader의 Fatories Resource Location

![[Assets/posts/img/2019-04-17-15-43-54.png]]


### `META-INF/spring.factories`에 기술된 Bean 을 다 생성될까?
- @Conditional을 통해 조건적으로 Spring Bean을 생성/등록한다.
- Spring Boot Annotation
    - @ConditionalOnWebApplication : 프로젝트가 웹 애플리케이션이면 Bean 등록
    - @ConditionalOnBean: 해당 Bean이 존재하면 자동 설정 등록
    - @ConditionalOnMissingBean: 해당 Bean이 존재하지 않으면 자동설정 등록
    - @ConditionalOnClass: 해당 클래스가 존재하면 자동설정 등록
    - @ConditionalOnMissingClass: 해당 클래스가 클래스 패스에 존재하지 않으면 Bean 등록
    - @ConditionalOnResource: 해당 자원(file 등)이 존재하면 자동설정 등록
    - @ConditionalOnProperty: 설정한 프로퍼티가 존재하면 자동설정 등록

#### Example
- RestTemplate 타입의 Bean이 등록되어 있지 않다면 RestTemplate Bean을 생성

```java
@ConditionalOnMissingBean
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}
```

### 구성 프로퍼티 우선순위
- 실행명령어와 함께 전달된 인자
- SPRING_APPLICATION_JSON
- JNDI(java:comp/env)
- System.getProperties()
- OS 환경변수
- RandomValuePropertySource
- JAR 패키지 외부의 프로파일 관련 구성(application-{profile}.property)
- JAR 패키지 내부의 프로파일 관련 구성(application-{profile}.property)
- JAR 패키지 외부의 애플리케이션 프로퍼티(application.property)
- JAR 패키지 내부의 애플리케이션 프로퍼티(application.property)
- @PropertySource
- SpringApplication.setDefaultProperties

### Custom Spring boot Starter Example
- <https://github.com/edu-springboot/edu-doorayclient-springboot-workshop>
- dooray-spring-boot-starter(라이브러리 의존성 관리)
- dooray-spring-boot-autoconfigure(auto configuration)
    - 애플리케이션의 설정, 환경에 따라 자동으로 설정할 Bean을 정의하는 프로젝트
    - java configuration, conditional 을 기반으로 조건에 따라 Bean을 생성한다.
- dooray-spring-boot-starter-application(Spring Boot 애플리케이션)
    - dooray-spring-boot-starter 를 사용하는 애플리케이션이 의존성에 추가할 pom 파일 만 작성한다.

### Spring Boot Admin
- <https://github.com/codecentric/spring-boot-admin>


### Spring Boot Security - Default
- 모든 요청에 인증이 요구됨
- form 로그인, basic 인증 사용 (Conent-Negotiation 전략 - Accept Header)
    - 기본 회원명은 'user'
    - 기본 비밀번호는 기동 시 Random 생성
- CSRF 방어 켜짐
- Session Fixation protection: 세션 고정 공격 방어
- Security Header integration: 보안 헤더 통합
    - HSTS : 브라우저가 https 강제
    - X-Content-Type-Options : mime-type 우회 방어
    - Cache Control : CC Attack 방어
    - X-XSS-Protection : XSS 방어
