---
aliases: [/articles/2020-11/helm]
comments: false
date: 2020-11-18
description: 
tags: [Command, Kubernetes]
title: Helm
---
# Helm
## [Helm이란?](https://helm.sh/)
- 여러가지 k8s yaml들을 package로 관리하고 싶을때 사용하는 도구이다.

### Concept
- Chart
    - Kubernetes의 Resource를 생성하기 위한 모든 것이 정의 된 것
    - (homebrew formula, apt dpkg, yum rpm file과 동일한 컨셉)
- Repository
    - Chart를 저장 및 공유 할 수 있는 공간
- Release
    - Chart를 통해 Kubernetes의 Resource로 instance화 한 것

### Helm Getting Started
- Helm 설치하기
```
brew install helm
```

- Helm Repository 등록하기
```
helm repo add stable https://charts.helm.sh/stable
helm repo list
```

- Helm을 통해 인스턴스화 해보기
```
helm install stable/mysql --generate-name
```

- 인스턴스 확인하기
```
helm ls
```

- Helm을 통해 인스턴스화 다시 제거하기
```
helm uninstall smiling-penguin
```

### Helm Chart에 대해
- Helm Create 생성

```
❯ helm create helm-example
Creating helm-example

.
└── helm-example
    ├── Chart.yaml - Chart의 정보를 정의하는 파일로 Chart의 이름, 버전 등을 정의
    ├── charts - dependency chart 파일들이 해당 디렉토리 아래에 생기게 됩니다.
    ├── templates - k8s 리소스 템플릿이 보관되는 디렉토리
    │   ├── NOTES.txt - Chart를 설치 후 출력되는 내용을 정의
    │   ├── _helpers.tpl
    │   ├── deployment.yaml
    │   ├── hpa.yaml
    │   ├── ingress.yaml
    │   ├── service.yaml
    │   ├── serviceaccount.yaml
    │   └── tests
    │       └── test-connection.yaml
    └── values.yaml - 템플릿에 사용될 변수들을 모아놓은 파일

4 directories, 10 files
```

- [templats](https://helm.sh/docs/chart_best_practices/templates/)
    - 예약어들을 통해 `values.yaml` 값을 읽어 주입하여 실행할 수 있다.

```
{{- define "nginx.fullname" }}
{{/* ... */}}
{{ end -}}
```

- [chart hook](https://helm.sh/ko/docs/topics/charts_hooks/)
    - 차트가 실행하는 과정에 원하는 pod들을 실행할 수 있다.

```
annotations:
  "helm.sh/hook": post-install
```

- [Helm Plugin](https://helm.sh/docs/community/related/#helm-plugins)
    - [helm-diff](https://github.com/databus23/helm-diff)
    - [helm-unittest](https://github.com/lrills/helm-unittest#get-started)

## Reference
- <https://artifacthub.io/>
- <https://spoqa.github.io/2020/03/30/k8s-with-helm-chart.html>
