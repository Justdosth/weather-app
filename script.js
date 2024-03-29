/*function changeIcon1(icon) {
  let dayIcon = document.querySelector(`#next-day`);
  dayIcon.innerHTML = "";

  switch (icon) {
    case "01d":
    case "01n":
      dayIcon.innerHTML = `
              <div class="icon sunny">
                <div class="sun">
                  <div class="rays"></div>
                </div>
              </div>
              `;
      break;
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
    case "50d":
    case "50n":
      dayIcon.innerHTML = `
        <div class="icon cloudy">
          <div class="cloud"></div>
          <div class="cloud"></div>
        </div>
      `;
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      dayIcon.innerHTML = `
        <div class="icon rainy">
          <div class="cloud"></div>
          <div class="rain"></div>
        </div>
      `;
      break;
    case "11d":
    case "11n":
      dayIcon.innerHTML = `
            <div class="icon thunder-storm">
              <div class="cloud"></div>
              <div class="lightning">
                <div class="bolt"></div>
                <div class="bolt"></div>
              </div>
            </div>
          `;
      break;
    case "13d":
    case "13n":
      dayIcon.innerHTML = `
                <div class="icon flurries">
                  <div class="cloud"></div>
                  <div class="snow">
                    <div class="flake"></div>
                    <div class="flake"></div>
                  </div>
                </div>
              `;
      break;
  }
}
*/
function changeIcon(icon) {
  switch (icon) {
    case "01d":
    case "01n":
      return `
              <div class="icon sunny">
                <div class="sun">
                  <div class="rays"></div>
                </div>
              </div>
              `;
      break;
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
    case "50d":
    case "50n":
      return `
        <div class="icon cloudy">
          <div class="cloud"></div>
          <div class="cloud"></div>
        </div>
      `;
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return `
        <div class="icon rainy">
          <div class="cloud"></div>
          <div class="rain"></div>
        </div>
      `;
      break;
    case "11d":
    case "11n":
      return `
            <div class="icon thunder-storm">
              <div class="cloud"></div>
              <div class="lightning">
                <div class="bolt"></div>
                <div class="bolt"></div>
              </div>
            </div>
          `;
      break;
    case "13d":
    case "13n":
      return `
                <div class="icon flurries">
                  <div class="cloud"></div>
                  <div class="snow">
                    <div class="flake"></div>
                    <div class="flake"></div>
                  </div>
                </div>
              `;
      break;
  }
}
function formatDate(timestamp) {
  let ts = timestamp * 1000;
  let date = new Date(ts);
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function formatDay(response) {
  let timestamp = response.data.dt * 1000;
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendseday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  document.querySelector("#currentDay").innerHTML = `${day}  `;
  document.querySelector("#minute").innerHTML = minutes;
  document.querySelector("#hour").innerHTML = hours;
}
function changeCity(response) {
  let city = document.querySelector("#city");
  let searchedCity = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
  let celcius = document.querySelector("#celsius");
  let farenheit = document.querySelector("#farenheit");
  if (celcius.innerHTML === "F") {
    celcius.innerHTML = "C";
    farenheit.innerHTML = "F";
  }
  if (searchedCity.value === "") {
    city.innerHTML = response.data.sys.country;
  }

  window.currentIcon = changeIcon(response.data.weather[0].icon);
}
function changeMetric(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  let farenheit = document.querySelector("#farenheit");
  let celcius = document.querySelector("#celsius");
  if (celcius.innerHTML === "C") {
    temp.innerHTML = Math.round((temp.innerHTML * 9) / 5 + 32);
    celcius.innerHTML = "F";
    farenheit.innerHTML = "C";
  } else {
    temp.innerHTML = Math.round(((temp.innerHTML - 32) * 5) / 9);
    celcius.innerHTML = "C";
    farenheit.innerHTML = "F";
  }
}
function show(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = temp;
  changeCity(response);
  changeWindSpeed(response);
  changeHumidity(response);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(forecastUrl).then(forecast);
}
function forecast(response) {
  let days = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row d-flex align-items-center">`;
  days.forEach(function (day, index) {
    if (index == 2) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="current-day-icon">
              ${currentIcon}
            </div>
          </div>`;
    }
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col weekDay">
            <div class="dayMargin">
              ${formatDate(day.dt)}
              </div>
              ${changeIcon(day.weather[0].icon)}
            <div class="dayTemperature dayMargin">
            <span>${Math.round(day.temp.day)}</span>
            ºC </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(days);
}
function changeWindSpeed(response) {
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function changeHumidity(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}
function changeTemp(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(show);
}
function showPosition(pos) {
  let lat = Math.round(pos.coords.latitude);
  let lon = Math.round(pos.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(show);
}
function changeToCurrent(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
  let searchInput = document.querySelector("#cityName");
  searchInput.value = null;
}

//let search = document.querySelector("#search-form");
//search.addEventListener("submit", changeCity);

let farenheit = document.querySelector("#farenheit");

farenheit.addEventListener("click", changeMetric);

let apiKey = "7389ca3d8fe60cff6da7d465a8799fab";
let unit = "metric";
let city = document.querySelector("#cityName");
let searchBtn = document.querySelector("#searchButton");
searchBtn.addEventListener("click", changeTemp);
let currentPlace = document.querySelector("#currentPlace");
currentPlace.addEventListener("click", changeToCurrent);
let apiUrl0 = `https://api.openweathermap.org/data/2.5/weather?q=Iran&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl0).then(formatDay);

/*
//let sunnyIcon = document.querySelector("#sunny-icon").remove();
//let cloudIcon = document.querySelector("#cloud-icon").remove();
//let currentDayIcon = document.querySelector(".current-day-icon");
//currentDayIcon.innerHTML = "^_^";
<div class="col-3">
            <div id="next-day" class="sunEmoji current-day-icon">
              <div class="icon sunny">
                <div class="sun">
                  <div class="rays"></div>
                </div>
              </div>
            </div>
          </div>
*/
