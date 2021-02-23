## init Container
- 파드는 다수의 컨테이너를 포함할 수 있다.
    - 하나 이상의 초기화 컨테이너도 포함할 수 있다.

- init Container는 항상 완료를 목표를 실행된다.
    - 각 초기화 컨테이너는 다음 초기화 컨테이너가 시작되기 전에 성공적으로 완료되어야 한다.
    - 만약 초기화 컨테이너가 실패하면 kubelet은 초기화 컨테이너가 성공할 때까지 반복적으로 재시작한다.
        - restartPolicy - Never이면 pod는 실패한 것으로 간주한다.

그럼 일반 컨테이너와 무슨 차이가 있을까?
- resource limit
- volume
- security setting
다른 점은
- 초기화 컨테이너를 위한 리소스 요청량과 상한은 리소스에 문서화된 것처럼 다르게 처리된다.
- 초기화 컨테이너는 lifecycle, livenessProbe, readinessProbe 또는 startupProbe 를 지원하지 않는다. 왜냐하면 초기화 컨테이너는 파드가 준비 상태가 되기 전에 완료를 목표로 실행되어야 하기 때문이다.

만약 다수의 초기화 컨테이너가 파드에 지정되어 있다면, kubelet은 해당 초기화 컨테이너들을 한 번에 하나씩 실행한다. 각 초기화 컨테이너는 다음 컨테이너를 실행하기 전에 꼭 성공해야 한다. 모든 초기화 컨테이너들이 실행 완료되었을 때, kubelet은 파드의 애플리케이션 컨테이너들을 초기화하고 평소와 같이 실행한다.


## Reference
- <https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/>