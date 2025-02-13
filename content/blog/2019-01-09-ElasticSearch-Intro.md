---
title: Elastic Search를 시작하며
tags:
  - ElasticSearch
date: 2019-01-09
aliases: 
  - ../articles/2019-01/ElasticSearch-Intro
---

![[Assets/logo/elastic.png]]

## Node
- 데이터를 색인하고 검색 기능을 수행하는 엘라스틱 서치의 단위 프로세스
- 기존 노드에 새 노드를 실행해 연결하는 것으로 쉽게 시스템을 확장할 수 있다.
- 데이터는 각 노드에 분산 저장되고 복사본을 유지해 각종 충돌로부터 노드 데이터 유실을 방지한다.

## High Availablility
- 엘락스틱 서치는 하나 이상의 노드로 구성
- 각 노드는 1개 이상의 데이터 원본과 복사본을 가지고 있어 서로 다른 위치에 나누어 저장
- 노드가 종료되거나 실행에 실패하는 경우 엘라스틱 서치는 노드들의 상태를 감지하고 종료된 노드가 가지고 있던 데이터를 다른 노드로 이전

## Multi Tenancy
> 하나의 소프트웨어를 여러 사용자가 함께 사용하는 것을 말한다.

- 엘라스틱서치의 데이터는 여러 개로 분리된 인덱스들(Indices)에 그룹으로 저장된다.
- 데이터를 검색할 때 서로 다른 인덱스의 데이터를 바로 하나의 질의로 묶어서 검색하고 여러 검색 결과를 하나의 출력으로 도출할 수 있다.

## Full text Search
- 데이터 색인(Indexing)을 이용한 전문검색을 지원한다.

## JSON 문서 기반
- Default로 문서의 `모든 필드가 색인되어` JSON 구조로 저장된다.
- Schema Free를 지원하므로 별도의 사전 맵핑 없이도 JSON 문서 형식으로 데이터를 입력하면 검색이 가능한 형태로 색인 작업이 수행된다.

## 색인(Indexing)
- 검색할 데이터를 검색할 수 있는 구조로 변경하기 위해 원본 문서를 변환하여 저장하는 일련의 과정.
- 색인(Index) : 색인 과정을 거친 결과물

## 검색(Searching)
- 색인에 들어있는 토큰을 기준으로 해당하는 토큰이 포함되는 문서를 찾는 과정.

## Reference
- <https://book.naver.com/bookdb/book_detail.nhn?bid=8769630>
- <https://d2.naver.com/helloworld/273788>
- <https://www.youtube.com/watch?v=l4ReamjCxHo>
