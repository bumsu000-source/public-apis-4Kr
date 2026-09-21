require("dotenv").config();
const path = require("path");
const express = require("express");
const { getUsdKrwRate } = require("./lib/exchangeRate");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// 프론트는 이 엔드포인트만 호출한다. 인증키는 여기서만 서버 프로세스 메모리에 존재하고
// 응답 JSON에는 절대 포함하지 않는다.
app.get("/api/exchange-rate", async (req, res) => {
  try {
    const result = await getUsdKrwRate(process.env.KOREAEXIM_API_KEY, req.query.date);
    res.json(result);
  } catch (err) {
    res.status(502).json({ found: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
