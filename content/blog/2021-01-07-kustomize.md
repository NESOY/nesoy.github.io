---
title: kustomize란?
tags:
  - k8s
date: 2021-01-07
aliases: 
  - ../articles/2021-01/kustomize
---

## Kustomize란?
> Kustomize provides a solution for customizing Kubernetes resource configuration free from templates and DSLs.
- kubernetes resource 설정들을 customize할 수 있는 도구이다.

### HelloWorld Example
- 아래의 예시는 <https://github.com/kubernetes-sigs/kustomize/tree/master/examples/helloWorld>에서 확인할 수 있다.

#### File Structure
```
.
└── base
    ├── configMap.yaml
    ├── deployment.yaml
    ├── kustomization.yaml - kustomization 내용을 담고 있다.
    └── service.yaml
```

#### base/kustomization.yaml 내용을 보면?
```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
metadata:
  name: arbitrary

# 모든 Resource에 Label을 추가한다.
commonLabels:
  app: hello

resources:
- deployment.yaml
- service.yaml
- configMap.yaml
```

#### How to use?
```
kustomize build base
```

#### 결과는 어떻게 나왔을까?
- 공통 Label이 추가된 것을 확인할 수 있다.

```
apiVersion: v1
data:
  altGreeting: Good Morning!
  enableRisky: "false"
kind: ConfigMap
metadata:
  labels:
    app: hello # -> ❤️
  name: the-map
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: hello # -> ❤️
  name: the-service

    ...
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: hello # -> ❤️
  name: the-deployment
    ...
```

## Base & Overlay에 대해
- Kustomize는 Base를 기준으로 Overlay의 내용을 추가 할 수 있다.

### Overlay Example
- Staging과 production이 존재한다.

#### File Structure
```
.
├── base
│   ├── configMap.yaml
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
└── overlays
    ├── production
    │   ├── deployment.yaml
    │   └── kustomization.yaml
    └── staging
        ├── kustomization.yaml
        └── map.yaml
```

#### staging/kustomization.yaml 내용을 보면?
```
namePrefix: staging-
commonLabels:
  variant: staging
  org: acmeCorporation
commonAnnotations:
  note: Hello, I am staging!
bases:
- ../../base
patchesStrategicMerge:
- map.yaml
```

#### stage/map.yaml 내용을 보면?
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: the-map
data:
  altGreeting: "Have a pineapple!"
  enableRisky: "true"
```

#### How to use?
```
kustomize build $OVERLAYS/staging
```

#### 결과는 어떻게 나왔을까?
- ConfigMap은 `base/configmap.yaml` 내용 대신 `overlays/staging/map.yaml` 내용이 교체된 것을 확인할 수 있다.
```
apiVersion: v1
data:
  altGreeting: Have a pineapple!
  enableRisky: "true"
kind: ConfigMap
metadata:
  annotations:
    note: Hello, I am staging!
  labels:
    app: hello
    org: acmeCorporation
    variant: staging
  name: staging-the-map
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    note: Hello, I am staging!
  labels:
    app: hello
    org: acmeCorporation
    variant: staging
  name: staging-the-service
   ...
---
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    note: Hello, I am staging!
  labels:
    app: hello
    org: acmeCorporation
    variant: staging
  name: staging-the-deployment
    ...
```

#### 그렇다면 `base/configmap.yaml`에 `overlays/staging/map.yaml` 겹치지 않는 필드를 추가하면?
- `base/configmap.yaml`에 this-nesoy값을 추가하고 빌드를 해보았다.
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: the-map
data:
  altGreeting: "Good Morning!"
  enableRisky: "false"
  this: "nesoy" # -> ❤️
```

#### 결과는?
- 값이 없다면 base값이 노출되는 것을 확인할 수 있다.
```
apiVersion: v1
data:
  altGreeting: Have a pineapple!
  enableRisky: "true"
  this: nesoy # -> ❤️
kind: ConfigMap
metadata:
  annotations:
    note: Hello, I am staging!
  labels:
    app: hello
    org: acmeCorporation
    variant: staging
  name: staging-the-map
```

- 이외에도 다양한 Syntax가 존재해서 활용하면 좋을거 같다.

## Reference
- <https://kustomize.io/>
- <https://kubectl.docs.kubernetes.io/references/kustomize/>
