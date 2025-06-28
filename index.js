function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;

  document.querySelector("#current-city").innerHTML = city;
  document.querySelector(".current-temperature-value").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${windSpeed} km/h`;
  document.querySelector(
    ".current-temperature-icon"
  ).innerHTML = `<img src="${icon}" alt="Weather icon" width="50" />`;
  document.querySelector(".current-temperature-unit").innerHTML = "°C";
}

function searchCity(city) {
  let apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(() => {
      document.querySelector("#current-city").innerHTML = "City not found";
      document.querySelector(".current-temperature-value").innerHTML = "--";
      document.querySelector("#humidity").innerHTML = "--%";
      document.querySelector("#wind").innerHTML = "-- km/h";
      document.querySelector(".current-temperature-icon").textContent = "❌";
      document.querySelector(".current-temperature-unit").innerHTML = "";
    });
}

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  document.querySelector("#current-city").innerHTML = "Loading...";
  searchCity(searchInputElement.value);
}

let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Nairobi");
