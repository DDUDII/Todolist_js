import config from "./config.js";

const currentWeather = document.getElementById("weather");
const curTemp = document.querySelector("#current-temp");
const currentPlace = document.querySelector("#current-place");
const weatherIcon = document.querySelector("#weather-icon");

const API_KEY = config.apikey;

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(weatherUrl).then((response) =>
    response.json().then((data) => {
      const localTemp = data.main.temp;
      const weatherMain = data.weather[0].icon;
      const place = data.name;
      curTemp.innerText = ` ${Math.floor(localTemp)}°C `;
      currentPlace.innerText = `${place}`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${weatherMain}@2x.png`;
    })
  );
}

function onGeoError() {
  alert("현재 주소를 찾을 수 없어 서울의 날씨로 대체합니다.");
  const seoulUrl = `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${API_KEY}&units=metric`;
  fetch(seoulUrl).then((response) =>
    response.json().then((data) => {
      const seoulTemp = data.main.temp;
      const weatherMain = data.weather[0].icon;
      const place = data.name;
      curTemp.innerText = ` ${Math.floor(seoulTemp)}°C `;
      currentPlace.innerText = `${place}`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${weatherMain}@2x.png`;
    })
  );
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
