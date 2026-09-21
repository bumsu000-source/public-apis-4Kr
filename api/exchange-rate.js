// Vercel 서버리스 함수. /api/exchange-rate 로 배포된다.
// 인증키는 Vercel 프로젝트 환경변수(KOREAEXIM_API_KEY)에서만 읽고, 응답에는 절대 포함하지 않는다.
const { getUsdKrwRate } = require("../lib/exchangeRate");

module.exports = async (req, res) => {
  try {
    const date = req.query && req.query.date;
    const result = await getUsdKrwRate(process.env.KOREAEXIM_API_KEY, date);
    res.status(200).json(result);
  } catch (err) {
    const cause = err.cause
      ? { code: err.cause.code, message: err.cause.message }
      : null;
    res.status(502).json({ found: false, error: err.message, cause });
  }
};
