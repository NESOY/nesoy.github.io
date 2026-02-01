---
title: Kubernetes CPU
description: 
aliases: []
date: 2025-07-25
category: "[[CPU]], [[Kubernetes]]"
comments: true
---
# Kubernetes CPU
## 자원 종류
- 압축 가능한 자원
	- Throttling해야 다른 프로세스에게 자원을 할당할 수 있다.
	- e.g. CPU
- 압축 불가능한 자원
	- eviction을 해야 다른 프로세스에게 자원을 할당할 수 있다.
	- e.g. 메모리 / 저장장치

## Kubernetes CPU
- CPU와 같이 압축 가능한(compressible) 자원에 대해 제한값(limits)을 설정하면, 쿠버네티스는 해당 자원이 설정된 제한을 초과하여 소비되지 않도록 스로틀링(throttling)을 수행한다. 
- 반면, 메모리와 같은 압축 불가능한(incompressible) 자원의 제한값을 초과하게 되면, 쿠버네티스는 자원을 확보하기 위해 일부 작업을 강제로 종료(eviction)하는 방식으로 처리하게 된다. 

## CPU request
- 모든 프로세스에 충분한 CPU 시간이 없을 경우, CFS(Completely Fair Scheduler)는 각 CGroup이 가진 share(지분)를 확인하고, 전체 지분의 합만큼 CPU를 분할한 뒤 각 CGroup의 지분 비율대로 나누어 할당한다.
- 파드와 컨테이너는 단지 “kubepods”라는 CGroup에 할당된 CPU 시간만을 나눠 쓸 뿐이다.
	- Kubelet, 컨테이너 런타임, 노드의 다른 서비스들이 CPU 시간이 필요하면 언제든 우선적으로 할당받게 된다.

## CPU limit
- CPU 제한(limit)은 노드 전체의 자원 과점이나 시끄러운 이웃(noisy neighbor) 방지가 아닌, 단지 컨테이너가 **남은 CPU 자원을 초과하여 사용하는 것만을 방지**하는 기능이다.

### 쓰임새
- 구글은 개별 워크로드의 성능 최대화보다 워크로드 간의 성능 일관성(consistency)을 더 중요하게 생각한다.
	- 프로덕션 워크로드는 남는 CPU 자원을 활용할 수 있어야 한다. 
	- CPU 요청(request)을 올바르게 설정하면 컨테이너끼리 CPU 자원을 “빼앗아” 쓰는 일은 발생하지 않는다. 
	- 만약 CPU 요청을 설정하지 않거나 잘못 설정했다면, CPU 제한(limit)이 이를 해결해 주지는 못한다.
	- 하지만 대부분의 조직은 구글이 아니며, 일반적으로 최소 비용의 인프라 위에서 가능한 최고의 성능을 얻고 다운타임을 최소화하려 한다. 
	- 여러 그룹이 하나의 중앙 클러스터에서 자원을 공유하거나, 그룹 수준에서 일정하고 반복 가능한 성능이 보장돼야 할 경우에는 이 방법이 유리
- 스테이징(staging) 환경에서 **CPU 제한을 설정하여 최악의 상황(남는 자원이 없을 때)을 의도적으로 시뮬레이션**하고, 스트레스 테스트를 수행할 때 신뢰할 수 없는 여분의 CPU 자원을 제외한 실제 한계를 테스트할 수 있다.

## Reference
- https://medium.com/directeam/kubernetes-resources-under-the-hood-part-2-6eeb50197c44
- https://medium.com/directeam/kubernetes-resources-under-the-hood-part-3-6ee7d6015965
- https://kimmj.github.io/kubernetes/kubernetes-cpu-request-limit/
- https://engineering.omio.com/cpu-limits-and-aggressive-throttling-in-kubernetes-c5b20bd8a718
- https://dnastacio.medium.com/why-you-should-keep-using-cpu-limits-on-kubernetes-60c4e50dfc61
- https://blog.outsider.ne.kr/1653