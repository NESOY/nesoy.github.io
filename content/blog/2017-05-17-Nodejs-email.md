---
title: Nodejs를 통해 Email 보내기
tags:
  - NodeJs
date: 2017-05-17
aliases: 
  - ../articles/2017-05/Nodejs-email
---

![[Assets/posts/20170413/1.PNG]]

## NodeMailer
- `Nodejs`에서 e-mail을 쉽게 보낼 수 있게 도와주는 Module.
- 지원 가능한 Mail 목록 : [List](https://github.com/nodemailer/nodemailer/blob/5be7c902e953043be3618d747c349f02405f003b/lib/well-known/services.json)

### install

```
$ npm install nodemailer
```

### Server Code

``` javascript
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user : 'User@gmail.com',
        pass : 'Password'
    }
});

var mailOption = {
    from : 'User@gmail.com',
    to : 'User@gmail.com',
    subject : 'nodemailer test',
    text : 'Hello'
};

transporter.sendMail(mailOption, function(err, info) {
    if ( err ) {
        console.error('Send Mail error : ', err);
    }
    else {
        console.log('Message sent : ', info);
    }
});
```


### Setting
- Error : Invalid Login

![[Assets/posts/20170517/1.PNG]]

- 보안 수준 낮은 앱 연결 허용하기 : <https://www.google.com/settings/security/lesssecureapps>


### 성공화면

- Server

![[Assets/posts/20170517/2.PNG]]

- Gmail

![[Assets/posts/20170517/3.PNG]]
