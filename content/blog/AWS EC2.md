---
title: AWS EC2 시작하기
description: 
aliases: [/articles/2017-05/AWS]
date: 2017-05-18
tags: [AWS, DevOps]
comments: false
---
# AWS EC2
## AWS 시작하기
- <https://aws.amazon.com/ko/>

### 1. 회원가입
![[assets/posts/20170518/1.PNG]]

![[assets/posts/20170518/2.PNG]]

- 사용자 정보 입력하기

![[assets/posts/20170518/3.PNG]]

![[assets/posts/20170518/4.PNG]]

![[assets/posts/20170518/5.PNG]]

- 결제에 필요한 카드 등록하기

![[assets/posts/20170518/6.PNG]]

- **결제는 가상 결제로 됩니다.**

![[assets/posts/20170518/7.PNG]]

- 휴대폰 인증하기

![[assets/posts/20170518/8.PNG]]

![[assets/posts/20170518/9.PNG]]

- 마지막으로 기본 설정으로 선택하고 회원가입 완료 (개발자, 회사를 선택할 경우 요금부과)


### 2. EC2 Instance 만들기

![[assets/posts/20170518/10.PNG]]

- <https://aws.amazon.com/ko/ec2/?hp=tile&so-exp=below>

![[assets/posts/20170518/11.PNG]]

- `Lanch Instance`

![[assets/posts/20170518/12.PNG]]

- Free Tier 선택하기

![[assets/posts/20170518/13.PNG]]

- step.7까지 Next 클릭

![[assets/posts/20170518/14.PNG]]

![[assets/posts/20170518/15.PNG]]

- Step.7에서 Key를 받아야 한다.

![[assets/posts/20170518/16.PNG]]

- `Launch` 클릭

![[assets/posts/20170518/17.PNG]]

- Key Pair Name에 이름을 입력하고 다운 받는다.

![[assets/posts/20170518/18.PNG]]

- pem형태의 값을 받을 수 있다.

![[assets/posts/20170518/19.PNG]]

- Launch Instance하면 서버가 만들어진다.

![[assets/posts/20170518/20.PNG]]

### 3. Connect 연결하기

![[assets/posts/20170518/23.PNG]]

- AWS에서 친절하게 알려준다.

![[assets/posts/20170518/24.PNG]]

- 읽기전용으로 변경하기

``` shell
$ chmod 400 snack.pem
```

![[assets/posts/20170518/25.PNG]]

- Connect 성공화면

![[assets/posts/20170518/26.PNG]]

### 4. SSH Config 설정하여 편하게 접속하기

``` shell
$ cd ~/.ssh
```


``` shell
$ vim config
```

![[assets/posts/20170518/31.PNG]]

``` shell
$ chmod 600 ~/.ssh/config
```

``` shell
$ ssh snack-server
```



### 5. 고정 IP 할당하기
- Elastic IPs

![[assets/posts/20170518/27.PNG]]

- Allocate new address

![[assets/posts/20170518/28.PNG]]

- Allocate

![[assets/posts/20170518/29.PNG]]

![[assets/posts/20170518/30.PNG]]

- 성공화면

![[assets/posts/20170518/32.PNG]]

### 6. Port 열어주기

![[assets/posts/20170518/33.PNG]]

- Instance 선택하기

![[assets/posts/20170518/34.PNG]]

- 현재 Open된 Port

![[assets/posts/20170518/35.PNG]]

- 성공화면

![[assets/posts/20170518/36.PNG]]


### 7. 결제관련 Email 설정하기

![[assets/posts/20170518/21.PNG]]

![[assets/posts/20170518/22.PNG]]




## Reference
- <https://scotch.io/tutorials/how-to-create-an-ssh-shortcut>
