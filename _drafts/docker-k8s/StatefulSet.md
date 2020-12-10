## StatefulSet
- Pods 집합의 Deployment와 스케일링을 관리하며, 파드들의 순서 및 고유성을 보장한다.

- Deployment?
    - 유사한 점
        - 동일한 컨테이너 스펙을 기반으로 둔 파드들을 관리한다.
    - 다른 점
        - 각 파드의 독자성을 유지한다.
        - 이 파드들은 동일한 스펙으로 생성되었지만 서로 교체가 불가능하다.
        - 각각은 재스케줄링 간에도 지속적으로 유지되는 식별자를 가진다.

- 왜 필요한가?
    - 스토리지 볼륨을 사용해서 워크로드에 지속성을 제공하려는 경우, 솔루션의 일부로 스테이트풀셋을 사용할 수 있다.
    - 스테이트풀셋의 개별 파드는 장애에 취약하지만, 퍼시스턴트 파드 식별자는 기존 볼륨을 실패한 볼륨을 대체하는 새 파드에 더 쉽게 일치시킬 수 있다.


- 안정된, 고유한 네트워크 식별자.
- 안정된, 지속성을 갖는 스토리지.
- 순차적인, 정상 배포(graceful deployment)와 스케일링.

- 순차적인, 자동 롤링 업데이트.

#### StatefulSet Deployment
- Rollout
    - kubernetes 1.7
    - <https://kubernetes.io/ko/docs/concepts/workloads/controllers/statefulset/#%ED%8C%8C%EB%93%9C-%EA%B4%80%EB%A6%AC-%EC%A0%95%EC%B1%85>
