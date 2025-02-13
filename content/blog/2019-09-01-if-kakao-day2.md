---
title: if kakao day 2 후기
tags:
  - Review
date: 2019-09-01
aliases: 
  - ../articles/2019-09/if-kakao-day2
---

![[Assets/posts/img/2019-08-30-23-18-27.png]]

## 밑바닥부터 시작하는 쇼핑 데이터 엔지니어링 고군 분투기
> 전수현님

### 서비스 초기 런칭 상황은?
- 단일 Application
- 단일 DB 구조
#### 기존에는 문제되지 않았던 문제 발생
- 단일 DB 구조로 DB가 점점 느려지는 상황이 발생
    - 도메인 별로 DB 분리하거나
    - DB 샤드로 문제해결
    - 불필요한 데이터 제거 / 색인 추가

- DB 조인 쿼리를 제거하기 위해서..
    - 많은 검색들은 -> ES 검색으로 필요한 ID만 조회
    - DB는 ID 기반으로 Select만 조회
    - 네트워크 비용 이슈 낮춤

- 데이터 파이프라인 구조
    - 전체 복구
    - 배치 처리
        - ES
    - 실시간 처리

#### ES 색인을 어떻게 만들까?
- 검색 대상만 색인을 하고 나머지는 색인하지 않음
    - 검색에 최적화된 스토리지
    - DB를 분리함으로써 각 역할을 분리

#### 어떻게 [ETL처리](https://ko.wikipedia.org/wiki/추출,_변환,_적재)를 해야할까요?
- 색인 대상 기존 데이터 구조 검토
    - `modified_at` 필드를 바라보고 ES에 색인
    - 수동으로 업데이트하는 경우 `modified_at`이 null인 상황이 발생
    - 이를 해결하기 위한 고민 필요..

