# 환율손익 대시보드 — 1단계 (Vercel 배포용)

`market-research.md`에서 정한 문제(주식평가손익 + 환율평가손익 + 총손익을 한 화면에서 확인)를 풀기 위한 첫 단계.
지금 단계의 목표는 딱 하나: **한국수출입은행 환율 API에서 실제 숫자가 화면에 들어오는지 확인하는 것.**

## 구조 (Vercel 서버리스 방식, 저장소 루트에 배치)

```
index.html, style.css, app.js   ← 정적 파일, Vercel이 그대로 서빙
api/exchange-rate.js            ← 서버리스 함수, /api/exchange-rate 로 배포됨
lib/exchangeRate.js             ← API 호출/파싱 공통 로직
test-api.js                     ← 콘솔에서 API 응답만 확인하는 스크립트
```

원래는 `dashboard/` 하위 폴더에 있었는데, Vercel의 "New Project" 화면에서 Root Directory로 `dashboard`를 선택하려 해도 목록에 나타나지 않는 문제가 계속돼서(캐시/동기화 이슈로 추정), **저장소 루트로 파일들을 옮겨서 Root Directory 선택 자체를 없앴다.** 이제 Vercel Import 시 Root Directory는 기본값(저장소 루트)을 그대로 두면 된다.

이전에는 `server.js`(`app.listen()`으로 계속 떠 있는 Express 서버) 방식이었는데, **이 구조는 Vercel에서 동작하지 않는다.** Vercel은 상시 실행되는 서버가 아니라 `api/` 폴더 안의 함수를 요청 시마다 실행하는 서버리스 방식이라, `server.js`를 그대로 올리면 배포가 실패하거나 API가 응답하지 않는다. 그래서 `api/exchange-rate.js`로 다시 만들었다.

- 인증키(`KOREAEXIM_API_KEY`)는 Vercel 프로젝트의 환경변수로만 저장하고, `api/exchange-rate.js`만 이 값을 읽는다.
- 브라우저(`app.js`)는 `/api/exchange-rate`만 호출한다. 키를 브라우저가 볼 방법이 없다.

## Vercel 배포 방법

1. Vercel → New Project → 이 GitHub 저장소(`public-apis-4Kr`) 선택
2. **Root Directory는 기본값(`./`, 저장소 루트) 그대로 둔다** — 더 이상 폴더를 따로 지정할 필요 없음
3. Framework Preset은 "Other"로 둔다 (빌드 명령 없음, Output Directory는 기본값)
4. Environment Variables에 `KOREAEXIM_API_KEY` 추가 (발급: https://www.koreaexim.go.kr/ir/HPHKIR019M01)
5. Deploy

## 로컬에서 확인하는 방법

### 1) API 응답만 콘솔로 확인 (가장 빠름)

```
npm install
# .env 파일에 KOREAEXIM_API_KEY=발급받은키 입력
npm run test:api
```

성공하면 오늘 원/달러 매매기준율과 응답 필드 목록(`cur_unit`, `deal_bas_r`, `ttb`, `tts` 등)이 콘솔에 출력된다.

> 이 프로젝트를 만든 클라우드 세션은 외부 네트워크 호출이 정책상 막혀 있어서, 실제 호출 성공은 이 환경 안에서 확인하지 못했다. 키 없이 실행 시 "키 없음" 에러가, 임시 키로는 프록시 차단(`HTTP 403`)이 뜨는 것까지는 확인했다 — 에러 처리 로직 자체는 정상 동작한다. **로컬(또는 외부 네트워크가 열린 환경)에서 실제 키로 반드시 재확인할 것.**

### 2) 화면까지 포함해서 확인 (Vercel 환경과 동일하게)

Vercel CLI로 로컬에서 서버리스 함수 + 정적 파일을 실제 배포와 똑같은 방식으로 띄울 수 있다.

```
npx vercel dev
```

`http://localhost:3000`(또는 안내되는 포트) 접속 → 오늘 환율 숫자와 응답 필드 목록이 화면에 뜨는지 확인.
API 호출이 실패하면 숫자 대신 에러 메시지가 화면에 뜬다(조용히 숨기지 않음).

모바일 폭에서 가로 스크롤이 생기지 않도록 `max-width: 480px` 컨테이너 + `overflow-x: hidden` + 상대 단위(`clamp`, `%`)로 구성했다. 실제 휴대폰 또는 브라우저 반응형 모드(375px 폭 등)에서 좌우로 밀리지 않는지 확인 필요.

## 다음 단계 (아직 안 만듦)

- 매수단가/수량/매수시점환율 입력 → 주식평가손익·환율평가손익·총손익 3분해 계산
- `market-research.md`의 "안 만들 것" 항목(자동매매 연동, 로그인/다중사용자, 증권사 자동연동)은 이번 범위에서 제외
