/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
let city = prompt("What city?");
city = city.trim();
city1 = city.toLowerCase();

let index = 0;
for (let prop in weather) {
  if (prop === city) {
    let farenheit = Math.round((weather[prop].temp * 9) / 5 + 32);
    alert(
      `It is currently ${Math.round(
        weather[prop].temp
      )}°C (${farenheit}°F) in ${prop} with a humidity of ${
        weather[prop].humidity
      }%`
    );
  } else {
    if (index + 1 === Object.keys(weather).length) {
      alert(
        `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
      );
    }
    index++;
  }
}
*/
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
}
let date = new Date();
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
