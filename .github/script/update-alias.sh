#!/bin/bash

# Markdown 파일이 있는 디렉토리 (현재 디렉토리 기준)
TARGET_DIR="."

# 모든 Markdown 파일을 대상으로 작업 수행
find "$TARGET_DIR" -type f -name "*.md" | while read -r file; do
    # 파일명에서 날짜(YYYY-MM-DD)와 제목 부분 추출
    filename=$(basename "$file" .md)

    if [[ $filename =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})-(.*)$ ]]; then
        year="${BASH_REMATCH[1]}"
        month="${BASH_REMATCH[2]}"
        day="${BASH_REMATCH[3]}"
        title="${BASH_REMATCH[4]}"
        
        # 생성할 aliases 값
        alias_value="../articles/${year}-${month}/${title}"

        # 새로운 파일 내용을 저장할 변수
        new_content=""
        inside_aliases=0
        alias_already_exists=0
        added_alias=0  # 새로운 alias 추가 여부 체크

        while IFS= read -r line; do
            # `aliases:` 줄을 찾으면 플래그 설정
            if [[ "$line" =~ ^aliases: ]]; then
                inside_aliases=1
                new_content+=$'\n'"$line"
                continue
            fi

            # `  - ...` 형태의 alias 값을 찾으면 중복 확인
            if ((inside_aliases == 1)) && [[ "$line" =~ ^[[:space:]]*-[[:space:]] ]]; then
                alias_item=$(echo "$line" | sed -E 's/^[[:space:]]*-[[:space:]]*//')
                if [[ "$alias_item" == "$alias_value" ]]; then
                    alias_already_exists=1
                fi
            fi

            # `aliases:` 블록이 끝났을 때 새로운 값 추가 (한 번만 실행)
            if ((inside_aliases == 1)) && [[ ! "$line" =~ ^[[:space:]]*-[[:space:]] ]]; then
                if ((added_alias == 0 && alias_already_exists == 0)); then
                    new_content+=$'\n'"  - $alias_value"
                    added_alias=1
                fi
                inside_aliases=0
            fi

            # 기존 내용 유지
            new_content+=$'\n'"$line"
        done < "$file"

        # 변환된 내용 덮어쓰기
        echo "$new_content" | tail -n +2 > "$file"

        echo "✅ Updated: $file (Added alias: $alias_value)"
    else
        echo "⚠️ Skipped: $file (Filename does not match expected format)"
    fi
done

echo "🚀 변환이 완료되었습니다!"