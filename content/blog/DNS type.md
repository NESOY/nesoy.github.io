---
aliases: [/articles/2020-06/DNS-type]
comments: false
date: 2020-06-04
description: 
tags: [DNS, Infra]
title: DNS Type
---
# DNS type
## A record
- domain name에 하나의 IP Address가 있음을 의미
- 하나의 도메인(서브나 루트 포함)에 해당하는 IP 주소의 값을 가지고 있습니다.

```
nesoy.github.io -> 123.456.789.123 // 해당 도메인 IP 주소
google.com -> 987.654.321.123     // 해당 도메인 IP 주소
```

## CNAME
- Canonical Name
- 하나의 도메인에 다른 이름을 부여하는 방식을 의미

```
naver.co.kr -> naver.com
google.co.kr -> google.com
```

## Reference
- <https://en.wikipedia.org/wiki/List_of_DNS_record_types>
- <https://twpower.github.io/40-difference-between-cname-and-a-record>
