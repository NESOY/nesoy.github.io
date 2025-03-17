---
aliases: [/articles/2022-03/command-k8s]
date: 2022-03-17
tags: [kubrenetes]
title: kubernetes 명령어 모음
---
# Kubectl
## How to Use
```
# Restart된 컨테이너의 이전 로그 확인하기
kubectl logs podname -c containername --previous

# 생성시간으로 정렬
kubectl get node --sort-by=.metadata.creationTimestamp
```

## See Also
- [[Openlens]]