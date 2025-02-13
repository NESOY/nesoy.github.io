---
title: Alfred에서 iTerm 명령어 바로 실행하기
tags:
  - 개발환경
date: 2019-07-15
aliases: 
  - ../articles/2019-07/Alfred-iterm
---

## Alfred에서 iTerm 명령어 바로 실행하기
- Alfred에서 매번 iTerm 실행 후 명령어를 치는 것이 귀찮아 찾아보니 좋은 Script가 있어 공유합니다.

![[Assets/posts/img/2019-07-15-20-17-03.png]]


### iTerm 실행 Script를 복사하여 붙여넣어보자
```
-- This is v0.6 of the custom script for AlfredApp for iTerm 2.9+
-- Please see https://github.com/stuartcryan/custom-iterm-applescripts-for-alfred/
-- for the latest changes.

-- Please note, if you store the iTerm binary in any other location than the Applications Folder
-- please ensure you update the two locations below (in the format of : rather than / for folder dividers)
-- this gets around issues with AppleScript not handling things well if you have two iTerm binaries on your system... which can happen :D

on alfred_script(q)
	if application "iTerm2" is running or application "iTerm" is running then
		run script "
			on run {q}
				tell application \":Applications:iTerm.app\"
					activate
					try
						select first window
						set onlywindow to false
					on error
						create window with default profile
						select first window
						set onlywindow to true
					end try
					tell the first window
						if onlywindow is false then
							create tab with default profile
						end if
						tell current session to write text q
					end tell
				end tell
			end run
		" with parameters {q}
	else
		run script "
			on run {q}
				tell application \":Applications:iTerm.app\"
					activate
					try
						select first window
					on error
						create window with default profile
						select first window
					end try
					tell the first window
						tell current session to write text q
					end tell
				end tell
			end run
		" with parameters {q}
	end if
end alfred_script
```

### 실행하기
- `Prefix`와 함께 원하는 명령어를 작성하고 엔터를 치면 터미널이 활성화되는 것을 확인할 수 있습니다.
![[Assets/posts/img/2019-07-15-20-22-15.png]]

#### 터미널 실행 후 화면
![[Assets/posts/img/2019-07-15-20-22-37.png]]

## Reference
