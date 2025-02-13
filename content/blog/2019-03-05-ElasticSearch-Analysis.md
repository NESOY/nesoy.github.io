---
title: ElasticSearch - 분석
tags:
  - ElasticSearch
date: 2019-03-05
aliases: 
  - ../articles/2019-03/ElasticSearch-Analysis
---
![[Assets/logo/elastic.png]]

## ElasticSearch의 분석(Analysis)이란?
- 검색어를 추출하기 위한 프로세스

### 분석은 어떻게 동작할까?

#### Analyzer Pipeline
![[Assets/posts/img/2019-03-04-21-22-10.png]]

- 하나의 Analyzer는 Char Filter, Tokenizer, Token Filter를 저장하고 있는 하나의 배치 프로그램.
- Custom Analyzer를 생성 추가 삭제가 가능하다.

## [분석에 필요한 구성요소](https://www.elastic.co/guide/en/elasticsearch/reference/current/analyzer-anatomy.html)

### [Char Filters](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-charfilters.html)
- 입력된 원본의 텍스트를 분석에 필요한 형태로 변환하는 역할

### [Tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html)
- 입력 데이터를 설정된 기준에 따라 검색어 토큰으로 분리하는 역할
- standard
    - -, []와 같은 기호는 구분자로 인식하고 분리한다.
- whitespace
    - 띄어쓰기, 탭, 줄바꿈과 같은 공백 기준으로 토큰 분리
- nGram
    - 최소-최대 길이에 해당하는 문자들을 토큰으로 분할한다.
    - 중요한 필드를 두세 개의 문자만 가지고도 검색 가능하지만
    - 검색어 토큰이 많아지기 때문에 메모리 사용량과 시스템 부하 역시 증가한다.
- edgeNGram
    - nGram의 문제점을 해결하기 위해 등장한 edgeNGram
    - 검색어의 모든 값을 분할하는 것이 아니라 `문장의 시작 부분`만 분할한다.
- keyword
    - 입력된 문장 전체를 하나의 싱글 토큰으로 저장
- letter
    - 알파벳이 아닌 공백/특수문자 기준으로 검색어 토큰 분리
    - 아시아 쓰는 언어에서는 오동작 주의해야 한다.
- lowercase
    - letter -> lowercase filter 적용한 것과 동일


### [Token Filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html)
- 분리된 토큰들에 다시 필터를 적용해서 실제로 검색에 쓰이는 검색어들로 최종 변환하는 역할
- 분석단계에서 가장 중요한 과정
- porter_stem
    - [Porter Stemming](https://tartarus.org/martin/PorterStemmer/) 알고리즘을 적용한 형태소 분석을 하는 토큰필터
    - lowercase 토크나이저를 미리 적용해야 한다.
- shingle
    - 문자열을 토큰-Ngram 방식으로 분석하는 기능
- word_delimiter
    - 입력된 문장의 단어를 더 세부적으로 분할하거나 병합하는 다양한 옵션들을 제공
- snowball
    - 원형으로 변환하는 토큰 Filter
        - `days` -> `day`




## 한국어 형태소 분석기
- [아리랑 형태소분석기](https://github.com/korlucene)
- [은전한닢](http://eunjeon.blogspot.com/)
- [Elasitc 노리](https://www.elastic.co/kr/blog/nori-the-official-elasticsearch-plugin-for-korean-language-analysis)



## Reference
- <https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=52801459>
- <https://www.elastic.co/blog/found-text-analysis-part-1>
- <https://www.elastic.co/blog/found-text-analysis-part-2>
- <https://www.elastic.co/guide/en/elasticsearch/client/net-api/current/writing-analyzers.html>
- [Elasticsearch에서 아리랑 한글 분석기 사용하기 - 정호욱님](https://www.elastic.co/kr/blog/arirang-analyzer-with-elasticsearch)
