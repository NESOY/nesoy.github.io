---
layout: post
title: Mongoose 활용하여 Array에 Add(Push), Delete(Remove) 하기
categories: [Mongoose]
excerpt: ' '
comments: true
share: true
tags: [MongoDB,Mongoose,NoSQL]
date: 2017-06-02
---

![No Image](/assets/posts/20170602/1.PNG)

> 이번 프로젝트에 Mongoose를 활용하고 있는데 Data Type이 Array 형태인 부분이 많다. Array형태의 Delete 다루는 부분에 있어서 에러가 발생하였습니다. 해결책을 mongoose github에 issues에서 찾았고 많은 사람들이 이 문제를 쉽게 해결하기 위해 기록을 남긴다.

## Example
- 간단하게 User에 대한 스키마를 만들었고 친구 목록을 배열형태로 선언하였다.

``` javascript
const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    password: String,
    friendList: [new mongoose.Schema({friendId: String, name: String})]
}, {
    versionKey: false
});
```

### Push
- 친구 목록에 친구를 추가하는 작업의 예시이다.

``` javascript
UserSchema.methods.addFriend = function (info) {
    this.friendList.push({friendId: info.id, name: info.name});
    return this.save();
};
```

## Delete
- 친구 목록에 친구를 삭제하는 작업의 예시이다.

``` javascript
UserSchema.methods.removeFriend = function (info) {
    this.friendList.pull({friendId: info.id});
    return this.save();
};
```

### Problem
- 실제로 친구 목록에서 친구가 삭제된 모습을 볼 수 없다.

### Solution

![No Image](/assets/posts/20170602/2.PNG)

- `_id`를 기반으로 찾기 때문에 friendId로는 찾을 수 없다.
- `_id`를 옵션을 꺼주면 해결할 수 있다.

``` javascript
  friendList: [new mongoose.Schema({friendId: String, name: String},{ _id: false })]
```

## Reference
- <https://github.com/Automattic/mongoose/issues/3341>
