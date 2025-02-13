---
title: Elastic Search 데이터 처리
tags:
  - ElasticSearch
date: 2019-01-15
aliases: 
  - ../articles/2019-01/ElasticSearch-Document
---

![[Assets/logo/elastic.png]]

## ElasticSearch의 데이터 구조
- Index, Type, Document 단위로 구성되어있다.
- Document
    - ElasticSearch 데이터가 저장되는 최소 단위
- Type
    - 여러 개의 Document는 하나의 Type을 이루고
- Index
    - 여러 개의 Type은 하나의 Index로 구성된다.
    - `_all` 명령어로 모든 인덱스를 표현할 수 있다.
    - Ver 6.0에서는 `_all`는 기본적으로 비활성화되어 있다.

![[Assets/posts/20190115/1.png]]

### [데이터 Insert](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html)

![[Assets/posts/20190115/2.png]]

#### Query
- http://localhost:9200/{index}/{type}/{id}
```shell
curl -XPUT http://localhost:9200/books/book/1 -d
'{
  "tile": "Nesoy Elastic Guide",
  "author": "Nesoy",
  "date": "2019-01-15",
  "pages": 250
}'
```

#### Response
```shell
{
   "_index":"books",
   "_type":"book",
   "_id":"1",
   "_version":1, // 해당 Document Version. Document가 Update될때마다 값 증가, 기존 Document를 보관하지 않고 새로 작성(Rollback 불가)
   "result":"created",
   "_shards":{
      "total":2,
      "successful":1,
      "failed":0
   },
   "created":true // Document 생성 성공 Response
}
```

#### 주의할점
- id가 없다면 `PUT`으로 Document 생성이 불가능
- 임의의 id Document를 생성하기 위해선 `POST`여야만 정상적으로 실행

![[Assets/posts/20190115/3.png]]



### [데이터 Delete](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html)
- Document, Type, Index 단위로 삭제할 수 있다.

![[Assets/posts/20190115/4.png]]

```shell
{
   "found":true,
   "_index":"books",
   "_type":"book",
   "_id":"1",
   "_version":2,
   "result":"deleted",
   "_shards":{
      "total":2,
      "successful":1,
      "failed":0
   }
}
```

#### 삭제된 Document를 다시 조회하는 경우
![[Assets/posts/20190115/5.png]]

#### 삭제된 Document id에 다시 Document를 추가하는 경우
![[Assets/posts/20190115/6.png]]

- Document단위로 데이터를 삭제하더라도 Document의 Metadata는 여전히 남아있음을 알 수 있다.
    - Type, Index 단위로 삭제하는 경우 Metadata까지 모두 삭제된다.
- 실제로 삭제되는 것이 아니라 Document의 `_source`에 입력된 데이터 값을 Empty값으로 업데이트되고 검색되지 않게 상태 변경.

#### Index 단위 삭제 후 URL로 접근하면 404반환
![[Assets/posts/20190115/7.png]]


### [데이터 Update](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html)
- `_update`를 사용하여 데이터를 제어할 수 있다.
```shell
curl -XPOST http://localhost:9200/{index}/{type}/{doc_id}/_update -d '{update 명령어}'
```

![[Assets/posts/20190115/8.png]]

- `_update` API는 Document의 구조를 변경하는 것이 아니다.
    - 기존의 저장된 Document 값을 읽어 입력한 명령을 토대로 새로 변경된 Document 내용을 만들고 입력하는 방식
- Script를 통해 Document Update할 수 있다.
    - 5.0 > ver : [MVEL Script](https://github.com/mvel/mvel)
    - 5.0 < ver : [ElasticSearch - Painless](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-examples.html)

#### 파일을 통한 데이터 처리
- `-d @파일이름`

![[Assets/posts/20190115/9.png]]

### [데이터 Bulk](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)
- `--data-binary @파일명`
- 입력할 데이터를 모아 한꺼번에 처리하므로 데이터를 각각 처리하고 결과를 반환할 때보다 속도가 매우 빠르다.
- 많은 Document를 한꺼번에 색인할 때 벌크를 사용하면 색인에 소요되는 시간을 크게 줄일 수 있다.
- `Action Meta data`와 `Request Body`가 각각 한 쌍씩 묶여 동작한다.
    - `Delete`는 `Action Meta data`만 필요하다.
- 통상적으로 1000~5000개 정도의 작업이 바람직, 10000개 이상의 작업을 배치로 실행하면 오류가 발생할 확률이 높다.

#### Bulk Data Example
```json
{ "index" : { "_index" : "test", "_type" : "_doc", "_id" : "1" } } # 반드시 줄 바꿈으로 Meta data와 Body를 구분한다
{ "field1" : "value1" }
{ "delete" : { "_index" : "test", "_type" : "_doc", "_id" : "2" } } # delete는 Body가 필요없다.
{ "create" : { "_index" : "test", "_type" : "_doc", "_id" : "3" } }
{ "field1" : "value3" }
{ "update" : {"_id" : "1", "_type" : "_doc", "_index" : "test"} }
{ "doc" : {"field2" : "value2"} }
```

#### Light Example
- URI에 Index, Type 수준까지 명시하면 Bulk 데이터의 `Action Meta Data`를 생략 가능하다.
> curl -XPOST localhost:9200/{index}/{type}/_bulk --data-binary @파일명

```json
{ "index" : { "_id" : "1" } } # _index, _type은 제거해도 된다.
{ "field1" : "value1" }
{ "delete" : { "_id" : "2" } }
{ "create" : { "_id" : "3" } }
{ "field1" : "value3" }
{ "update" : {"_id" : "1" } }
{ "doc" : {"field2" : "value2"} }
```

## Reference
- <https://www.elastic.co/blog/found-elasticsearch-mapping-introduction>
