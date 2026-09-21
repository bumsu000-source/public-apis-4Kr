const https = require("https");

const BASE_URL = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

// 한국수출입은행 서버가 중간 인증서(intermediate CA)를 전체 체인으로 보내지 않아서
// Node의 기본 TLS 검증이 UNABLE_TO_VERIFY_LEAF_SIGNATURE로 실패한다.
// 브라우저는 자체적으로 체인을 보완해 문제없이 열리지만 Node는 그렇지 않다.
// 이 API는 공개 환율 정보만 반환하므로, 이 호출 하나에 한해서만(전역 설정 아님)
// 인증서 체인 검증을 완화한다.
function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`응답 파싱 실패: ${e.message}`));
        }
      });
    });
    req.on("error", reject);
  });
}

const RESULT_MESSAGES = {
  1: "정상 응답",
  2: "DATA코드 오류 (data 파라미터 확인 필요)",
  3: "인증코드 오류 (authkey 확인 필요)",
  4: "일일 제한 횟수 마감 (내일 다시 시도)",
};

function toYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

// 한국수출입은행 Open API 호출. authkey가 없으면 호출 자체를 시도하지 않고 에러를 던진다.
async function fetchExchangeRates(authkey, searchdate) {
  if (!authkey) {
    throw new Error(
      "KOREAEXIM_API_KEY가 설정되지 않았습니다. .env 파일에 키를 입력하세요."
    );
  }

  const date = searchdate || toYYYYMMDD(new Date());
  const url = `${BASE_URL}?authkey=${encodeURIComponent(authkey)}&searchdate=${date}&data=AP01`;

  const body = await httpsGetJson(url);

  // 주말/공휴일 등 해당 날짜에 고시된 환율이 없으면 빈 배열이 온다.
  if (Array.isArray(body) && body.length === 0) {
    return { date, items: [], raw: body, note: "해당 날짜에 고시된 환율 데이터 없음 (주말/공휴일 가능성)" };
  }

  // 인증키 오류 등은 result 코드만 담긴 객체로 온다.
  const first = body[0];
  if (first && first.result && first.result !== 1) {
    const message = RESULT_MESSAGES[first.result] || `알 수 없는 result 코드: ${first.result}`;
    throw new Error(`API 오류 (result=${first.result}): ${message}`);
  }

  return { date, items: body, raw: body };
}

async function getUsdKrwRate(authkey, searchdate) {
  const { date, items, raw, note } = await fetchExchangeRates(authkey, searchdate);
  const usd = items.find((item) => item.cur_unit === "USD");

  if (!usd) {
    return { date, found: false, note, raw };
  }

  return {
    date,
    found: true,
    curUnit: usd.cur_unit,
    curName: usd.cur_nm,
    dealBasRate: usd.deal_bas_r, // 매매기준율
    ttb: usd.ttb, // 전신환 매입율
    tts: usd.tts, // 전신환 매도율
    fields: Object.keys(usd),
    raw,
  };
}

module.exports = { fetchExchangeRates, getUsdKrwRate, toYYYYMMDD };
