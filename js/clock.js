const clock = document.getElementById("clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  // padStart 사용을 위해서 문자열로 변환 필요 String
  const clockDisplay = `${hours}:${minutes}:${seconds}`;
  clock.innerText = clockDisplay;
}

getClock(); //함수를 먼저 호출하면 시계 바로 실행

setInterval(getClock, 1000);
