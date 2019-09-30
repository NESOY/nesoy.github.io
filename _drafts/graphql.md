---
layout: post
title:
excerpt: ''
categories:
-
tags:
-
date: 2019-08-28
---
## GraphQL이란?
- 유연하고 예측가능성 높은 API를 만드는데 도움을 주는 쿼리 언어
- <https://graphql.org/learn/>

- , 도 가능하다.
- 전체 요청은 없다.
    - 속성을 지정해줘야한다.

```json
query {
  user {
      * // 이거는 불가능
    id name
  }
}
```
## Reference

users: [User!]!


- <https://blog.apollographql.com/graphql-vs-rest-5d425123e34b>
- traceing 내용
- API 버젼 이슈
- Cache 하기 어려움.
- <https://github.com/graphql-java-kickstart/graphql-spring-boot>
- <https://developer.github.com/v4/#overview>
- <https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/>