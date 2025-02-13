---
title: RestTemplate에 대해
tags:
  - Spring
date: 2020-05-06
aliases: 
  - ../articles/2020-05/RestTemplate
---

![[Assets/logo/spring.png]]

## RestTemplate
- Spring에서 제공하는 Rest Client
- [현재는 Deprecated되어 `WebClient`로 가이드를 하고 있다.](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)
> NOTE: As of 5.0 this class is in maintenance mode, with only minor requests for changes and bugs to be accepted going forward. Please, consider using the org.springframework.web.reactive.client.WebClient which has a more modern API and supports sync, async, and streaming scenarios.

#### 주의할 점은 없을까?
- [많은 요청들을 다루기 어렵다.](https://stackoverflow.com/questions/31869193/using-spring-rest-template-either-creating-too-many-connections-or-slow/)
    - RestTemplate는 기본적으로 Connection pool을 사용하지 않는다.
    - Default로 `java.net.HttpURLConnection` 사용한다.
        - SimpleClientHttpRequestFactory
    - 그래서 많은 요청을 하면 `TIME_WAIT`로 인해 자원이 점점 부족해져 서비스에 어려움을 가져온다.
    - 이를 해결하기 위해 Connection Pool을 만들어 사용하기를 권장하고 있다.


#### 어떻게 Connection Pool을 사용할 수 있을까?
- [HttpClientBuilder Reference](https://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/impl/client/HttpClientBuilder.html)
- [Keep Alive](https://multifrontgarden.tistory.com/249)

```java
CloseableHttpClient httpClient = HttpClientBuilder.create()
    .setMaxConnTotal(120) // maxConnTotal은 연결을 유지할 최대 숫자
    .setMaxConnPerRoute(60) // maxConnPerRoute는 특정 경로당 최대 숫자
    .setConnectionTimeToLive(5, TimeUnit.SECONDS) // keep - alive
    .build();

HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
factory.setReadTimeout(5000); // 읽기시간초과, ms
factory.setConnectTimeout(3000); // 연결시간초과, ms
factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅

this.restTemplate = new RestTemplate(factory);
```


#### Springboot에서는 어떻게 더 쉽게 만들 수 있을까?
- `RestTemplateCustomizer`를 활용하면 쉽게 Custom 할 수 있다.
- `ResponseErrorHandler`를 활용하여 error 핸들링도 분리할 수 있다.
- [RestTemplateBuilder Doc](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/web/client/RestTemplateBuilder.html)
- [Springboot RestTemplateBuilder](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/client/RestTemplateAutoConfiguration.java)

```java
CloseableHttpClient httpClient = HttpClientBuilder.create()
    .setMaxConnTotal(120) // maxConnTotal은 연결을 유지할 최대 숫자
    .setMaxConnPerRoute(60) // maxConnPerRoute는 특정 경로당 최대 숫자
    .setConnectionTimeToLive(5, TimeUnit.SECONDS) // keep - alive
    .build();

HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅

 this.restTemplate = new RestTemplateBuilder()
    .rootUri("https://nesoy.github.io")
    .requestFactory(() -> factory)
    .setConnectTimeout(Duration.ofSeconds(3))
    .setReadTimeout(Duration.ofSeconds(5))
    .errorHandler(new RestResponseErrorHandler()) // ResponseErrorHandler interface
    .build();
```

- `ResponseErrorHandler`를 상속받아도 되지만 `DefaultResponseErrorHandler`하면 쉽게 할 수 있다.

```java
 public class RestResponseErrorHandler extends DefaultResponseErrorHandler {
        @Override
        public void handleError(ClientHttpResponse response) throws IOException {
            log.error("Has error response: {}", response);
            super.handleError(response);
        }

        @Override
        public boolean hasError(ClientHttpResponse response) throws IOException {
            log.error("Has error response: {}", response);
            return super.hasError(response);
        }
    }
```


## Reference
- <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html>
- <https://taetaetae.github.io/2018/03/17/rest-client-exception/>
- <https://blog.advenoh.pe.kr/spring/%EC%8A%A4%ED%94%84%EB%A7%81-RestTemplate/>
- <https://sjh836.tistory.com/141>
- <https://stackoverflow.com/questions/31869193/using-spring-rest-template-either-creating-too-many-connections-or-slow>
- <https://taes-k.github.io/2019/11/27/spring-java-connections/>
- <https://inyl.github.io/programming/2017/09/14/http_component.html>
- <https://github.com/ihoneymon/rest-template-of-spring>



