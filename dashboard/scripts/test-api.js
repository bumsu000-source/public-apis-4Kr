// 실제 API 호출 확인용 스크립트. 화면 없이 콘솔에만 출력한다.
// 실행: npm run test:api

require("dotenv").config();
const { getUsdKrwRate } = require("../lib/exchangeRate");

async function main() {
  console.log("한국수출입은행 환율 API 호출 시도...");
  console.log("(searchdate 미지정 시 오늘 날짜로 조회)");
  console.log("");

  try {
    const result = await getUsdKrwRate(process.env.KOREAEXIM_API_KEY);

    console.log(`조회 날짜: ${result.date}`);

    if (!result.found) {
      console.log("USD 데이터를 찾지 못함.");
      console.log(`사유: ${result.note || "확인 못 함"}`);
      console.log("원본 응답:", JSON.stringify(result.raw, null, 2));
      return;
    }

    console.log("USD 데이터 수신 성공");
    console.log(`- 통화명: ${result.curName}`);
    console.log(`- 매매기준율(deal_bas_r): ${result.dealBasRate}`);
    console.log(`- 전신환 매입율(ttb): ${result.ttb}`);
    console.log(`- 전신환 매도율(tts): ${result.tts}`);
    console.log("");
    console.log("응답 항목(필드) 목록:", result.fields.join(", "));
    console.log("");
    console.log("원본 응답 전체:");
    console.log(JSON.stringify(result.raw, null, 2));
  } catch (err) {
    console.error("호출 실패:", err.message);
    process.exitCode = 1;
  }
}

main();
