---
title: Couchbase Mock으로 쉽게 테스트하기
date: 2018-09-18
aliases: 
  - ../articles/2018-09/Couchbase-Mock
---

![[Assets/logo/couchbase.png]]

## 들어가며
- Couchbase Repository의 Test Code는 적재된 Data에 의존성이 매우 높았습니다.

### 해당 데이터가 삭제가 된다면..?
- 해당 Test Code는 언제나 실패할 수 있었습니다.
- 위와 같은 문제를 해결하기 위해 Couchbase를 Mocking 방법을 기록하기 위해 글을 작성합니다.



## How to install? 🧐
- [Maven](https://mvnrepository.com/artifact/com.couchbase.mock/CouchbaseMock) pom.xml에 추가하기

```xml
<!-- https://mvnrepository.com/artifact/com.couchbase.mock/CouchbaseMock -->
<dependency>
    <groupId>com.couchbase.mock</groupId>
    <artifactId>CouchbaseMock</artifactId>
    <version>1.5.19</version>
    <scope>test</scope>
</dependency>
```


## How to use? 🎮
### CouchbaseMock을 생성 & 실행합니다.

```java
private void createMock(String name,String password) throws Exception {
        bucketConfiguration.numNodes = 1;
        bucketConfiguration.numReplicas = 1;
        bucketConfiguration.numVBuckets = 1024;
        bucketConfiguration.type = Bucket.BucketType.COUCHBASE;
        bucketConfiguration.name = name;
        bucketConfiguration.password = password;

        ArrayList<BucketConfiguration> configList = new ArrayList<BucketConfiguration>();
        configList.add(bucketConfiguration);

        couchbaseMock = new CouchbaseMock(0, configList);
        couchbaseMock.start();
        couchbaseMock.waitForStartup();
    }
```

### CouchbaseMock Bucket을 얻습니다.

```java
private void createBucket(@NotNull String bucketName) {
   int httpPort = couchbaseMock.getHttpPort();
   int carrierPort = couchbaseMock.getCarrierPort(bucketName);
   cluster = CouchbaseCluster.create(DefaultCouchbaseEnvironment.builder()
         .bootstrapCarrierDirectPort(carrierPort)
         .bootstrapHttpDirectPort(httpPort)
         .build(), "couchbase://127.0.0.1");
   bucket = cluster.openBucket(bucketName);
}
```


### CouchbaseMock Bucket에 대해 CRUD를 사용하시면 됩니다.
```java
public void test() {
    bucket.upsert(JsonDocument.create("DOCUMENT::123", doc));
}
```

### CouchbaseMock 종료 방법
```java
@After
public void tearDown() {
  if (cluster != null) {  // Close to Cluster
      cluster.disconnect();
   }
   if (couchbaseMock != null) {  // Close to Mock Couchbase
      couchbaseMock.stop();
   }
}
```

## CouchbaseMock에서 제공하는 Test Code
- <https://github.com/couchbase/CouchbaseMock/blob/master/src/test/java/com/couchbase/mock/clientv2/ClientTest.java>


## Reference
- <https://mvnrepository.com/artifact/com.couchbase.mock/CouchbaseMock>
- <https://www.javatips.net/api/org.couchbase.mock.couchbasemock>
- <https://github.com/couchbase/CouchbaseMock>

