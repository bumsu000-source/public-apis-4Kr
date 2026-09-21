const stateText = document.getElementById("state-text");
const rateValue = document.getElementById("rate-value");
const rateMeta = document.getElementById("rate-meta");
const fieldsCard = document.getElementById("fields-card");
const fieldsList = document.getElementById("fields-list");
const reloadBtn = document.getElementById("reload-btn");

async function loadRate() {
  stateText.hidden = false;
  stateText.classList.remove("error");
  stateText.textContent = "불러오는 중...";
  rateValue.hidden = true;
  rateMeta.hidden = true;
  fieldsCard.hidden = true;

  try {
    const res = await fetch("/api/exchange-rate");
    const data = await res.json();

    if (!data.found) {
      stateText.classList.add("error");
      stateText.textContent = `데이터를 가져오지 못했습니다: ${data.error || data.note || "확인 못 함"}`;
      return;
    }

    stateText.hidden = true;
    rateValue.hidden = false;
    rateMeta.hidden = false;
    rateValue.textContent = `${data.dealBasRate}원`;
    rateMeta.textContent = `${data.curName} (${data.curUnit}) · 기준일 ${data.date} · 매매기준율`;

    fieldsList.innerHTML = "";
    data.fields.forEach((field) => {
      const li = document.createElement("li");
      li.textContent = field;
      fieldsList.appendChild(li);
    });
    fieldsCard.hidden = false;
  } catch (err) {
    stateText.classList.add("error");
    stateText.textContent = `요청 실패: ${err.message}`;
  }
}

reloadBtn.addEventListener("click", loadRate);
loadRate();
