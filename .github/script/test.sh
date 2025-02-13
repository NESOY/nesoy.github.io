#!/bin/bash

# Markdown 파일이 있는 디렉토리 (현재 디렉토리 기준)
TARGET_DIR="."

# macOS와 Linux 호환을 위해 `sed` 백업 확장자를 빈 문자열("")로 설정
find "$TARGET_DIR" -type f -name "*.md" | while read -r file; do
    # `public/Assets/` -> `Assets/` 변경
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i "" -E 's|!\[\[public/Assets/|![[Assets/|g' "$file"  # macOS
    else
        sed -i -E 's|!\[\[public/Assets/|![[Assets/|g' "$file"  # Linux
    fi
    
    echo "✅ Updated: $file"
done

echo "🚀 변환이 완료되었습니다!"