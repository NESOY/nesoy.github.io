---
layout: post
title: Servic Mesh란?
excerpt: ''
categories:
-
tags:
-
date: 2020-11-02
---
## Service Mesh란?
> 서비스 그물망
Mesh - 그물망
#### Background
- 모놀리틱 구조라면?
    - 서비스를 배포하고
    - 모니터링이 쉽고
    - 디버깅하기도 훨씬 단순했을 것
    - 하지만 앱의 기능과 함께 사용자뿐만 아니라 개발팀의 규모도 점차 커지면서
    - 모놀리스 구조의 단점들이 점점 심각해짐

- 이를 해결하기 위해 등장한 마이크로서비스
    - 서비스 자체와는 관련없는 수 많은 코드를 작성하고
    - 많은 툴들을 추가적으로 설치하고, 많은 컴포넌트들을 설정해 넣어야 했습니다.
    - 모놀리스에서는 단일 스택 트레이스에 기록되지만
        - 마이크로 서비스는

#### Service Mesh의 등장
- retry와 automatic failover를 통한 서비스간 리퀘스트의 안정적인 전달
- 지연을 인식하고 대응하는 로드 밸런싱
- 유연하고 동적인 라우팅 규칙에 기반한 라우팅 요청(traffic shaping)
- 데드라인을 통한 서킷 브레이크
- 서비스간 인증과 권한관리
- 매트릭스 리포트와 분산 트레이싱 지원


- Service Mesh가 따로 존재
    - Mesh Proxy
    - Mesh Controller
    - k8s와 상호보완적인 관계
        - Mesh없이 K8s는 동작이 가능해야 한다.


#### Istio Architecture
- Envoy
- Pilot
- Mixer
- Citadel
- Galley

## Reference
- <https://blog.giljae.com/114>
- <https://istio.io/>
- <https://twitter.github.io/finagle/>
