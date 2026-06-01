 <h1>
    <img src="./app/assets/icons/MainLogoIcon.svg" alt="모아쌤 로고" width="32" align="left" />
    &nbsp;모아쌤
  </h1>

유치원, 어린이집 교사를 위한 AI 관찰일지 작성 및 활동자료 공유 커뮤니티

- 프로젝트 기간: 2026.04 ~ 2026.05 (2개월)
- 배포 주소: https://moassam.vercel.app

## 기술 스택

- **Language**: TypeScript
- **Framework**: React 19, Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query, Zustand
- **Library**: Tiptap, Radix UI, Axios, Framer Motion, Suspensive, Sonner
- **Component Docs**: Storybook
- **Monitoring**: Sentry, Google Analytics
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, commitlint
- **CI/CD**: GitHub Actions, Vercel

## 주요 기능

### 로그인

- 카카오, 네이버 OAuth 2.0 소셜 로그인
- 마지막 로그인 방식을 기억하여 "최근에 로그인 했어요!" 툴팁으로 재로그인 유도
- 반응형 로그인 UI 제공
  - 모바일: 바텀시트
  - 태블릿, 데스크탑: 모달
- 로그인 권한이 필요한 기능 접근 시 로그인 모달 자동 노출

### AI 관찰일지

- 연령, 영역(신체운동·건강, 의사소통, 사회관계, 예술경험, 자연탐구), 관찰 상황을 입력하면 AI가 총평과 선택한 영역의 관찰일지 자동 생성
- 선택한 연령에 맞는 누리과정 또는 표준보육과정을 기준으로 관찰일지 생성
  - 만 0세 ~ 2세: 표준보육과정
  - 만 3세 ~ 5세: 누리과정
- 재생성 기능으로 동일한 조건의 다양한 관찰일지 생성
- 총평과 영역별 관찰일지를 각각 클립보드에 복사
- 작성한 관찰일지 목록 조회, 상세 조회 및 삭제

### 커뮤니티

- **모아방**: 연령별, 자료 유형별 활동 자료 공유 및 다운로드
- **자유게시판**: 고민, 질문, 잡담 말머리별 자유 주제 글 공유
- 반응형 목록 UI 제공
  - 모바일, 태블릿: 무한 스크롤
  - 데스크탑: 페이지네이션
- Rich Text Editor로 게시글 작성 및 수정 (이미지, 파일 첨부 가능)
- 게시글 좋아요 및 북마크
- 댓글 작성, 수정 및 삭제
- 키워드 기반 게시글 검색

### 마이페이지

- **대시보드**: 프로필, 활동 현황, 남은 생성 횟수를 한곳에서 확인
  - 프로필 편집 (닉네임 변경) 및 회원 탈퇴
  - 남은 관찰일지 생성 횟수 Progress Bar로 시각화
  - 커뮤니티 활동 참여 시 관찰일지 생성 횟수 추가 (모아방 자료 공유 +3회, 자유게시판 글 작성 +1회)
- **보관함**: 관찰일지 내역, 게시글, 댓글, 북마크 조회 및 삭제
  - 모바일, 태블릿: 무한 스크롤
  - 데스크탑: 페이지네이션

## 컨벤션

### Branch Strategy

#### 브랜치 네이밍 규칙

- 기본 형식: `접두사/작업내용-이슈번호`
- 접두사: `feature`, `fix`, `chore`, `docs`, `style`, `refactor`
- 소문자 사용
- 단어는 하이픈(`-`)으로 연결하고 카테고리는 슬래시(`/`)로 구분
- 예: `feature/login-1`

#### 브랜치 작업 흐름

1. `develop` 브랜치에서 작업 브랜치 생성
2. 기능 구현 및 커밋
3. Pull Request 생성
4. 코드 리뷰 진행
5. 승인 후 `develop` 브랜치로 병합
6. 작업 브랜치 삭제

### Commit Convention

#### 커밋 메시지 규칙

- 기본 형식: `type: 내용 (#이슈번호)`
- 접두사는 소문자로 시작
- 접두사와 콜론(`:`) 사이 띄어쓰기 없음
- 예: `feature: 로그인 API 연동 (#1)`

#### 커밋 유형

- **feature**: 새로운 기능 추가
- **fix**: 버그 수정
- **refactor**: 코드 리팩토링 (기능 변화 없음)
- **style**: 코드 포맷팅 (공백, 들여쓰기 등 스타일만 수정)
- **chore**: 프로젝트 초기 생성, 빌드 설정, 라이브러리 설치 등 기타 작업
- **docs**: 문서 수정 (README, 주석 등)
- **test**: 테스트 코드 추가 및 수정

### Naming Convention

#### 파일 / 폴더

- **Component**: PascalCase
- **Hook**: camelCase (`use` prefix)
- **Store**: camelCase (`Store` suffix)
- **API**: kebab-case (`*.api.ts`)
- **Util**: camelCase
- **Type**: kebab-case (`*.type.ts`)
- **Folder**: kebab-case

#### 변수 / 함수

- **변수**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **이벤트 핸들러**: `handle + 대상 + 동작` (예: `handleLoginSubmit`)

## 팀원 소개

|                                                           이진희                                                           |                                                          김영수                                                          |
| :------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/jjinheeWorld"><img src="https://avatars.githubusercontent.com/jjinheeWorld" width="100" /></a> | <a href="https://github.com/youngsoon12"><img src="https://avatars.githubusercontent.com/youngsoon12" width="100" /></a> |
|                                      [@jjinheeWorld](https://github.com/jjinheeWorld)                                      |                                      [@youngsoon12](https://github.com/youngsoon12)                                      |
