## ImagePullPolicy
- IfNotPresent
    - 이미지가 로컬에 미지 존재하지 않으면 이미지가 Pull 된다.
- Always
    - kubelet이 컨테이너를 시작할 때마다, kubelet은 컨테이너 이미지 레지스트리를 쿼리해서 이름을 이미지 다이제스트로 확인한다.
    - kubelet에 정확한 다이제스트가 저장된 컨테이너 이미지가 로컬로 캐시된 경우 kubelet은 캐시된 이미지를 사용한다.

- imagePullPolicy가 생략되어 있고, 이미지 태그가 :latest 이거나 생략되어 있다면 Always가 적용된다.
- imagePullPolicy가 생략되어 있고, 이미지 태그가 존재하지만 :latest가 아니라면 IfNotPresent가 적용된다.
- imagePullPolicy: Never: 이미지가 로컬에 존재한다고 가정한다. 이미지를 풀(Pull) 하기 위해 시도하지 않는다.

## Reference
- <https://kubernetes.io/ko/docs/concepts/configuration/overview/>
- <https://m.blog.naver.com/vefe/221888345952>