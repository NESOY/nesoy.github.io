---
aliases: [/articles/2020-01/GSLB]
comments: false
date: 2020-01-09
description: 
tags: [DevOps]
title: GSLB
---
# GSLB
- DNS 기반의 로드밸런싱 서비스
- 헬스 체크 모니터링, 레이턴시 기반 등등 많은 기능이 포함된 DNS

#### How to work GSLB?
- 각 서버마다 Health Check를 하고 운용가능한 서버의 IP를 반환합니다.
![[assets/posts/img/2020-01-09-10-09-28.png]]

- RoundRobin
  - Health Check된 서버를 기본적으로 RoundRobin으로 분산시킬 수 있습니다.
- Weighted
  - 서버마다 가중치를 부여하여 비율을 조절할 수 있습니다.
- GeoLocation
  - 국가/IP대역 기준으로 설정된 Rule에 따라 서버를 분산시킬 수 있습니다.

#### 보통 어느 상황에서 쓰일까?
- 글로벌 서비스에서 Multi CDN를 사용하는 경우 사용자에게 가장 가까운 Region에 있는 주소를 반환할 수 있습니다.

#### Production
- [AWS - Route53](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/Welcome.html)
- [Google Cloud - Cloud Load Balancing](https://cloud.google.com/load-balancing/?hl=ko)
- [Azure - Traffic Manager](https://azure.microsoft.com/ko-kr/services/traffic-manager/)
- [Naver - Global Route Manager](https://blog.naver.com/n_cloudplatform/221206343859)

#### Reference
- <https://www.joinc.co.kr/w/man/12/GSLB>
- <https://www.zevenet.com/knowledge-base/howtos/how-global-service-load-balancing-gslb-works/>
- <https://d2.naver.com/helloworld/6070967>
