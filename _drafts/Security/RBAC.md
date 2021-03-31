## 들어가며
> 누군가에게 허락된 자원이지만, 누군가에겐 허락되지 않는 자원인 경우 Software로 어떻게 관리할까?

## RBAC(Role Base Access Control)이란?
- 역할을 만들고 역할에 권한을 부여한다.
- 사용자는 역할을 부여 받아 권한을 얻는다.

![](/assets/posts/img/2020-01-31-16-57-13.png)

#### 구성요소는 어떤게 있을까?
- 사용자(Users)
- 역할(Role)
- 허가(Permission)
- Session

#### 그렇다면 ACL(Access Control List)이란 무엇인가?
- 사용자(혹은 그룹)에게 직접 권한을 부여하는 방식이다.

#### ABAC(Attribute-based Access Control)이란?
- 속성을 추가하여 관리한다.

#### 안쓰이는 곳이 없다.
- Spring Security
- Kubernetes
- AWS - IAM 역할

## Reference
- [Spring Security로 구현한 RBAC](https://github.com/MasatoshiTada/rbac-example-springsecurity)
- <https://bcho.tistory.com/955>
- <https://www.imperva.com/learn/data-security/role-based-access-control-rbac/>
- <https://docs.aws.amazon.com/ko_kr/cognito/latest/developerguide/role-based-access-control.html>