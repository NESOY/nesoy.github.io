---
aliases: [/articles/2020-04/Guid]
comments: false
date: 2020-04-23
description: 
tags: [Guid]
title: Guid(Global Unique identifier)
---
# GUID
- Global Unique identifier
- 유니크한 키를 생성
- 키 크기는 알고리즘에 따라 다르다.

## 배경
- Primary Key를 Auto increment로 사용한다고 가정해보자.
- 서울, 스위스에있는 여러개의 DB에서 insert를 진행하는 경우, Auto increment의 유일성을 어떻게 보장할까?
- 위와 같은 문제를 해결하기 위해 GUID가 등장한다.[^1]

## 장점
- 모든 테이블, 모든 데이터 베이스, 모든 서버에서 유니크하다.
- 서로 다른 데이터베이스들의 값들을 머지하는 게 편하다.
- 서로 다른 데이터베이스로 나누는게 편하다.

## 단점
- 4 byte보다 많은 용량을 사용하고 이는 성능에 크게 영향을 줄 수 있다.
- 디버깅할때 매우 불편하다.
- Guid가 연속적이지않으면 clusered index에 성능에 영향을 줄 수 있다.

#### 사례
- [Instagram - Guid](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
- [Twitter - Snowflake](https://developer.twitter.com/en/docs/basics/twitter-ids)

## Reference
- <https://blog.codinghorror.com/primary-keys-ids-versus-guids/>
- <https://www.slideshare.net/charsyam2/guid-40504314>
- <https://charsyam.wordpress.com/2012/12/26/%ec%9e%85-%ea%b0%9c%eb%b0%9c-global-unique-object-id-%ec%83%9d%ec%84%b1-%eb%b0%a9%eb%b2%95%ec%97%90-%eb%8c%80%ed%95%9c-%ec%a0%95%eb%a6%ac/>
- <https://charsyam.wordpress.com/2011/12/04/instagram-%EC%97%90%EC%84%9C-id-%EC%83%A4%EB%94%A9%ED%95%98%EA%B8%B0/>
- <https://www.youtube.com/watch?v=B22cRTjKCMo>

[^1]: https://www.slideshare.net/charsyam2/why-guid-is-needed
