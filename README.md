# Book Frontend

이것은 React, Vite, Tailwind CSS로 구축된 프런트엔드 프로젝트입니다. 책 관련 애플리케이션의 사용자 인터페이스 역할을 합니다.

## 기능
- UI 구성 요소를 구축하기 위한 **React 19**
- 빠른 개발 및 번들링을 위한 **Vite**
- 스타일링을 위한 **Tailwind CSS**
- 상태 관리를 위한 **Zustand**
- 유형 안전을 위한 **TypeScript**
- 코드 품질 강화를 위한 **ESLint**

## 시작하기

### 필수 조건
[Node.js](https://nodejs.org/)가 설치되어 있는지 확인하세요.

### 설치
1. 저장소 복제:
```sh
git clone <repository-url>
cd book-frontend
```
2. 종속성 설치:
```sh
npm install
```

### 개발
개발 서버를 시작하려면 다음을 실행합니다.
```sh
npm run dev
```
이렇게 하면 Vite 개발 서버가 시작됩니다.

### 빌드
프로덕션 빌드를 만들려면 다음을 실행합니다.
```sh
npm run build
```

### Lint
린팅 문제를 확인하려면 다음을 실행합니다.
```sh
npm run lint
```

### 미리보기
프로덕션 빌드를 로컬에서 미리 보려면 다음을 실행합니다.
```sh
npm run preview
```

## 프로젝트 구조
```
book-frontend/
├── src/ # 소스 코드
├── public/ # 정적 에셋
├── index.html # 기본 HTML 파일
├── tsconfig.json # TypeScript 구성
├── vite.config.ts # Vite 구성
├── package.json # 프로젝트 종속성 및 스크립트
└── README.md # 문서
```

## 기여
프로젝트를 개선하기 위해 자유롭게 이슈나 풀 리퀘스트를 제출하세요.

## 라이센스
이 프로젝트는 [MIT 라이센스](LICENSE)에 따라 라이센스되었습니다.
