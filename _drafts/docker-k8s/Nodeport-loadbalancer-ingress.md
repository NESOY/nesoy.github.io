## Nodeport, Loadbalancer, Ingress 차이에 대해
### Nodeport
![](/assets/posts/img/2020-11-10-15-15-34.png)
- 실제로 Node Port를 열어서 Service로 호출하게 만든다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
spec:
  selector:
    app: my-app
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30036
    protocol: TCP
```


- 포트당 한 서비스만 할당할 수 있다.
- 30000-32767 사이의 포트만 사용할 수 있다.
    - 지정하지 않는다면 포트가 Random으로 배정된다.
- Node나 VM의 IP 주소가 바뀌면, 이를 반영해야 한다.

### Loadbalancer
### Ingress
## Reference
- <https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0>
- <https://blog.leocat.kr/notes/2019/08/22/translation-kubernetes-nodeport-vs-loadbalancer-vs-ingress>