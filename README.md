# 시작하기

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app)을 사용하여 부트스트랩된 프로젝트입니다.

## FE (프론트엔드)

프로젝트 디렉토리에서 다음 명령어를 실행하세요:

### `npm install`

### `npm start`

개발 모드에서 애플리케이션이 실행됩니다.\
[http://localhost:3000](http://localhost:3000)에서 브라우저로 확인할 수 있습니다.

- 페이지를 수정하면 자동으로 리로드됩니다.
- 콘솔에서 린트 오류(Lint Errors)를 확인할 수 있습니다.

## BE (백엔드)

프로젝트 디렉토리에서 다음 명령어를 실행하세요:

### 1. 가상 환경 설치

```bash
py -m venv venv
```

### 2. 가상 환경 활성화

```bash
venv\Scripts\activate
```

### 3. 의존성 설치

```bash
pip install -r requirements.txt
```

### 4. 서버 실행

```bash
uvicorn main:app --reload
```

- 서버는 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)에서 실행됩니다.
- 파일을 수정하면 서버가 자동으로 리로드됩니다.
- 실행 중 발생하는 에러는 콘솔에서 확인할 수 있습니다.

---

## 프로젝트 구조

```
my-app/
├── FE/            # 프론트엔드 코드
│   ├── src/       # React 애플리케이션 소스 코드
│   └── public/    # 정적 파일
├── BE/            # 백엔드 코드
│   ├── main.py    # FastAPI 서버 메인 엔트리포인트
│   ├── data/      # JSON 데이터 저장 디렉토리
│   └── static/    # 업로드된 이미지 및 파일 저장 디렉토리
└── README.md      # 프로젝트 설명 파일
```

---

## 실행 환경

- Node.js 18 이상
- Python 3.10 이상
- FastAPI 0.95 이상
- npm 8 이상

---

## 이외 개발 단계에서 유용한 명령어

### 프론트엔드

1. **빌드**
   ```bash
   npm run build
   ```
   최적화된 프로덕션 빌드가 생성됩니다.

### 백엔드

1. **가상 환경 비활성화**
   ```bash
   deactivate
   ```

---

## 디버깅 팁

- **프론트엔드 에러**: 브라우저 개발자 도구(F12)에서 콘솔 탭 확인.
- **백엔드 에러**: 서버 로그를 통해 문제 확인.

---
