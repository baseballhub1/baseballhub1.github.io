# Git · GitHub 명령어 정리

> VS Code의 **터미널 → 새 터미널**에서 입력하는 Git 입문 가이드. 명령어는 Git이 설치된 컴퓨터에서 실행합니다.

## 1. Git과 GitHub의 차이
- **Git**: 파일 변경 이력을 기록하고 버전과 브랜치를 관리하는 분산 버전 관리 시스템
- **GitHub**: Git 저장소를 온라인에 호스팅하고 공유·협업하는 서비스
- **저장소(repository)**: 프로젝트 파일과 Git 이력을 관리하는 단위
- **커밋(commit)**: 변경사항을 저장소 이력에 기록한 스냅샷
- **브랜치(branch)**: 독립적으로 개발하는 작업 흐름
- **origin**: 원격 저장소에 흔히 붙이는 이름. 필수 명칭은 아님
- **main**: 브랜치 이름 중 하나. 저장소마다 다를 수 있음

## 2. 처음 GitHub 저장소를 VS Code로 가져오기

VS Code에서 **터미널 → 새 터미널**을 열고 실행합니다.

```bash
git --version
git clone https://github.com/baseballhub1/baseballhub1.github.io.git
cd baseballhub1.github.io
code .
```
- `git clone`: 원격 저장소를 로컬에 복제. **clone한 저장소에는 git init이 필요 없습니다.**
- `cd`: 폴더로 이동 (셸 명령어이며 Git 명령어가 아님)
- `code .`: 현재 폴더를 VS Code에서 열기 (VS Code CLI)

## 3. 로컬 새 프로젝트를 GitHub에 올리기

**Git 이력이 없는 새로운 프로젝트 폴더에서** 실행하는 예시입니다. GitHub에 빈 저장소를 미리 만들고 URL을 바꾸세요.

```bash
git init
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git add .
git commit -m "첫 커밋"
git push -u origin main
```
- `git init`: 현재 폴더를 Git 저장소로 초기화
- `git branch -M main`: 현재 브랜치 이름을 main으로 변경
- `git remote add origin URL`: 원격 저장소를 origin이라는 이름으로 등록
- `git add .`: 현재 디렉터리 아래 변경 파일을 스테이징(추적 제외 파일은 포함 안 됨)
- `git commit -m "메시지"`: 스테이징한 변경사항을 커밋
- `git push -u origin main`: 원격 main으로 푸시하고 업스트림 설정

**주의:** 원격 저장소에 이미 별도의 커밋이 있다면 위 명령으로 푸시가 거절될 수 있습니다. 기존 저장소는 보통 `git clone`으로 시작하는 편이 안전합니다.

## 4. 매일 사용하는 기본 흐름

### GitHub 최신 변경사항 받기
```bash
git status
git pull origin main
```
`git pull`은 원격 변경사항을 가져온 다음 현재 브랜치에 통합합니다. 로컬 변경과 충돌할 수 있으니 `git status`를 먼저 확인하세요.

### 수정사항 올리기
```bash
git status
git add .
git commit -m "기능 수정"
git push
```
`git push`만 사용할 수 있는지는 업스트림 설정에 따라 다릅니다. 설정되지 않았다면 `git push -u origin main` 등을 사용합니다.

## 5. 주요 명령어 표

| 명령어 | 역할 |
| --- | --- |
| `git --version` | Git 버전 확인 |
| `git config --global user.name "이름"` | 커밋 작성자 이름 설정 |
| `git config --global user.email "메일"` | 커밋 작성자 이메일 설정 |
| `git init` | 현재 폴더의 Git 저장소 초기화 |
| `git clone URL` | 원격 저장소 복제 |
| `git status` | 작업 트리 및 스테이징 상태 확인 |
| `git add 파일명` | 특정 파일을 스테이징 |
| `git add .` | 현재 디렉터리 아래 변경사항 스테이징 |
| `git restore --staged 파일명` | 스테이징 취소 (파일 수정은 유지) |
| `git commit -m "내용"` | 스테이징 변경사항 기록 |
| `git log --oneline` | 간단한 커밋 이력 확인 |
| `git diff` | 아직 스테이징하지 않은 변경 비교 |
| `git diff --staged` | 스테이징된 변경 비교 |
| `git remote -v` | 등록된 원격 저장소 확인 |
| `git remote add origin URL` | 원격 저장소 등록 |
| `git fetch origin` | 원격 정보 가져오기 (자동 병합 안 함) |
| `git pull origin main` | 원격 main 가져와 현재 브랜치에 통합 |
| `git push origin main` | 로컬 main을 원격 main으로 전송 |
| `git branch` | 로컬 브랜치 목록 |
| `git switch -c feature/test` | 새 브랜치를 만들고 전환 |
| `git switch main` | main 브랜치로 전환 |
| `git merge feature/test` | 현재 브랜치에 지정 브랜치 병합 |
| `git stash` | 작업 중 변경사항 임시 보관 |
| `git stash pop` | 보관한 변경사항 복원 후 스태시 제거 |

## 6. 브랜치 작업 예시
```bash
git switch -c feature/login
# 코드 수정
git add .
git commit -m "로그인 기능 작성"
git switch main
git merge feature/login
git push origin main
```
실제 협업 시에는 기능 브랜치를 `git push -u origin feature/login`으로 올리고 GitHub에서 Pull Request를 생성해 리뷰 후 병합할 수도 있습니다.

## 7. 자주 나오는 오류

### `fatal: not a git repository`
Git 저장소 바깥에서 실행한 경우가 많습니다. `git clone`한 프로젝트 폴더로 이동하거나 **새 프로젝트에 한하여** `git init`을 수행합니다.

### `remote origin already exists`
이미 origin이 등록되어 있습니다.
```bash
git remote -v
git remote set-url origin https://github.com/사용자명/저장소명.git
```

### `nothing to commit, working tree clean`
현재 커밋할 변경사항이 없습니다. `git status`로 확인합니다.

### `rejected (non-fast-forward)`
원격에 로컬에 없는 커밋이 있을 수 있습니다. 변경사항과 브랜치를 확인하고 적절하게 pull/merge/rebase한 후 다시 push합니다. 원인을 모른 채 `git push --force`를 사용하지 마세요.

### `Please tell me who you are`
커밋 작성자 설정이 필요합니다.
```bash
git config --global user.name "본인 이름"
git config --global user.email "본인 이메일"
```

### `CONFLICT` (충돌)
충돌된 파일을 열어 변경사항을 정리한 뒤 `git add`하고 병합을 완료합니다. 상황에 따라 `git merge --abort` 등으로 중단할 수 있습니다.

### 인증 실패 (`Authentication failed`, `Permission denied`)
저장소 접근 권한과 GitHub 인증을 확인합니다. GitHub HTTPS Git 인증에는 계정 비밀번호 대신 자격 증명 관리자 또는 토큰 등을 사용합니다.

## 8. 암기용 핵심
- **처음 내려받기:** `git clone URL`
- **새 로컬 프로젝트 시작:** `git init`
- **원격 저장소 연결:** `git remote add origin URL`
- **업로드:** `git add .` → `git commit -m "설명"` → `git push`
- **업데이트:** `git pull origin main`
- **상태 확인:** `git status`

## 공식 출처
- [Git 공식 문서](https://git-scm.com/docs)
- [GitHub Docs · 저장소 복제](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [GitHub Docs · 원격 저장소 관리](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)
- [VS Code · Git 소스 제어](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git)
