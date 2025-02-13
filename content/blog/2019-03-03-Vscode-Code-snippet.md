---
title: Vscode Code Snippets 설정하기
tags:
  - Vscode
date: 2019-03-03
aliases: 
  - ../articles/2019-03/Vscode-Code-snippet
---

## Vscode Code Snippet 설정하기
### Code - Preference -> User Snippets
![[Assets/posts/img/2019-03-03-23-52-02.png]]


### 원하는 파일 형식에 추가하기
![[Assets/posts/img/2019-03-03-23-54-49.png]]

#### Markdown 예시
![[Assets/posts/img/2019-03-03-23-58-51.png]]

### 자주 사용하는 표현을 Snippet으로 표현하기
- markdown으로 쉽게 포스트 포맷 작성하기

```json
"POST": {
		"prefix": "post", // Snippet Prefix
		"body": [
			"---",
			"layout: post",
			"title: $1", // $1로 focusing 할 수 있습니다.
			"excerpt: ''",
			"categories:",
			"- $2", // $2 두번째 포커싱
			"tags:",
			"- $2",
			"date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE", // 현재 시간 표현하기
			"---",
			"## $3",
			"## Reference"
		]
	}
```

### 만약 Markdown Snippet이 동작을 안하는 경우?
- settings에 `[markdown`이라고 검색합니다.

![[Assets/posts/img/2019-03-04-00-06-43.png]]

- 설정 파일에 아래 내용을 추가합니다.
```json
"[markdown]": {
		"editor.quickSuggestions": true
	}
```

## Reference
- <https://milooy.wordpress.com/2019/01/10/console-log-shortcut-in-vscode/>