### 어떻게 ETL을 해결할까?
#### 배치 처리를 통한 데이터 변경 감지 솔루션
- [CDC(Change Data Capture)](https://en.wikipedia.org/wiki/Change_data_capture)는
- 다양한 기술스택의 운영 노하우가 필요
- 테이블 스키마에 대한 변경 제약
- master / slave 변경 시 bin log 핸들링 이슈
- 높은 기술 스택

#### DB의 증분 필드를 pull 하는 방식
- 더 간편한 방법으로 선택
- Table 스키마에 추가하여 Default로 삽입하는 과정

#### 실시간 데이터 변경 처리를 위해 Kafka를 사용하는 방식
- 파티션이 분배되는 상황
    - 파티션마다 성능이 다르기 때문에 어느 파티션이 빨리 끝나는지 모름
- 이벤트 순서 보장이 필요
    - 순서가 보장되더라도..
    - 카프카에 적재된 이벤트를 replay하면서 ETL처리 하면
    - 순간적으로 과거 상태로 회귀하는 이슈 발생
    - 응용에서 색인에 필요한 모든 데이터를 채워야 하는 부담 발생
- 이를 해결하기 위해서는?
    - kafka를 통해 id만 전달받고
    - id를 통해 DB로 조회

### 데이터 처리 3가지 구현 방법
- 데이터 처리 파이프라인 구조
#### Spark Recovery
- 전체 색인 복구
- 데이터의 min ID max ID를 추출하여 batch size만큼 iteration한다.
- ID 역순으로 Batch를 진행
    - 최신 데이터부터 업데이트
- 왜 날짜로 안하고 ID 기준으로 하셨나요?
    - 데이터 마이그레이션이 발생하면
    - 하루에 많은 데이터가 발생하는 이슈..
    - 이를 해결하기 위해 ID 기준으로 진행

#### Spark batch
- 5분 배치
- Tumbling
    - window로 진행
- Session
    - 누락 발생
- Hopping
    - 시간을 겹치는 방식
    - 심리적 안정감
    - 배치 히스토리를 기록하여 마지막 배치 완료 시점 기준으로 ID 목록을 가져와서 색인한다

#### Spark Streaming
- Kafka를 통한 이벤트 실시간 처리

### 데이터 품질을 유지하기 위한 노력
- 로컬 환경에서 Docker 사용
- 테스트 상황 만들기
    - DB Fixture 데이터 생성
    - Join Service 호출
    - ES Join 쿼리 생성
    - 쿼리 결과 검증
    - Docker Compose로 환경 구성
    - ES 맵핑 정적으로 생성

- 새벽에 맘 편히 잘 수 있는 운영 노하우
    - ES alias 사용
        - 서비스에서는 alias만 바라보도록 설계한다.
    - 운영환경의 자동복구
        - Spark Streaming job 실행 시 zookeeper에 실행 정보 등록
        - Zookeeper ephemeral node로 Spark job 모니터링
        - Zookeeper에 등록되지 않는 spark job 자동 복구

### 요약하자면?
- DB 변경사항은 update_ts 필드를 사용
- 순서에 상관없이 최종적 일관성을 유지하는 ID 기반의 구조
- 데이터 실시간 / 배치 / 복구 전략
    - 카프카를 통한 이벤트 실시간 처리
    - hopping 방식으로 특정시간의 변경을 캐치하여 데이터 보정 배치
    - ID 기반의 파티셔닝 복구 처리
- 테스트 환경 구축
- 운영환경의 자동복구

#### Reference
- <https://databricks.com/blog/2017/05/08/event-time-aggregation-watermarking-apache-sparks-structured-streaming.html>
- [Elasticsearch의 색인 별명 활용 팁 - 리디주식회사 RIDI Corporation
](https://www.ridicorp.com/blog/2018/11/20/index-aliases/)
- [Apache Spark Streaming - 변성윤님](https://zzsza.github.io/data/2018/06/12/apache-spark-streaming/)

## 카카오에서는 어떻게 OpenJDK를 활용하고있을까?
> 송근욱님, 전병희님

### 왜 OpenJDK를 사용해야 할까?
- Oracle의 Java SE 지원 정책 변경
- LTS
    - 일반 버젼보다 긴 시간 동안 패치 release를 지원함을 의미함
- 2019년 4월 이후에 발표되는 Oracle Java는 유료 라이센스가 필요한 상황이다.
- OpenJDK로 전환
    - Oracle에서 OpenJDK로 지원 전략 변경
    - Oracle 지원
    - 6개월 이후 지원 불투명
    - Major 버전 마다 6개월 동안 기여 및 빌드 / 호환성 관여
    - Oracle은 Open JDK Code 사용해서 배포
    - 기업용 엔터프라이즈 환경을 위한 LTS 배포판 제공

### OpenJDK 성능 차이는 없을까?
- 테스트 환경
    - CPU 8 Core
    - 메모리 32Gb
    - CentOS 7.5
    - Heap 8GB / G1GC
    - oracle 8u181 / openjdk 8u181
    - spring 5.1 / embeded tomcat
    - test시간 6시간
- 테스트 결론
    - 의미있는 성능 차이는 없다.

### 어떤 OpenJDK를 사용할까?
- OpenJDK.java.net에서 제공하는 build 배포판을 사용.
    - 6개월 이후에 지원이 불투명한 부분.
    - LTS 미지원
- OpenJDK Source Code를 직접 사내에서 build하여 사용
    - 기존 Java 호환성 Test 수행
    - 성능 테스트
    - 전담인력

### OpenJDK말고 다른 대안은 없을까?
- [Amazon Corretto](https://aws.amazon.com/ko/corretto/)
- [Redhat OpenJDK](https://developers.redhat.com/products/openjdk/download)
- [AdoptOpenJDK](https://adoptopenjdk.net)
- [Zulu](https://www.azul.com/downloads/zulu-community/)
    - Community 버젼에 라이센스가 없다.
    - 혹시 나중에 바뀔 가능성

#### 위에 벤더를 중 하나만 사용해보자.
- OracleJDK와의 호환성 보장
- 지원 플랫폼의 다양성
- LTS 무상 지원
- Update 배포의 적시성
- 무료 라이센스 신뢰
- 결론은?
    - AdoptOpenJDK를 사용한다.

### AdoptOpenJDK
#### 어떤 대상으로 어떻게 변경해야할까?
- Java SE 6 / 7은 지원하지 않는다.
    - 되도록이면 8로 넘어갔으면 좋겠다.
- 9 / 10 LTS 지원하지 않는다.
- 최대한 11 / 12로 넘어가도록 가이드

#### 무엇을 검토해야할까?
- 6 /7에서 8으로 전환 시 고려 사항
    - Permanent영역 -> Metaspace 영역으로 변경됨
    - 이에 따른 JVM 옵션 수정이 필요
    - 8에서 permanent영역에 대한 VM 옵션을 그대로 사용하거나,
    - 삭제만 한 후 MetaSpace 영역에 대한 VM 옵션 값을 설정하지 않으면 심각한 성능 저하 발생
    - 6 /7 보다 Generic 사용이 엄격해져 기존에 사용하던 Generic 포함 코드가 컴파일 되지 않을 수 있음.
- 9 / 10 -> 11로 전환 시 고려 사항
    - JavaEE와 CORBA 모듈들이 removed 되었음
    - removed된 JavaEE와 CORBA 모듈을 사용하는지 확인필요.
    - IBM / Redhat
        - 자동으로 migration 체크를 위한 ToolKit 배포 중

#### 기존 Application과의 호환성 검토
- 개발 한 Application
    - 대부분은 문제없음
- Library / Framework
    - 확인이 필요.
    - Dependency에 약한 모습
    - OpenSource Application관의 호환성 확인하기!
- [AdoptOpenJDK 마이그레이션 가이드](https://adoptopenjdk.net/migration.html)


#### 서버 환경도 체크!
- 32bit CPU 미지원
    - OpenJDK 최신 버전은 CentOs 5 미지원
    - 구 ABI를 사용하여 빌드된 `8u1720b11버전` 사용시 사용 가능하나,
    - CentOS 5는 OS Update 지원 중단으로 보안 취약점이 발생할 수 있음.

### 조금 더 AdoptOpenJDK의 안정성을 높일 수 없을까?
- 기능 테스트
- 호환 테스트
- CI 파이프라인 구축
    - 안정성 확보를 위한 다양한 test suites를 보유
    - <https://github.com/adoptOpenJDK/openjdk-tests>
- 안정성을 확보하는 시스템의 필요성
    - OpenJDK 신규 버젼 나오면?
        - 안정성 테스트하고
        - 바로 결과를 구성원에게 내용 전파
    - JMH
        - Java 기본 Funtion들을 성능측정하는 도구(by OpenJDK 커뮤니티)
        - 10시간 이상 테스트 진행
        - 프로세스가 죽거나 / 성능이 좋지 않는 경우 감지 가능
        - <http://hg.openjdk.java.net/code-tools/jmh-jdk-microbenchmarks/>
- JMH 테스트 파이프라인 구성
    - [gocd](https://www.gocd.org)
    - 6시간마다 AdoptOpenJDK 자바 버젼을 확인후
        - 각 플랫폼마다 최소 10시간 마다 테스트 수행 후 공유하는 프로세스

### 전사 Java 버전을 효율적으로 관리할 수 있을까?
- Java기반 어플리케이션이 구동되는 Machine만 수십만대
    - 하나 하나 수 작업으로 버전 확인이 힘들어요
    - 우리 팀에서 사용하고 있는 OpenJDK는 라이센스 위반인가요?
    - 우리 회사에서 가장 많이 사용하는 Java8 버젼이 무엇인가요?
    - 버젼 변화의 지표가 필요해요.
- Java Version 확인하는 방법
    - Local Java
    - Docker
    - K8s
    - JVM 옵션
        - `-XshowSettings:properties`
