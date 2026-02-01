---
title: Asdf
description:
aliases: []
date: 2025-10-09
comments: true
category:
  - "[[Java]]"
---
# Asdf
- java뿐만 아니라 다른 언어도 쉽게 설치하고 제어할 수 있는 패키지 매니저
  
## How to install
```
# install dependencies (필요시) 
brew install coreutils curl git 

# install asdf 
brew install asdf 

# add to shell
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"

# java home 지정하기
. ~/.asdf/plugins/java/set-java-home.zsh
```

### [[Java]]
```
# plugin 설치
asdf plugin add java
asdf plugin update java

# java version 확인
asdf list all java

# java 설치
asdf install java corretto-8.422.05.1

# 설치된 java 확인
asdf list java

# global
asdf set --home java corretto-8.422.05.1

# global check
cat $HOME/.tool-versions

# local
asdf set java temurin-17.0.14+7
```

### [[Nodejs]]
- https://github.com/asdf-vm/asdf-nodejs
```
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin update nodejs
```

### [[GoLang]]
- https://github.com/asdf-community/asdf-golang
```
asdf plugin add golang https://github.com/asdf-community/asdf-golang.git
asdf plugin update golang
```

### [[Ruby]]
- https://github.com/asdf-vm/asdf-ruby
```
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git
asdf plugin update ruby
```

### [[Minikube]]
- https://github.com/alvarobp/asdf-minikube
```
asdf plugin-add minikube https://github.com/alvarobp/asdf-minikube.git
```

## See Also
- [[Sdkman]]

## Reference
- https://asdf-vm.com