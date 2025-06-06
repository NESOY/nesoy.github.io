---
aliases: [/articles/2020-03/JWT]
comments: false
date: 2020-03-03
description: 
tags: [JWT, Security]
title: JWT에 대해
---
# JWT에 대해
## JWT(JSON Web Tokens)이란?
- 두 개체에서 JSON 객체를 사용하여 가볍고 정보를 안전성 있게 전달하는 방식
- <https://tools.ietf.org/html/rfc7519>

## JWT의 구성요소는?
> header.payload.signature

#### header
- 알고리즘과 token 타입으로 구성된다.
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Claim(payload)
- 실제로 데이터를 담는 공간이다.
- [추가적으로 JWT에 예약된 키워드](https://tools.ietf.org/html/rfc7519#section-4.1)가 있다.
    - 사용하는 라이브러리에 따라 예약어를 지원할수도 안할수도 있다.
    - `iss`: 토큰 발급자
    - `sub`: 토큰 제목
    - `aud`: 토큰 대상자
    - `exp`: 토큰의 만료시간
    - `nbf`: Not Before
    - `iat`: 토큰이 발급된 시간
    - `jti`: JWT의 고유 식별자

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

#### signature
- 토큰의 무결성을 검증하기 위한 signature hash값
- header와 payload 그리고 secret key으로 구성된 문자열을 정해진 알고리즘으로 hashing한 값


## JWT 인증 절차는?

![[assets/posts/img/2020-03-03-22-26-08.png]]

- 사용자가 id와 password를 입력하여 로그인을 시도
- 서버는 요청을 확인하고 secret key를 통해 Access token을 발급
- 인증 이후 사용자가 API를 요청할 때 `Authorization header`에 `Access token`을 담아서 요청
- 서버는 `JWT Signature`를 체크하고 Payload로부터 user 정보를 확인하고 원하는 자원을 Return

​ ​
#### 주의해야할 점은 없을까?
- JWT는 안전한 HttpOnly 쿠키로 저장
    - Cross-Site Scripting(XSS) 공격을 방지
- 민감한 데이터는 JWT로 저장하면 안된다.
    - 쉽게 Debug가능

#### Springboot - JWT Example
- <https://github.com/szerhusenBC/jwt-spring-security-demo>

## Reference
- <https://jwt.io/>
- <https://velopert.com/2389>
- <https://swalloow.github.io/implement-jwt>
