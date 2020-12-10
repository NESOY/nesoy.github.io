## Spring Graceful shutdown
- Spring Boot 2.3.0.RELEASE 이후에는 server.shutdown=graceful 속성을 추가하여 안전하게 종료시킬 수 있다.
- <https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/spring-boot-features.html#boot-features-graceful-shutdown>


## Application 종료를 위해서
- kill 명령어
    - kill -9 PID
    - SIGKILL

#### 왜 권장하지 않을까?
    - kill -9는 바로 죽인다.
    - kill -15
        - SIGTERM


#### Graceful shutdown?
$TOMCAT_HOME/bin/shutdown.sh
$TOMCAT_HOME/bin/catalina.sh stop
#### Tomcat 종료 스크립트
https://github.com/apache/tomcat/blob/master/bin/catalina.sh#L554


#### Springboot Graceful Shutdown
- <https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/web/embedded/tomcat/GracefulShutdown.java>
- <https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/web/embedded/tomcat/TomcatWebServer.java#L385>


## Reference
- <https://blog.marcosbarbero.com/graceful-shutdown-spring-boot-apps/>
- <https://heowc.dev/2018/12/27/spring-boot-graceful-shutdown/>
- <https://blog.naver.com/PostView.nhn?blogId=takane7&logNo=221710570569>
- <https://granger.tistory.com/60>