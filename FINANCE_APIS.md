# 금융 관련 공공/오픈 API 모음

[README.md](./README.md)에 정리된 전체 공공데이터 API 중 **금융(Finance)** 관련 API만 추려서
카테고리별로 재구성한 문서입니다. 금융 프로젝트를 시작할 때 참고용으로 사용하세요.

> 출처: 이 저장소의 `README.md` — `금융 & 결제`, `암호화폐 거래소`, `재정 & 예산` 섹션
> (원본 목차 순서를 기준으로, 성격에 따라 세부 카테고리로 재분류했습니다.)

## 목차

- [은행 / 오픈뱅킹](#은행--오픈뱅킹)
- [증권 / 투자](#증권--투자)
- [환율 / 금리 / 경제통계](#환율--금리--경제통계)
- [간편결제 / PG (결제대행)](#간편결제--pg-결제대행)
- [금융 데이터 통합 / 마켓플레이스](#금융-데이터-통합--마켓플레이스)
- [암호화폐 거래소](#암호화폐-거래소)
- [재정 & 예산 (국가/지방)](#재정--예산-국가지방)

---

### 은행 / 오픈뱅킹

| API | 설명 | 인증 |
| --- | --- | --- |
| [금융결제원 오픈뱅킹](https://openapi.kftc.or.kr/service/openBanking) | 19개+ 은행 통합 계좌조회, 이체, 결제 서비스 | `OAuth` |
| [신한은행 Open API](https://openapi.shinhan.com/) | 신한금융그룹 통합 API 서비스 | `OAuth` |
| [우리은행 Open API](https://developer.wooribank.com/apiservice) | 핀테크 개발자 원스탑 지원 서비스 | `OAuth` |
| [하나금융그룹 Open API](https://www.hanafnapimarket.com/) | 하나금융그룹 API 마켓플레이스 | `OAuth` |
| [KB국민은행 Open API](https://obizapi.kbstar.com/quics?page=C108082) | KB 종합 금융서비스 및 BaaS 플랫폼 | `OAuth` |
| [NH농협은행 Open API](https://developers.nonghyup.com/center/CE_1020) | 농협 금융 API 개발자센터 | `OAuth` |

### 증권 / 투자

| API | 설명 | 인증 |
| --- | --- | --- |
| [한국투자증권 KIS API](https://apiportal.koreainvestment.com/intro) | 국내외 주식 시세 및 주문 API | `OAuth` |

### 환율 / 금리 / 경제통계

| API | 설명 | 인증 |
| --- | --- | --- |
| [한국수출입은행 Open API](https://www.koreaexim.go.kr/ir/HPHKIR019M01) | 현재환율, 대출금리, 국제금리 정보 | `apiKey` |
| [한국은행 Open API](https://ecos.bok.or.kr/api/) | 경제통계정보 제공 API | `apiKey` |

### 간편결제 / PG (결제대행)

| API | 설명 | 인증 |
| --- | --- | --- |
| [네이버페이 API](https://developers.pay.naver.com/) | 네이버페이 결제, 정기결제, 자동결제 API | `OAuth` |
| [부트페이 API](https://docs.bootpay.co.kr/) | 통합 PG 연동 서비스, 이니시스·KCP·다날 등 다중 PG사 지원 | `apiKey` |
| [삼성페이 API](https://developer.samsung.com/pay) | 모바일 결제 및 디지털 지갑 서비스 | `Partnership` |
| [카카오페이](https://developers.kakaopay.com/) | 온라인 결제, 정기결제, 송금 등 종합 결제 솔루션 | `OAuth` |
| [토스페이 API](https://docs-pay.toss.im/reference) | 토스를 통한 결제 서비스 API (TLS 1.2+ 필수) | `apiKey` |
| [토스페이먼츠](https://docs.tosspayments.com/reference) | 통합 결제 API (카드, 가상계좌, 간편결제) | `apiKey` |
| [페이코(PAYCO)](https://developers.payco.com/guide) | NHN 통합 ID 및 멤버십 연동 서비스 | `OAuth` |
| [페이플 API](https://developer.payple.kr/) | 간편결제, 정기결제, 링크결제 서비스 | `apiKey` |

### 금융 데이터 통합 / 마켓플레이스

| API | 설명 | 인증 |
| --- | --- | --- |
| [금융위원회 금융공공데이터 Open API](https://www.fsc.go.kr/in060301) | 기업·금융회사·공시·자본시장·시세·금융상품 등 10개 주제 110개 API 제공 | `apiKey` |
| [하이픈 API 마켓플레이스](https://hyphen.im/) | 케이에스넷 자회사 데이터 API 마켓플레이스 (500개 이상 API) | `apiKey` |
| [CODEF API](https://developer.codef.io/) | 금융, 보험, 통신 데이터 통합 연동 | `OAuth` |
| [KB API 포탈](https://apiportal.kbfg.com/) | KB금융그룹 종합 금융 API 서비스 (800+ API 제공) | `OAuth` |

### 암호화폐 거래소

| API | 설명 | 인증 |
| --- | --- | --- |
| [빗썸 프로 API](https://apidocs.bithumb.com/) | 전문 거래자용 암호화폐 거래 API | `apiKey` |
| [업비트 Open API](https://docs.upbit.com/kr) | 국내 최대 암호화폐 거래소 API (JWT 인증) | `JWT` |
| [코인원 Open API](https://docs.coinone.co.kr/) | 가상자산 거래 및 시세정보 API | `apiKey` |

### 재정 & 예산 (국가/지방)

| API | 설명 | 인증 |
| --- | --- | --- |
| [NABOSTATS Open API](https://www.nabostats.go.kr/portal/openapi/openApiIntroPage.do) | 국회예산정책처 재정·경제통계 데이터 제공 | `apiKey` |
| [열린재정 재정정보공개시스템](https://www.openfiscaldata.go.kr/op/ko/ds/UOPKODSA06) | 국가 및 지방재정 예산/결산, 보조금, 국고보조사업 정보 | `apiKey` |

---

## 인증 방식 요약

| 인증 방식 | 의미 |
| --- | --- |
| `apiKey` | API가 인증을 위해 개인 키 문자열/토큰을 사용 |
| `OAuth` | API가 OAuth 인증을 지원 |
| `JWT` | JWT 토큰 인증 사용 |
| `Partnership` | 파트너십 또는 별도 계약 필요 |

## 참고

- 총 **26개** 금융 관련 API를 정리했습니다 (은행 6, 증권 1, 환율/금리 2, 간편결제 8, 금융데이터 통합 4, 암호화폐 3, 재정/예산 2).
- 각 API의 최신 상세 스펙과 신청 절차는 링크된 공식 개발자 문서를 확인하세요.
- 전체 공공데이터 API 목록은 [README.md](./README.md)를 참고하세요.
