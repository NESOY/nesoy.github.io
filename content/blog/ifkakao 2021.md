---
aliases: [/articles/2021-12/if-kakao-2021]
comments: false
date: 2021-12-16
description: 
tags: [Kakao, Review]
title: ifkakao 2021
---
# ifkakao 2021
## [Thing for Post Cloud Native](https://if.kakao.com/session/34)
- [CMMI(Capability Maturity Model Integration)](https://www.ciokorea.com/news/37632)
- Level 4
	- 정말 많이 쓰고 있기 때문에 측정이 필요한 단계
	- 정말 많이 쓰는데 효율적으로 쓰고 있는건가?
	- 사내에서 리소스 탐지하는 프로그램을 만듬
- Level 5
	- 새로운 고민들
	- 네트워크 모델 / 디바이스 / 시스템
	- 컴퓨팅 시스템 / 아키텍쳐
	- 새로운 데이터 시스템
- Cloud-Native?
	- 정말 많은 리소스 / 데이터 / 이벤트 / 의존성이 발생
	- 점점 효율화 방향으로 생각하게 됨
	- 리소스 / 의존성
		- 멀티 클러스터 / 멀티 서비스 모니터링 Sass 개발
	- 데이터
		- RDB Service
		- K/V Service
		- Time Series DB Service
		- Log Stream DB Service
	- 이벤트
		- CNCF Cloud EVENT Pub/Sub as a Service
		- <https://cloudevents.io>
- Sass로 구성된 새로운 Cloud Native가 시작이 되는게 아닐까?
	- 새로운 클라우드 고민의 시작

## [카카오톡 서버의 스프링 공화국 탈출기](https://if.kakao.com/session/49)
- 스프링 공화국이 좋은점
	- 많은 경험자
	- 생태계
	- 장기간 지원
	- 따라서 만들기 쉽고 오랫동안 쓰기 좋은 어플리케이션 서버
- 스프링의 단점은 없을까?
	- 표준보다 관습
	- RFC7235 구현의 다름
		- Spring 예외를 던짐
		- Ktor 표준을 잘 지킴
	- 전의 되는 의존성
		- 여러개 버젼을 동시에 사용.
		- 변경하기 매우 불편한 상황
- 스프링 공화국의 혜택들?
	- Dependency Injection
	- Database Integration
	- Interceptor & Filter

- 탈출하기 위한 노력들
	- Kotiln?
		- 최신 기능 / 코루틴
	- Spring MVC
		- 복잡한 Servlet
	- Ktor
		- 간단한 처리
		- 필요한 기능은 직접 사용해 구성
		- 비동기 프로그래밍 - 코루틴 제공
- Dependency Injection
	- Spring
		- 다양한 Callback 제공
		- Annotation 기반
	- Kotiln
		- Callback은 따로 없음
		- DSL 형식
- Database Integration
	- Spring
		- String으로 구성
		- 컴파일 체킹이 안됨
		- DSL 사용하려면 QueryDSL 사용해야 함.
	- Kotlin
		- 자체 DSL 지원
- Interceptor & Filter
	- Spring
		- Filter - Interceptor 순으로 구성
	- Kotiln
		- 자유롭게 pipeline을 추가할 수 있음
		- ApplicationCallPipeline으로 구성
- 탈출 후기
	- 스프링은 완성된 기능이 많아 편하지만 특정 프레임 워크에 대한 의존성을 가지고 싶지 않다.


## [다음카페 쿠버네티스 이관기](https://if.kakao.com/session/58)
- Object manifest definition too
	- Helm
	- Kustomize
- CI / CD
	- CI - Jenkins / Github action
	- CD - Spinnaker / ArgoCD
- Stateless vs Stateful
	- 기존 Stateful한 어플리케이션을 Stateless로 변경
- Log System 변경
	- 기존은 Filebeat로 읽어서 로그를 사용
	- 쿠버네티스로 전환하게 되면서 출력형태로 변경 - FluentD로 읽어 로그를 사용
	- 불필요한 로그를 제거
- 배포방식
	- 기존은 Rolling Update
	- 전환 후 Blue/Green, Canary 배포 방식
	- Warm up 이슈 -> Canary로 문제 해결
	- 502 -> 504 에러
		- EndPoint 업데이트가 느려 기존 Pod에 트래픽이 넘어가게 되고 에러가 발생하게 됨
		- 위 문제를 해결하기 위한 방법
			- GracefulShutdown
			- PreStop hook
			- ArgoRollout의 설정값
			- 최근 kubernetes에서 이런 문제를 해결하기 위해 endpointslice 컨셉을 도입
				- <https://kubernetes.io/ko/docs/concepts/services-networking/endpoint-slices/>
- kubernetes 디버깅 도구 Telepresence
	- <https://d2.naver.com/helloworld/7861046>

## [이 멋진 코드에 컨벤션을! : 2달간의 컨벤션 구축 여정](https://if.kakao.com/session/88)
- 컨벤션을 맞추기 위한 노력
	- 사공을 줄이기
		- 많은 사람들을 의견을 맞추는건 좋지만, 정답이 없는 문제를 하나로 모으는 과정은 매우 오래 걸린다.
	- 리서치
		- 유명한 컨벤션을 찾아보고 비교 분석
	- 선택하기
		- 적절하게 비교하고 선택하기
- 여정이 끝난 후 얻은 것들
	- PR Template
	- Commit Message Template
		- Change log
		- Release Note 작성
	- EsLint
		- 사람대신 해줄 자동화
	- Provisioning Script
		- brew install script 작성으로 편한게 환경셋팅이 가능
## [Kubernetes Cluster 확장 어디까지 알아보고 오셨어요?](https://if.kakao.com/session/119)
- 리젼별로 클러스터를 구성
	- 고민 포인트
		- 멀티 클러스터로 변경하게 되면서 관리 포인트 증가
		- 모니터링 대상도 증가
- 해결 과정
	- 클러스터 노드 관리
		- 노드 관리 시스템 - Labeling과 taint 관리
	- Service의 Resource 관리
	- 서비스 배포

## [멀티 클러스터 환경을 위한 Kubernetes Operator 패턴](https://if.kakao.com/session/86)
- 쿠버네티스 워커 노드에 컨트롤러가 동작하는 일반적인 구조
	- 클러스터와 워커는 1대1 관계로 운영되었음
	- 단일 클러스터는 문제가 안되었다.
	- 하지만 멀티 클러스터 환경에서는 문제가 발생하게 됨.
	- GitOps가 문제해결은 가능하지만 근본적인 해답이 아님
- 멀티 클러스터 환경을 위한 k8s 컨트롤러 디자인 패턴 적용
	- 매니저 클러스터
		- 컨트롤러가 존재
	- 서비스 클러스터
		- 파드만 존재하게 된다.
- Resource, Management
	- 자원 중복 제거
	- 관리 편의성 제공
- Kubernetes Operator
	- <https://kubernetes.io/ko/docs/concepts/extend-kubernetes/operator/>
	- <https://coffeewhale.com/kubernetes/gitops/helm/2020/05/13/helm-operator/>
	- <https://frozenpond.tistory.com/145?category=1209055>
	- <https://ccambo.blogspot.com/2020/12/kubernetes-operator-kubernetes-operator.html>
	- Example
		- <https://prometheus-operator.dev>
		- <https://github.com/argoproj-labs/argocd-operator/>

## [티스토리에서 airflow활용기](https://if.kakao.com/session/55)
## [아랑고야 피드를 부탁해! (RDB도 모르는 개발자의 아랑고DB 삽질기)](https://if.kakao.com/session/54)
## [Commerce Query data Rebuild Success 했을까](https://if.kakao.com/session/106)
