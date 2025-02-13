---
title: Mac-Airpod 간편하게 연결하기
tags:
  - 개발환경
date: 2018-08-30
aliases: 
  - ../articles/2018-08/Mac-Airpod
---

## 매일 iPhone과 Airpod이 연결된 상태에서 Mac으로 연결하기 위해선?
- 블루투스 -> Airpod -> 연결 버튼을 눌러야 합니다.

![[Assets/posts/20180830/1.png]]

> 위 과정은 매우 간단하지만 하루에도 몇 번씩 일어납니다..ㅠㅠ

## 하루에도 몇 번씩이나 반복되는 이 행위를 간편하게 해봅시다.

### Script Editor를 실행합니다.
![[Assets/posts/20180830/2.png]]

### Script를 작성합니다.

```applescript
activate application "SystemUIServer"
tell application "System Events"
	tell process "SystemUIServer"
		-- Working CONNECT Script.  Goes through the following:
		-- Clicks on Bluetooth Menu (OSX Top Menu Bar)
		--    => Clicks on SX-991 Item
		--      => Clicks on Connect Item
		set btMenu to (menu bar item 1 of menu bar 1 whose description contains "bluetooth")
		tell btMenu
			click
			tell (menu item "Airpod" of menu 1) # 당신의 Airpod 이름을 넣어주세요.
				click
				if exists menu item "연결" of menu 1 then # 연결(Connect) 버튼 이름을 넣어주세요 :)
					click menu item "연결" of menu 1
					return "연결..."
				else
					click btMenu -- Close main BT drop down if Connect wasn't present
					return "Connect menu was not found, are you already connected?"
				end if
			end tell
		end tell
	end tell
end tell
```

#### Airpod 이름을 작성할 때 주의할 점.

![[Assets/posts/20180830/3.png]]



### Script를 저장합니다.
- Application으로 저장해야 합니다.

![[Assets/posts/20180830/4.png]]

### 접근 제어를 추가해 줍니다.

![[Assets/posts/20180830/5.png]]

### 이제 실행하면 쉽게 연결이 가능합니다.

![[Assets/posts/20180830/6.png]]


### 아주 좋군요 :)
![[assets/emoticon/satisfy.jpg]]


### ETC
- [BetterTouchTool](https://folivora.ai/)를 사용하면 단축키로도 쉽게 연결할 수 있습니다.

![[Assets/posts/20180830/7.png]]

## Reference
- <https://medium.com/@secondfret/how-to-connect-your-airpods-to-your-mac-with-a-keyboard-shortcut-9d72e786993b>
