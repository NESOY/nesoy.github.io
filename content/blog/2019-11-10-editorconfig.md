---
title: EditorConfig란?
tags:
  - 개발환경
date: 2019-11-10
aliases: 
  - ../articles/2019-11/editorconfig
---
![[Assets/posts/img/2019-11-10-21-02-28.png]]

## 들어가며
> 오픈소스를 보면서 많은 개발자들이 일정한 Convention을 어떻게 유지할 수 있는 방법에 대한 좋은 가이드가 있어 공유합니다.

## EditorConfig란?
- 많은 개발자들이 다양한 Editor나 IDE의 관계없이 일정한 코드 스타일을 유지하기 위해 도와주는 설정파일입니다.
- 파일 형태로 유지되며 읽기 쉽고 스타일에 대한 형상관리가 가능한 장점이 있습니다.

## Example
- `.editorconfig`라는 파일을 생성하고 설정을 추가하면 됩니다.

#### Spring-boot editorconfig
```
root=true

[*.{groovy,java,kt,xml}]
indent_style = tab
indent_size = 4
continuation_indent_size = 8
```

#### Mockito editorconfig
```
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4
```

### 지원가능한 설정속성
> 모든 에디터에서 지원가능한 속성은 아닌점을 주의해주세요 :)

- indent_style
  - tab, space
- tab_width, indent_size
  - number
- end_of_line
  - lf, cr, crlf
- charset
  - latin1, utf-8, utf-8-bom, utf-16be, utf-16le
- trim_trailing_whitespace
  - 공백 문자 제거
- insert_final_newline
  - 파일 맨마지막에 newline을 추가 여부
- root

#### 플러그인 없이 지원가능한 Editor
![[Assets/posts/img/2019-11-10-21-12-36.png]]

#### 플러그인 설치해야 지원가능한 Editor
![[Assets/posts/img/2019-11-10-21-12-48.png]]

## Reference
- <https://editorconfig.org/>
- <https://github.com/editorconfig/editorconfig/wiki/Projects-Using-EditorConfig>
- [Springboot-editorconfig](https://github.com/spring-projects/spring-boot/blob/master/.editorconfig)


